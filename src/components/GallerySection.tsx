import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { PhotoItem, ThemeConfig } from '../types';

interface GallerySectionProps {
  config: ThemeConfig;
  photos?: PhotoItem[];
  onSelectPhoto?: (index: number) => void;
  featuredOnly?: boolean;
  onNavigate?: (view: string) => void;
}

interface ClientReview {
  id: string;
  quote: string;
  author: string;
  location: string;
  date: string;
  imageUrl: string;
  rating: number;
}

const PRESET_CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'cr-1',
    quote: "Sourav has this absolute magic to capture raw, authentic emotions in a way that feels incredibly cinematic yet fully comfortable. We are forever in awe of our photos.",
    author: "Eleanor & James",
    location: "Royal York Toronto",
    date: "September 2025",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
    rating: 5
  },
  {
    id: 'cr-2',
    quote: "The visual storytelling of our wedding highlights was breathtaking. He captures micro-moments that you don't even remember happening. Truly timeless investment.",
    author: "Victoria & Robert",
    location: "Casa Loma Suite",
    date: "July 2025",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
    rating: 5
  },
  {
    id: 'cr-3',
    quote: "We are both camera-shy, but Sourav made us feel so secure, unposed, and perfectly authentic. The resulting images feel like gorgeous frames of a romantic film.",
    author: "Isabella & Lucas",
    location: "The Distillery District",
    date: "October 2025",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc35953?q=80&w=800",
    rating: 5
  },
  {
    id: 'cr-4',
    quote: "The composition, editorial eye, and play of natural light are spectacular. Every photo feels like a grand romantic magazine spread. Absolute master of craft.",
    author: "Charlotte & Oliver",
    location: "Niagara-on-the-Lake",
    date: "August 2025",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800",
    rating: 5
  },
  {
    id: 'cr-5',
    quote: "Capturing genuine emotion is hard, but he makes it look effortless. Our albums feel high-contrast, deeply cozy, and exceptionally luxurious. Recommended 1000x!",
    author: "Sophia & Mason",
    location: "High Park, Toronto",
    date: "June 2025",
    imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800",
    rating: 5
  },
  {
    id: 'cr-6',
    quote: "Beyond the breathtaking photos, his warmth and energy made our day flow beautifully. A phenomenal curator who treated our session like pure poetry.",
    author: "Aria & Alexander",
    location: "Evergreen Brick Works",
    date: "November 2025",
    imageUrl: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?q=80&w=800",
    rating: 5
  }
];

export default function GallerySection({ config, onNavigate }: GallerySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Pick a random next index to "shuffle" one by one automatically
  const handleShuffle = () => {
    setActiveIdx((prevIdx) => {
      let nextIdx = prevIdx;
      while (nextIdx === prevIdx && PRESET_CLIENT_REVIEWS.length > 1) {
        nextIdx = Math.floor(Math.random() * PRESET_CLIENT_REVIEWS.length);
      }
      return nextIdx;
    });
  };

  // Automatically Shuffle one-by-one every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleShuffle();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const review = PRESET_CLIENT_REVIEWS[activeIdx];
  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="portfolio"
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'
      }`}
    >
      {/* Absolute fullscreen slider with zero gaps */}
      <div className="w-full relative overflow-hidden bg-zinc-950 h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] shadow-inner">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-20 lg:p-24"
          >
            {/* Couple Photograph backdrop cover - individual image vivid behind text */}
            <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
              <img
                src={review.imageUrl}
                alt={review.author}
                className="w-full h-full object-cover object-center scale-100 transition-transform duration-[5000ms] ease-out opacity-65"
                referrerPolicy="no-referrer"
              />
              {/* Rich cinematic vignette layers to protect contrast of the elegant text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
            </div>

            {/* Shuffled index indicator badge */}
            <div className="relative z-10 flex justify-between items-center w-full">
              <span className="text-[0.62rem] sm:text-[0.68rem] font-mono tracking-[0.4em] text-amber-500 font-bold">
                // CLIENT TESTIMONY
              </span>
              <span className="text-[0.62rem] sm:text-[0.68rem] font-mono tracking-widest text-amber-400 bg-black/40 backdrop-blur-md border border-amber-500/20 px-3.5 py-1.5 rounded-lg uppercase font-bold">
                STORY {activeIdx + 1} OF {PRESET_CLIENT_REVIEWS.length}
              </span>
            </div>

            {/* Testimonial Core Content Block */}
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 my-auto w-full px-4">
              <div className="relative inline-block">
                <Quote className="absolute -top-14 -left-14 w-20 h-20 text-amber-500/15 stroke-[0.75] pointer-events-none hidden sm:block" />
                <p className="text-[1.25rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.5rem] font-serif font-light leading-relaxed tracking-wide text-zinc-100 italic select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  “{review.quote}”
                </p>
              </div>

              {/* Author and Wedding Event Signature Details */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 text-[0.85rem] sm:text-[0.95rem] text-zinc-200 tracking-wide font-serif pt-4 select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                <span className="font-bold text-amber-400 tracking-[0.25em] uppercase text-xs sm:text-sm">
                  {review.author}
                </span>
                <span className="text-zinc-500 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="uppercase tracking-[0.15em]">{review.location}</span>
                </div>
                <span className="text-zinc-500 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="uppercase tracking-[0.15em]">{review.date}</span>
                </div>
              </div>
            </div>

            {/* Embedded Action Button - Flush inside full-screen area */}
            <div className="relative z-10 flex justify-center w-full pt-4">
              <button
                id="home-portfolio-more-btn"
                onClick={() => onNavigate && onNavigate('portfolio')}
                className="group flex items-center gap-3 bg-black/60 hover:bg-amber-500 text-zinc-200 hover:text-black border border-white/25 hover:border-amber-400 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full transition-all duration-500 font-sans text-[0.7rem] sm:text-xs font-bold tracking-[0.25em] uppercase cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <span>View Full Signature Work</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
