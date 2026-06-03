import { PhotoItem, FilmItem, ReviewItem, TipItem, ThemeConfig } from './types';

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    title: 'A Love in High Definition',
    category: 'wedding',
    location: 'Toronto, ON',
    year: '2025'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    title: 'Warm Sunlight & Soft Whispers',
    category: 'wedding',
    location: 'Niagara-on-the-Lake, ON',
    year: '2025'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    title: 'The Golden Hour Vows',
    category: 'editorial',
    location: 'Casa Loma, Toronto',
    year: '2025'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=1200&auto=format&fit=crop',
    title: 'Sipping the Night Away',
    category: 'lifestyle',
    location: 'The Fairmont Royal York',
    year: '2026'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    title: 'Embraces in Monochrome',
    category: 'editorial',
    location: 'High Park, Toronto',
    year: '2025'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=1200&auto=format&fit=crop',
    title: 'Refined Simplicity',
    category: 'editorial',
    location: 'The Distillery District',
    year: '2026'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1510076857177-7470066aa48b?q=80&w=1200&auto=format&fit=crop',
    title: 'The Arrival',
    category: 'film',
    location: 'Evergreen Brick Works',
    year: '2025'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=1200&auto=format&fit=crop',
    title: 'An Intimate Dance of Two',
    category: 'wedding',
    location: 'Prince Edward County, ON',
    year: '2025'
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop',
    title: 'Through the Looking Glass',
    category: 'lifestyle',
    location: 'Scarborough Bluffs, ON',
    year: '2025'
  }
];

export const DEFAULT_FILMS: FilmItem[] = [
  {
    id: 'f1',
    title: 'Ethereal Whispers: Sarah & Andrew',
    couple: 'Sarah & Andrew',
    location: 'Vaughan Castle, Ontario',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
    videoUrl: 'dQw4w9WgXcQ', // Placeholder key for interactive embed
    category: 'Cinematic Cinematic Highlight'
  },
  {
    id: 'f2',
    title: 'A City Romance: Claire & Julian',
    couple: 'Claire & Julian',
    location: 'Toronto Music Garden & Broadview Hotel',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    videoUrl: '9xwazD5SyVg',
    category: 'Documentary Wedding Film'
  },
  {
    id: 'f3',
    title: 'Timeless Meadows: Maya & David',
    couple: 'Maya & David',
    location: 'Elora Mill, ON',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200',
    videoUrl: 'b6vW0VshHwE',
    category: 'Classic Film Reel'
  }
];

export const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    quote: "Sourav has this absolute magic to capture raw, authentic emotions in a way that feels incredibly cinematic yet fully comfortable. We are forever in awe of our photos. Every time we look at them, we relive the exact feeling of our vows.",
    author: "Eleanor & James",
    location: "Royal York Toronto",
    date: "September 2025"
  },
  {
    id: 'r2',
    quote: "The visual storytelling of the wedding film was breathtaking. He captures details that you don't even remember happening. The lighting, the composition, the pacing of the video—truly editorial in every sense. Worth every single investment.",
    author: "Victoria & Robert",
    location: "Casa Loma Suite",
    date: "July 2025"
  },
  {
    id: 'r3',
    quote: "We are both camera-shy people, but Sourav made us feel so secure, unposed, and perfectly authentic. The resulting images feel like snapshots of a beautiful romantic film rather than rigid wedding portraits. He is a genius.",
    author: "Isabella & Lucas",
    location: "The Distillery District",
    date: "October 2025"
  }
];

