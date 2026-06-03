import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, MousePointerClick } from 'lucide-react';
import { ThemeConfig, PhotoItem } from '../types';

interface HeroSliderProps {
  config: ThemeConfig;
  photos: PhotoItem[];
}

export default function HeroSlider({ config, photos }: HeroSliderProps) {
  // Use category='wedding' or 'editorial' photos for the heroic slideshow
  const heroPhotos = photos.filter(p => p.category === 'wedding' || p.category === 'editorial').slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 7000); // 7s slide duration
    return () => clearInterval(timer);
  }, [heroPhotos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPhoto = heroPhotos[currentIndex] || photos[0];

  // Animated variations for text slide-up effects
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] // Custom refined bezier cubic-bezier(0.16, 1, 0.3, 1)
      }
    }
  };

  const splitTagline = config.tagline1.split(' ');

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-zinc-950">
      {/* Background Slideshow with crossfades */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Ambient overlay */}
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="h-full w-full object-cover object-center ken-burns-active"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content (Clean & High-Concept Typography) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between py-24 px-6 md:px-12 text-center text-white">
        {/* Top spacer */}
        <div />

        {/* Big Editorial Header */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            key={`hero-text-${currentIndex}`} // Re-trigger smooth reveal on slide change
            className="space-y-6"
          >
            <motion.p
              variants={textItemVariants}
              className="text-[0.68rem] md:text-[0.78rem] tracking-[0.55em] text-amber-300 font-sans font-semibold uppercase pl-2"
            >
              摄影 + 电影 · EMOTION ARCHIVED
            </motion.p>

            <motion.h1
              variants={textItemVariants}
              className="text-[2.2rem] sm:text-[3.5rem] md:text-[4.8rem] font-light font-serif tracking-normal leading-[1.05]"
            >
              {splitTagline.map((word, i) => {
                if (word.toUpperCase() === 'EDITORIAL') {
                  return (
                    <span key={i} className="font-serif italic text-amber-100 font-medium tracking-tight">
                      {word}{' '}
                    </span>
                  );
                }
                if (word.toUpperCase() === 'EMOTION') {
                  return (
                    <span key={i} className="font-serif font-semibold text-stroke uppercase text-[1.05em] inline-block filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
                      {word}{' '}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </motion.h1>

            <motion.div
              variants={textItemVariants}
              className="w-16 h-[1.5px] bg-amber-400/50 mx-auto my-6"
            />

            <motion.p
              variants={textItemVariants}
              className="text-[0.75rem] sm:text-[0.9rem] tracking-[0.3em] text-zinc-200 font-sans font-light max-w-xl mx-auto uppercase"
            >
              {config.tagline2}
            </motion.p>
          </motion.div>
        </div>

        {/* Footer info & Slide navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-7xl w-full mx-auto">
          {/* Location status */}
          <div className="text-left hidden md:block">
            <span className="text-[0.6rem] tracking-[0.4em] text-zinc-400 font-sans block uppercase">STATUS · ACCEPTING 2026/2027</span>
            <span className="text-[0.72rem] tracking-[0.25em] text-zinc-200 font-sans block font-semibold mt-1 uppercase">
              {config.location}
            </span>
          </div>

          {/* Indicators Custom styling */}
          <div className="flex items-center gap-3">
            {heroPhotos.map((_, index) => (
              <button
                id={`indicator-${index}`}
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-amber-400 w-8' : 'bg-white/40 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button
              id="hero-slide-prev"
              onClick={handlePrev}
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-[0.7rem] font-mono tracking-widest text-zinc-300">
              0{currentIndex + 1} / 0{heroPhotos.length}
            </span>
            <button
              id="hero-slide-next"
              onClick={handleNext}
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Downward elegant scroll arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-70 animate-bounce">
        <span className="text-[0.55rem] tracking-[0.3em] text-zinc-400 font-sans uppercase">SCROLL</span>
        <div className="w-[1px] h-6 bg-zinc-400/80" />
      </div>
    </section>
  );
}
