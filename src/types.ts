export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'wedding' | 'editorial' | 'film' | 'lifestyle';
  location: string;
  year: string;
}

export interface FilmItem {
  id: string;
  title: string;
  couple: string;
  location: string;
  thumbnail: string;
  videoUrl: string; // YouTube or Vimeo ID
  category: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  date: string;
}

export interface TipItem {
  id: string;
  title: string;
  category: string;
  content: string;
}

export interface ThemeConfig {
  studioName: string;
  tagline1: string; // "where EDITORIAL meets EMOTION"
  tagline2: string; // "Photography effortlessly refined + timeless"
  location: string; // "TORONTO, ONTARIO"
  aboutText1: string;
  aboutText2: string;
  aboutQuote: string; // "Most couples tell me: 'We felt so comfortable with you.'"
  accentColor: string; // "champagne" | "slate" | "charcoal" | "emerald" | "rose"
  themeMode: 'cream' | 'light' | 'dark';
  animationSpeed: 'slow' | 'normal' | 'fast';
  fontPreset: 'editorial' | 'classic' | 'modern-mono';
  showTips: boolean;
  showFilms: boolean;
  showReviews: boolean;
  showCustomizerByDefault: boolean;
}
