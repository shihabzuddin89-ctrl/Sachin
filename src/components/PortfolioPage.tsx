import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhotoItem, ThemeConfig } from '../types';
import { Maximize2, Sparkles, Filter, Sliders, ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';

interface PortfolioPageProps {
  config: ThemeConfig;
  photos: PhotoItem[];
  onSelectPhoto: (index: number) => void;
}

export default function PortfolioPage({ config, photos, onSelectPhoto }: PortfolioPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);
  
  // Custom interactive slider state: "Editorial" vs "Candid" to showcase styles
  const [styleBalance, setStyleBalance] = useState<number>(50);

  // Likes tracking
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => {
      const liked = !!prev[id];
      setLocalLikes(likes => ({ ...likes, [id]: (likes[id] || 0) + (liked ? -1 : 1) }));
      return { ...prev, [id]: !liked };
    });
  };

  const categories = [
    { id: 'all', label: 'THE COMPLETE ARCHIVE' },
    { id: 'wedding', label: 'WEDDINGS' },
    { id: 'editorial', label: 'EDITORIAL KINSHIP' },
    { id: 'film', label: 'CINEMATIC FILM' },
    { id: 'lifestyle', label: 'LIFESTYLE' },
  ];

  const filteredPhotos = photos.filter(
    (photo) => activeCategory === 'all' || photo.category === activeCategory
  );

  // Camera mock specs for artistic feel
  const cameraSpecs: Record<string, string> = {
    'wedding': 'Leica SL2 // 50mm Summilux-SL f/1.4 // f/2.0, 1/320s, ISO 160',
    'editorial': 'Pentax 67 // 105mm f/2.4 // Kodak Portra 400 // Natural Flare',
    'film': 'Arri Alexa Mini // Zeiss Supreme Prime 35mm // Cine-Filter',
    'lifestyle': 'Hasselblad 503CX // 80mm Planar f/2.8 // Fujifilm Pro 400H',
  };

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title details */}
        <div className="mb-16">
          <div className="space-y-4 max-w-2xl">
            <h1 className={`text-4xl md:text-6xl font-light tracking-tight text-white ${
              config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
            }`}>
              Our signature <span className="italic font-serif text-[#E5C158]">imagery</span>.
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Curated frames highlighting authentic laughter, quiet gazes, and the timeless textures of luxury celebrations. Filter our archives to view specific moments.
            </p>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 border-b border-white/10 pb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-xl text-[0.62rem] tracking-[0.25em] font-sans font-medium uppercase border transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#E5C158] border-[#E5C158] text-[#060709]'
                  : 'border-white/10 hover:border-[#E5C158]/30 text-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Elegant Masonry-style Bento Grid using Motion */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              const fullGlobalIndex = photos.findIndex((p) => p.id === photo.id);
              const customSpec = cameraSpecs[photo.category] || 'Leica SL2';
              const isFav = !!isLiked[photo.id];
              const favCount = (localLikes[photo.id] || 0) + 18;

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onSelectPhoto(fullGlobalIndex)}
                  onMouseEnter={() => setHoveredPhotoId(photo.id)}
                  onMouseLeave={() => setHoveredPhotoId(null)}
                  className="group relative cursor-pointer aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-200/10 shadow-md flex items-end"
                >
                  {/* Portrait photo */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Cinematic Technical Overlay Metadata */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-out space-y-3">
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <span className="text-[0.6rem] font-mono tracking-widest text-[#E5C158] block uppercase">
                          {photo.location.toUpperCase()}
                        </span>
                        <h4 className={`text-base font-medium tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                          {photo.title}
                        </h4>
                      </div>
                      
                      {/* Interactive Love Button */}
                      <button
                        id={`photo-like-idx-${photo.id}`}
                        onClick={(e) => handleToggleLike(photo.id, e)}
                        className="p-2 border border-white/20 hover:border-[#E5C158] rounded-full transition-colors flex items-center justify-center bg-zinc-950/40 hover:bg-rose-500/10 text-white group"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-200 group-hover:text-[#E5C158]'}`} />
                      </button>
                    </div>

                    <div className="w-full h-[0.5px] bg-white/10" />

                    <div className="flex justify-between items-center text-[0.58rem] font-mono text-zinc-400">
                      <span>{customSpec}</span>
                      <span>{photo.year}</span>
                    </div>
                  </div>

                  {/* Clean Static Info Badge when NOT hovered */}
                  <div className="absolute bottom-4 left-4 right-4 z-5 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                    <span className="bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-md text-[0.55rem] font-mono text-white tracking-widest uppercase">
                      {photo.category}
                    </span>
                    <span className="text-white/60 text-[0.55rem] font-mono">
                      {photo.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Elegant CTA to contact form in case they browse portfolio and get inspired */}
        <div className="text-center mt-28 border-t border-white/10 pt-20">
          <p className="text-[0.62rem] font-mono tracking-[0.45em] text-[#E5C158] uppercase mb-4">
            FEEL AN EMBRACE IN THE LIGHT?
          </p>
          <h3 className={`text-2xl md:text-3xl font-light mb-8 max-w-lg mx-auto leading-tight text-white ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
            Let's capture your celebration in luxurious, cinematic fidelity.
          </h3>
          <button
            id="portfolio-cta-contact"
            onClick={() => {
              const inquiryEl = document.getElementById('contact');
              if (inquiryEl) {
                inquiryEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 cursor-pointer bg-[#E5C158] hover:bg-[#F3D17E] text-[#060709] text-xs font-semibold tracking-widest uppercase rounded-xl transition-all hover:scale-101 hover:shadow-lg"
          >
            COMMISSION US TODAY
          </button>
        </div>
      </div>
    </div>
  );
}
