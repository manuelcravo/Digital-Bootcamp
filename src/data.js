export const OFFERS = [
  { id: 1, title: 'Air Runner 90 "Glacier"', category: 'Running', size: '10', condition: 'Lightly worn', user: 'mika.kicks', location: 'Kreuzberg, Berlin', time: '12 min ago', wants: 'Retro court sneakers, size 10', desc: 'Worn maybe five times, always indoors. Icy blue upper, no creasing on the toe box. Comes with original box and spare laces.', hue: 200, isNew: true },
  { id: 2, title: 'Court High OG "Forest"', category: 'Basketball', size: '9.5', condition: 'Deadstock', user: 'jaybird', location: 'Mitte, Berlin', time: '1 h ago', wants: 'Any trail runner in 9.5', desc: "Brand new, never tried on outside. Got them as a gift but they don't fit my rotation. Green and white leather.", hue: 140 },
  { id: 3, title: 'Skate Low Suede', category: 'Skate', size: '11', condition: 'Used', user: 'lena_rolls', location: 'Neukölln, Berlin', time: '3 h ago', wants: 'Chunky lifestyle pair, 11', desc: 'Skated for a summer, plenty of life left in the soles. Small scuff on the left ollie patch, otherwise clean.', hue: 30 },
];

export const STARS = { Deadstock: 5, 'Like new': 5, 'Lightly worn': 4, Used: 3 };

export const TRENDING = ['Air Runner 90', 'Court High', 'Bubble Max', 'Skate Low'];

export const SWAPPERS = [
  { name: 'mika.kicks', swaps: 42, hue: 200 },
  { name: 'noor.steps', swaps: 37, hue: 100 },
  { name: 'jaybird', swaps: 29, hue: 140 },
];

export const TICKS = [
  'mika.kicks swapped Air Runner 90 ⇄ Court Low',
  'jaybird found a match in Mitte',
  'lena_rolls swapped Skate Low ⇄ Bubble Max',
  'theo.w posted Bubble Max "Aqua"',
  'noor.steps swapped Trail Grip ⇄ Court Mid',
];

export const avatarBg = (h) =>
  `radial-gradient(circle at 32% 26%, oklch(0.93 0.07 ${h}) 0 15%, oklch(0.68 0.15 ${h}) 55%, oklch(0.48 0.13 ${h}) 100%)`;

export const initials = (name) => name.slice(0, 2).toUpperCase();
