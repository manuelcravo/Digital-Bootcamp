-- Tighten access: protect swap_count, route swap status changes through functions, validate proposals.

-- ---------------------------------------------------------------------------
-- Profiles: users may edit their own username, location and hue — not swap_count
-- ---------------------------------------------------------------------------
revoke update on public.profiles from anon, authenticated;
grant update (username, location, hue) on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Swaps: proposals must start as 'proposed', between two active offers with different owners
-- ---------------------------------------------------------------------------
drop policy "Users propose swaps with own offer" on public.swaps;
create policy "Users propose swaps with own offer" on public.swaps
  for insert to authenticated with check (
    (select auth.uid()) = proposer_id
    and status = 'proposed'
    and exists (
      select 1 from public.offers o
      where o.id = counter_offer_id and o.user_id = (select auth.uid()) and o.status = 'active'
    )
    and exists (
      select 1 from public.offers o
      where o.id = offer_id and o.user_id <> (select auth.uid()) and o.status = 'active'
    )
  );

-- ---------------------------------------------------------------------------
-- Swaps: no direct updates; status changes go through the functions below
-- ---------------------------------------------------------------------------
drop policy "Participants update swaps" on public.swaps;
revoke update on public.swaps from anon, authenticated;

-- The owner of the requested offer accepts a proposal (both offers must still be active).
create function public.accept_swap(swap_id bigint)
returns public.swaps
language plpgsql
security definer set search_path = ''
as $$
declare
  result public.swaps;
begin
  update public.swaps s set status = 'accepted'
  where s.id = swap_id
    and s.status = 'proposed'
    and exists (select 1 from public.offers o where o.id = s.offer_id and o.user_id = (select auth.uid()))
    and not exists (
      select 1 from public.offers o where o.id in (s.offer_id, s.counter_offer_id) and o.status <> 'active'
    )
  returning * into result;
  if not found then
    raise exception 'Swap % cannot be accepted', swap_id;
  end if;
  return result;
end;
$$;

-- The owner of the requested offer declines a proposal.
create function public.decline_swap(swap_id bigint)
returns public.swaps
language plpgsql
security definer set search_path = ''
as $$
declare
  result public.swaps;
begin
  update public.swaps s set status = 'declined'
  where s.id = swap_id
    and s.status = 'proposed'
    and exists (select 1 from public.offers o where o.id = s.offer_id and o.user_id = (select auth.uid()))
  returning * into result;
  if not found then
    raise exception 'Swap % cannot be declined', swap_id;
  end if;
  return result;
end;
$$;

-- The proposer withdraws a proposal, or either participant backs out of an accepted swap.
create function public.cancel_swap(swap_id bigint)
returns public.swaps
language plpgsql
security definer set search_path = ''
as $$
declare
  result public.swaps;
begin
  update public.swaps s set status = 'cancelled'
  where s.id = swap_id
    and (
      (s.status = 'proposed' and s.proposer_id = (select auth.uid()))
      or (
        s.status = 'accepted'
        and (select auth.uid()) in (
          select o.user_id from public.offers o where o.id in (s.offer_id, s.counter_offer_id)
        )
      )
    )
  returning * into result;
  if not found then
    raise exception 'Swap % cannot be cancelled', swap_id;
  end if;
  return result;
end;
$$;

-- Either participant marks an accepted swap as done (on_swap_updated then bumps counts and closes the offers).
create function public.complete_swap(swap_id bigint)
returns public.swaps
language plpgsql
security definer set search_path = ''
as $$
declare
  result public.swaps;
begin
  update public.swaps s set status = 'completed'
  where s.id = swap_id
    and s.status = 'accepted'
    and (select auth.uid()) in (
      select o.user_id from public.offers o where o.id in (s.offer_id, s.counter_offer_id)
    )
  returning * into result;
  if not found then
    raise exception 'Swap % cannot be completed', swap_id;
  end if;
  return result;
end;
$$;

revoke execute on function public.accept_swap(bigint), public.decline_swap(bigint),
  public.cancel_swap(bigint), public.complete_swap(bigint) from public, anon;
grant execute on function public.accept_swap(bigint), public.decline_swap(bigint),
  public.cancel_swap(bigint), public.complete_swap(bigint) to authenticated;
