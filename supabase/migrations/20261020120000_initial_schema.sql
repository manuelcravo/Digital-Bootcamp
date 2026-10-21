-- SoleSwap initial schema: profiles, offers, swaps, favorites, swap meets.

-- ---------------------------------------------------------------------------
-- Types
-- ---------------------------------------------------------------------------
create type public.shoe_condition as enum ('Deadstock', 'Like new', 'Lightly worn', 'Used');
create type public.offer_status as enum ('active', 'pending', 'swapped', 'archived');
create type public.swap_status as enum ('proposed', 'accepted', 'declined', 'cancelled', 'completed');

-- ---------------------------------------------------------------------------
-- Profiles (one per auth user)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text not null unique check (char_length(username) between 3 and 30),
  location    text,
  hue         smallint not null default 200 check (hue between 0 and 360),
  swap_count  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- Create a profile automatically when someone signs up (username comes from AuthCard's signUp options).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, hue)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4)),
    floor(random() * 360)::smallint
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Offers (a pair someone has, and what they want for it)
-- ---------------------------------------------------------------------------
create table public.offers (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  title       text not null,
  category    text not null,
  size        text not null,
  condition   public.shoe_condition not null,
  description text,
  wants       text not null,
  location    text,
  image_url   text,
  hue         smallint not null default 200 check (hue between 0 and 360),
  status      public.offer_status not null default 'active',
  created_at  timestamptz not null default now()
);

create index offers_user_id_idx on public.offers (user_id);
create index offers_status_created_idx on public.offers (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Swaps (a proposal to trade one offer for another)
-- ---------------------------------------------------------------------------
create table public.swaps (
  id                 bigint generated always as identity primary key,
  offer_id           bigint not null references public.offers (id) on delete cascade,
  counter_offer_id   bigint not null references public.offers (id) on delete cascade,
  proposer_id        uuid not null references public.profiles (id) on delete cascade,
  status             public.swap_status not null default 'proposed',
  message            text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  check (offer_id <> counter_offer_id)
);

create index swaps_offer_id_idx on public.swaps (offer_id);
create index swaps_counter_offer_id_idx on public.swaps (counter_offer_id);

-- Bump both users' swap_count when a swap is completed.
create function public.handle_swap_completed()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then
    update public.profiles set swap_count = swap_count + 1
    where id in (
      select user_id from public.offers where id in (new.offer_id, new.counter_offer_id)
    );
    update public.offers set status = 'swapped'
    where id in (new.offer_id, new.counter_offer_id);
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger on_swap_updated
  before update on public.swaps
  for each row execute function public.handle_swap_completed();

-- ---------------------------------------------------------------------------
-- Favorites (the heart on an offer card)
-- ---------------------------------------------------------------------------
create table public.favorites (
  user_id     uuid not null references public.profiles (id) on delete cascade,
  offer_id    bigint not null references public.offers (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, offer_id)
);

-- ---------------------------------------------------------------------------
-- Swap meets (community events)
-- ---------------------------------------------------------------------------
create table public.swap_meets (
  id          bigint generated always as identity primary key,
  name        text not null,
  location    text,
  starts_at   timestamptz not null,
  ends_at     timestamptz not null,
  created_at  timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles   enable row level security;
alter table public.offers     enable row level security;
alter table public.swaps      enable row level security;
alter table public.favorites  enable row level security;
alter table public.swap_meets enable row level security;

-- Profiles: public read, owner update.
create policy "Profiles are public" on public.profiles
  for select using (true);
create policy "Users update own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Offers: public read, owner write.
create policy "Offers are public" on public.offers
  for select using (true);
create policy "Users create own offers" on public.offers
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users update own offers" on public.offers
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Users delete own offers" on public.offers
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Swaps: visible to and editable by the two owners involved; proposer must own the counter offer.
create policy "Participants see swaps" on public.swaps
  for select to authenticated using (
    (select auth.uid()) in (
      select user_id from public.offers where id in (offer_id, counter_offer_id)
    )
  );
create policy "Users propose swaps with own offer" on public.swaps
  for insert to authenticated with check (
    (select auth.uid()) = proposer_id
    and exists (select 1 from public.offers o where o.id = counter_offer_id and o.user_id = (select auth.uid()))
  );
create policy "Participants update swaps" on public.swaps
  for update to authenticated using (
    (select auth.uid()) in (
      select user_id from public.offers where id in (offer_id, counter_offer_id)
    )
  );

-- Favorites: private to each user.
create policy "Users manage own favorites" on public.favorites
  for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Swap meets: public read (managed from the dashboard).
create policy "Swap meets are public" on public.swap_meets
  for select using (true);

-- Seed the upcoming meet shown on the landing page.
insert into public.swap_meets (name, location, starts_at, ends_at)
values ('Mauerpark Sneaker Swap', 'Mauerpark, Berlin', '2026-10-24 12:00+02', '2026-10-24 18:00+02');
