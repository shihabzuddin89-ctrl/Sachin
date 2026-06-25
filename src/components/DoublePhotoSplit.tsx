import { motion } from 'motion/react';
import { ThemeConfig, PhotoItem } from '../types';

interface DoublePhotoSplitProps {
  config: ThemeConfig;
  photos: PhotoItem[];
}

export default function DoublePhotoSplit({ config, photos }: DoublePhotoSplitProps) {
  const isDarkMode = config.themeMode === 'dark';
  
  // Choose two high-impact, contrasting romantic images
  const photoLeft = photos.find(p => p.id === '3') || photos[0];
  const photoRight = photos.find(p => p.id === '5') || photos[1] || photos[0];

  const fontPreset = config.fontPreset;
  const signatureFont = fontPreset === 'modern-mono' ? 'font-mono uppercase tracking-widest' : 'font-serif';

  return (
    <section 
      id="photo-film-split-hero"
      className="relative w-full h-screen min-h-[480px] overflow-hidden mt-0 flex flex-col justify-stretch transition-colors duration-500 bg-[#060709]"
    >
      {/* Grid containing two dynamic full-height pictures with zero gap, edge-to-edge */}
      <div className="grid grid-cols-2 gap-0 w-full h-full relative overflow-hidden shadow-sm">
        
        {/* Left Side: Photo Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full overflow-hidden group select-none bg-zinc-900"
        >
          {/* Transparent Vignette Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700 z-10" />
          
          <img
            src={photoLeft.url}
            alt={photoLeft.title}
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] group-hover:scale-[1.04] transition-all duration-[1800ms] ease-out"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Label on left */}
          <div className="absolute bottom-6 left-6 md:left-12 z-20 pointer-events-none">
            <span className="text-[0.58rem] font-mono tracking-[0.4em] text-white/85 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              // SIGNATURE PORTRAITS
            </span>
          </div>
        </motion.div>

        {/* Right Side: Film Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full overflow-hidden group select-none border-l border-zinc-900/15 bg-zinc-900"
        >
          {/* Transparent Vignette Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-700 z-10" />

          <img
            src={photoRight.url}
            alt={photoRight.title}
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] group-hover:scale-[1.04] transition-all duration-[1800ms] ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Label on right */}
          <div className="absolute bottom-6 right-6 md:right-12 z-20 pointer-events-none text-right">
            <span className="text-[0.58rem] font-mono tracking-[0.4em] text-white/85 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              EST. CINEMATOGRAPHY //
            </span>
          </div>
        </motion.div>

        {/* The Overlaid Middle Typography: completely transparent, written directly on the images with zero gap */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center pointer-events-auto select-none max-w-sm px-6"
          >
            <div className="w-12 h-[1.5px] bg-amber-400/90 mb-4 drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]" />
            
            {/* Elegant large serif signature printed cleanly on top of the screen split */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-light uppercase text-white tracking-widest leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,1)] ${signatureFont}`}>
              sourav Sachin
            </h1>
            
            <div className="text-[0.75rem] md:text-[0.82rem] tracking-[0.45em] font-mono text-amber-300 font-bold uppercase mt-3 drop-shadow-[0_3px_8px_rgba(0,0,0,1)]">
              photo + film
            </div>

            <div className="w-12 h-[1.5px] bg-amber-400/90 mt-5 drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]" />
          </motion.div>
        </div>

      </div>

      {/* Downward elegant scroll arrow of the Hero screen */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 opacity-60 animate-bounce">
        <span className="text-[0.55rem] tracking-[0.3em] text-white/80 font-sans uppercase">SCROLL</span>
        <div className="w-[1px] h-4 bg-white/50" />
      </div>
    </section>
  );
}