export const DEFAULT_TIPS: TipItem[] = [
  {
    id: 't1',
    title: 'Maximizing the Golden Hour for Portraits',
    category: 'STYLING & LIGHTING',
    content: 'Plan your formal bridal portraits roughly 45 minutes before local sunset. This guarantees that soft, warm champagne glow that cuts beautifully across fabrics and gives high-contrast skin tones without hard-edge squinting or vertical shadows.'
  },
  {
    id: 't2',
    title: 'Unscripted vs. Direct Storytelling',
    category: 'AESTHETIC & FLOW',
    content: 'We prefer directing with gentle, action-oriented cues rather than freezing you in rigid placements. Think about walking slowly together, whispering something laughable, or feeling the breeze—this allows micro-expressions to surface naturally for editorial frame capture.'
  },
  {
    id: 't3',
    title: 'How to Choose the Perfect Bridal Veil for Motion',
    category: 'WARDROBE & CINEMA',
    content: 'A cathedral-length classic tulle veil yields spectacular opportunities for wind motion and dynamic composition overlays. We recommend lightweight, single-tier variations that float effortlessly without pulling or weighing your hairstyle down.'
  },
  {
    id: 't4',
    title: 'Coordinating Your Videographer & Photographer Teams',
    category: 'PLANNING & LOGISTICS',
    content: 'When photography and film teams operate under the same editorial language, we share frame angles and lighting plans. Our hybrid package guarantees synchronized cueing, meaning we never block each other’s shots during crucial emotional moments.'
  }
];

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  studioName: 'Sourav Sachin',
  tagline1: 'where EDITORIAL meets EMOTION',
  tagline2: 'Photography effortlessly refined + timeless',
  location: 'WEDDING PHOTOGRAPHY in TORONTO, ONTARIO',
  aboutText1: "I believe that the most breathtaking wedding photography sits at the perfect intersection of sophisticated high-fashion compositions and unguided, liquid emotional connections.",
  aboutText2: "With over a decade of capturing luxury love stories across Toronto, Ontario, and worldwide destinations, my quest is to archive the soft gazes, the dynamic celebrations, and the deep undercurrents of your connection in a style that stays forever current, elegant, and effortlessly yours.",
  aboutQuote: "Most couples tell me: “We felt so comfortable with you.”",
  accentColor: 'champagne',
  themeMode: 'cream',
  animationSpeed: 'normal',
  fontPreset: 'editorial',
  showTips: true,
  showFilms: true,
  showReviews: true,
  showCustomizerByDefault: true
};

export const COLOR_PALETTES = {
  champagne: {
    primary: 'border-amber-300 text-amber-800 hover:bg-amber-50',
    accentText: 'text-amber-700 font-medium',
    accentBg: 'bg-[#faf6f0]',
    border: 'border-amber-200/50',
    buttonColor: 'bg-[#d4af37] text-white hover:bg-[#c19a2e]',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  slate: {
    primary: 'border-slate-400 text-slate-800 hover:bg-slate-50',
    accentText: 'text-slate-600 font-medium',
    accentBg: 'bg-[#f1f5f9]',
    border: 'border-slate-300',
    buttonColor: 'bg-slate-800 text-white hover:bg-slate-900',
    badgeBg: 'bg-slate-50 text-slate-800 border-slate-200'
  },
  charcoal: {
    primary: 'border-zinc-500 text-zinc-900 hover:bg-zinc-100',
    accentText: 'text-zinc-700 font-medium',
    accentBg: 'bg-[#1c1c1c] text-white',
    border: 'border-zinc-700',
    buttonColor: 'bg-zinc-900 text-white hover:bg-zinc-800',
    badgeBg: 'bg-zinc-800 text-zinc-200 border-zinc-700'
  },
  emerald: {
    primary: 'border-emerald-300 text-emerald-800 hover:bg-emerald-50',
    accentText: 'text-emerald-700 font-medium',
    accentBg: 'bg-[#f4fbf7]',
    border: 'border-emerald-200',
    buttonColor: 'bg-emerald-800 text-white hover:bg-emerald-900',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  rose: {
    primary: 'border-rose-300 text-rose-800 hover:bg-rose-50',
    accentText: 'text-rose-700 font-medium',
    accentBg: 'bg-[#fffafd]',
    border: 'border-rose-200',
    buttonColor: 'bg-rose-700 text-white hover:bg-rose-800',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200'
  }
};
