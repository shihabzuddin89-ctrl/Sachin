import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Film, X, MapPin, Watch, Eye } from 'lucide-react';
import { FilmItem, ThemeConfig } from '../types';

interface FilmsSectionProps {
  config: ThemeConfig;
  films: FilmItem[];
}

export default function FilmsSection({ config, films }: FilmsSectionProps) {
  const [activeVideoCode, setActiveVideoCode] = useState<string | null>(null);

  const handleOpenVideo = (videoCode: string) => {
    setActiveVideoCode(videoCode);
  };

  const handleCloseVideo = () => {
    setActiveVideoCode(null);
  };

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="films"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${
        config.themeMode === 'cream'
          ? 'bg-[#FAF6F0] text-zinc-900 border-y border-zinc-200/50'
          : isDarkMode
          ? 'bg-zinc-950 text-white border-b border-zinc-900'
          : 'bg-zinc-50 text-zinc-900 border-y border-zinc-100'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            03 // CINEMATOGRAPHY
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        {/* Header Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-amber-500 text-[0.62rem] md:text-[0.7rem] tracking-[0.45em] uppercase font-sans font-semibold block">
              CINEMATOGRAPHIC WORKS
            </span>
            <h2 className="text-[2rem] sm:text-[3rem] font-light font-serif tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              Wedding{' '}
              <span className="font-serif italic text-amber-600 font-medium">
                Films & Cinema
              </span>
            </h2>
            <div className="w-16 h-[1.5px] bg-amber-400/80 mr-auto" />
          </div>

          <p className="max-w-md text-[0.88rem] leading-relaxed text-zinc-500 dark:text-zinc-400 font-sans font-light">
            Motion captures the fleeting dialogue, the gasps of breath, and the warm laughter in sequences that feel like high-fashion documentary archives.
          </p>
        </div>

        {/* Cinematic Film Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {films.map((film, index) => (
            <motion.div
              id={`film-card-${film.id}`}
              key={film.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative flex flex-col justify-between h-[420px] bg-zinc-900 overflow-hidden shadow-lg border border-zinc-100/10"
            >
              {/* Thumbnail Image with Zoom */}
              <div className="absolute inset-0 z-0">
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  className="w-full h-full object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-700 select-none grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-75"
                  referrerPolicy="no-referrer"
                />
                {/* Dark shading ambient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-black/40 z-10" />
              </div>

              {/* Top Film Categories */}
              <div className="absolute top-6 left-6 z-20 flex items-center justify-between w-[calc(100%-48px)]">
                <span className="text-[0.58rem] font-mono tracking-[0.3em] text-amber-300 uppercase bg-black/50 border border-white/10 px-2.5 py-1 rounded-full">
                  {film.category}
                </span>
                <span className="text-[0.62rem] text-zinc-300 font-mono tracking-widest flex items-center gap-1">
                  <Watch className="w-3 h-3 text-amber-400" />
                  04:12 MIN
                </span>
              </div>

              {/* Pulsing play button in the middle */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <button
                  id={`play-button-${film.id}`}
                  onClick={() => handleOpenVideo(film.videoUrl)}
                  className="cursor-pointer w-16 h-16 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center hover:scale-110 shadow-lg transform transition-all duration-300 group-hover:bg-white group-hover:text-amber-500"
                  aria-label={`Play film ${film.title}`}
                >
                  <Play className="w-6 h-6 fill-current pl-1" />
                </button>
              </div>

              {/* Bottom description elements */}
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 text-white">
                <div className="flex items-center gap-1.5 text-zinc-300 text-[0.65rem] font-mono tracking-widest uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  {film.location}
                </div>
                <h3 className="text-[1.25rem] font-serif font-light leading-snug group-hover:text-amber-300 transition-colors duration-300">
                  {film.title}
                </h3>
                <p className="text-[0.72rem] font-sans tracking-[0.15em] text-zinc-400 uppercase">
                  FEATURING {film.couple}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-Screen Cinematic Iframe Overlay Modal */}
        <AnimatePresence>
          {activeVideoCode && (
            <div 
              id="film-player-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-md"
            >
              {// Clicking outside the video frame triggers closure
              }
              <div className="absolute inset-0 cursor-pointer" onClick={handleCloseVideo} />

              <div className="relative w-full max-w-4xl aspect-video px-4 z-10 flex flex-col justify-center">
                {/* Header title inside film player */}
                <div className="absolute -top-12 left-4 right-4 flex items-center justify-between text-white font-mono text-[0.68rem] tracking-widest">
                  <span>CINEMATIC WEDDING REEL SCREENING</span>
                  <button
                    id="close-player-button"
                    onClick={handleCloseVideo}
                    className="p-1 px-3 border border-white/25 rounded-md hover:bg-white/10 text-white cursor-pointer"
                  >
                    CLOSE [ESC]
                  </button>
                </div>

                {/* Video framework Iframe */}
                <div className="w-full h-full bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden rounded-xs">
                  <iframe
                    title="Sourav Sachin Cinematic Wedding Video Player"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideoCode}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
