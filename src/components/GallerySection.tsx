import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, Plus, ExternalLink } from 'lucide-react';
import { PhotoItem, ThemeConfig } from '../types';

interface GallerySectionProps {
  config: ThemeConfig;
  photos: PhotoItem[];
  onSelectPhoto: (index: number) => void;
}

type FilterType = 'all' | 'wedding' | 'editorial' | 'film' | 'lifestyle';

export default function GallerySection({ config, photos, onSelectPhoto }: GallerySectionProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(p => p.category === filter);

  const categories: { label: string; value: FilterType }[] = [
    { label: 'SHOW ALL', value: 'all' },
    { label: 'WEDDING', value: 'wedding' },
    { label: 'EDITORIAL', value: 'editorial' },
    { label: 'FILM FRAMES', value: 'film' },
    { label: 'LIFESTYLE', value: 'lifestyle' },
  ];

  return (
    <section
      id="portfolio"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 ${
        config.themeMode === 'dark' ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            02 // SIGNATURE WORK
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        {/* Title and Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-amber-500 text-[0.62rem] md:text-[0.7rem] tracking-[0.45em] uppercase font-sans font-semibold block">
            SELECTED PORTFOLIO ARCHIVES
          </span>
          <h2 className="text-[2rem] sm:text-[3rem] font-light font-serif tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Refined{' '}
            <span className="font-serif italic text-amber-600 font-medium">
              Signature Work
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-zinc-300 dark:bg-zinc-700 mx-auto" />
          <p className="text-[0.82rem] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Capturing the deep, unspoken language of elegant unions.
          </p>
        </div>

        {/* Category Filters (Clean pill buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12 sm:mb-16">
          {categories.map((cat) => {
            const isSelected = filter === cat.value;
            return (
              <button
                id={`filter-${cat.value}`}
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`cursor-pointer px-4 sm:px-6 py-2 text-[0.65rem] sm:text-[0.72rem] tracking-[0.25em] font-sans font-medium rounded-full border transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-500'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Staggered Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              // Map index to original position in 'photos' to open lightbox accurately
              const originalIndex = photos.findIndex(p => p.id === photo.id);
              
              return (
                <motion.div
                  id={`gallery-item-${photo.id}`}
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative cursor-pointer overflow-hidden aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 border border-zinc-100/10 shadow-xs"
                  onClick={() => onSelectPhoto(originalIndex)}
                >
                  {/* Image Core */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                  {/* Top Location tag (fades in) */}
                  <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    <span className="text-[0.62rem] font-mono tracking-widest text-zinc-100 uppercase">
                      {photo.location}
                    </span>
                  </div>

                  {/* Top Category Indicator */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75 bg-amber-400 text-zinc-950 font-bold font-sans text-[0.55rem] tracking-wider px-2 py-0.5 rounded-sm uppercase">
                    {photo.category}
                  </div>

                  {/* Hover Caption Details */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-end justify-between">
                    <div>
                      <p className="text-[0.58rem] font-mono tracking-[0.3em] text-amber-300 uppercase">
                        EST. {photo.year}
                      </p>
                      <h3 className="text-[1.15rem] font-serif font-light text-white tracking-normal leading-tight mt-1">
                        {photo.title}
                      </h3>
                    </div>
                    
                    {/* Floating click indicator */}
                    <div className="p-2 border border-white/30 rounded-full hover:bg-white hover:border-white text-white hover:text-zinc-900 transition-all duration-300 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 text-zinc-400 font-serif">
            No dynamic photographs in {filter} yet. Update using the Live Visual Editor on the left!
          </div>
        )}
      </div>
    </section>
  );
}
