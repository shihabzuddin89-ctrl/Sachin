import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { MapPin, Calendar, Heart, ArrowUpRight } from 'lucide-react';
import { FilmItem, ThemeConfig } from '../types';
import { FadeUpReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface FilmGlanceProps {
  config: ThemeConfig;
  films?: FilmItem[];
  onNavigate?: (page: string) => void;
}

interface WeddingPortion {
  id: string;
  groomName: string;
  wifeName: string;
  location: string;
  date: string;
  imageUrl: string;
  vibe: string;
}

const WEDDING_PORTIONS: WeddingPortion[] = [
  {
    id: 'wp-1',
    groomName: 'Alexander',
    wifeName: 'Jessica',
    location: 'The Estate Gardens, Toronto',
    date: 'September 2025',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    vibe: 'Editorial Fine-Art'
  },
  {
    id: 'wp-2',
    groomName: 'Julian',
    wifeName: 'Claire',
    location: 'The Cathedral Vows, Niagara',
    date: 'July 2025',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
    vibe: 'Cinematic Elegance'
  },
  {
    id: 'wp-3',
    groomName: 'Marcus',
    wifeName: 'Sophia',
    location: 'The Lakeside Meadow, Muskoka',
    date: 'October 2025',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200',
    vibe: 'Warm Vintage Grace'
  }
];

export default function FilmGlance({ config, onNavigate }: FilmGlanceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDarkMode = config.themeMode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  // Soft, continuous scroll parallax for the cards grid background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-50, 10]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [-10, 50]);

  const smoothBgY1 = useSpring(bgY1, { stiffness: 60, damping: 22, mass: 0.4 });
  const smoothBgY2 = useSpring(bgY2, { stiffness: 60, damping: 22, mass: 0.4 });
  const smoothBgY3 = useSpring(bgY3, { stiffness: 60, damping: 22, mass: 0.4 });

  return (
    <section 
      id="film-glance-section"
      className="pt-0 pb-20 md:pb-28 px-6 md:px-12 transition-colors duration-500 overflow-hidden relative bg-[#0E0F12] text-white"
    >
      {/* Editorial Watermark background text */}
      <div className="absolute right-0 top-1/4 translate-x-20 rotate-90 origin-right text-[10rem] sm:text-[14rem] md:text-[18rem] font-serif tracking-tighter text-zinc-500/[0.03] select-none pointer-events-none font-light uppercase">
        ARCHIVES
      </div>

      <div className="max-w-7xl mx-auto pt-10 md:pt-16">


        {/* The 3 Wedding Portions Grid Layout: Asymmetric Big/Small Combo */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {WEDDING_PORTIONS.map((portion, idx) => {
            const isHovered = hoveredId === portion.id;
            const isBig = idx === 0;
            const smoothBgY = idx === 0 ? smoothBgY1 : idx === 1 ? smoothBgY2 : smoothBgY3;
            return (
              <StaggerItem
                key={portion.id}
                className={isBig 
                  ? "md:col-span-7 lg:col-span-8 md:row-span-2"
                  : "md:col-span-5 lg:col-span-4"
                }
              >
                <motion.div
                  onMouseEnter={() => setHoveredId(portion.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-zinc-950 shadow-[0_20px_45px_rgba(0,0,0,0.5)] cursor-pointer h-full w-full ${
                    isBig 
                      ? "min-h-[480px] md:min-h-[620px]"
                      : "min-h-[280px] md:min-h-[295px]"
                  }`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onNavigate && onNavigate('portfolio')}
                >
                  {/* Underlay Single majestic photograph */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <motion.img
                      style={{ y: smoothBgY }}
                      src={portion.imageUrl}
                      alt={`${portion.groomName} & ${portion.wifeName} Wedding`}
                      className="absolute -inset-y-12 left-0 right-0 w-full h-[calc(100%+6rem)] object-cover object-center grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-[1200ms] ease-out opacity-65 group-hover:opacity-85"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    {/* Rich Vignettes & Color Gradients to preserve elegant text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent group-hover:from-black/95 transition-all duration-500" />
                  </div>

                  {/* Top Corner Badge (Vibe Category) */}
                  <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[0.52rem] font-mono tracking-widest text-[#d4af37] bg-amber-500/10 backdrop-blur-md border border-amber-500/25 px-2.5 py-1 rounded-md uppercase font-bold">
                      {portion.vibe}
                    </span>
                  </div>

                  {/* Top Right Action Arrow */}
                  <div className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white transform translate-x-4 translate-y-[-10px] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </div>

                  {/* Husband and Wife Beautiful Typography Portion Cards */}
                  <div className={`relative z-10 ${isBig ? "p-8 sm:p-12 space-y-6" : "p-6 sm:p-8 space-y-3"}`}>
                    {/* Love Connection Icon Indicator */}
                    <div className="flex items-center gap-2">
                      <div className={`h-[1px] bg-amber-500 ${isBig ? "w-10" : "w-6"}`} />
                      <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500/40" />
                    </div>

                    {/* Groom & Wife Names */}
                    <div className="space-y-1">
                      <h3 className={`font-serif font-light tracking-wide text-zinc-100 leading-none group-hover:text-amber-300 transition-colors duration-400 select-none ${
                        isBig ? "text-3xl sm:text-4xl md:text-5xl" : "text-xl sm:text-2xl md:text-3xl"
                      }`}>
                        <span className="block font-bold">{portion.groomName}</span>
                        <span className="block italic text-zinc-300 font-serif font-light">{portion.wifeName}</span>
                      </h3>
                    </div>

                    {/* Dynamic Slide Divider line */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/30 to-transparent transform scale-x-75 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                    {/* Event metadata (location and date) */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1.5 opacity-90 text-[0.65rem] font-mono tracking-wider text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="uppercase text-zinc-300 truncate max-w-[200px] sm:max-w-none">{portion.location}</span>
                      </div>
                      {isBig && <span className="text-zinc-600 hidden sm:inline">•</span>}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-zinc-300">{portion.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Amber visual line at very bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
