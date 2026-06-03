import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { ReviewItem, ThemeConfig } from '../types';

interface TestimonialsProps {
  config: ThemeConfig;
  reviews: ReviewItem[];
}

export default function Testimonials({ config, reviews }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 9000); // 9 seconds per quote review
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const curReview = reviews[currentIndex];
  if (!curReview) return null;

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="reviews"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden text-center relative ${
        config.themeMode === 'cream'
          ? 'bg-[#FAF6F0] text-zinc-900 border-b border-zinc-200/50'
          : isDarkMode
          ? 'bg-zinc-950 text-white'
          : 'bg-zinc-50 text-zinc-900 border-b border-zinc-100'
      }`}
    >
      {/* Decorative Elegant Quote Icon behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.025] dark:opacity-[0.015] select-none text-[#d4af37] font-serif text-[24rem] -z-0">
        “
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            05 // CLIENT TESTIMONY
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>
        
        {/* Five golden stars indicator */}
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
          ))}
        </div>

        {/* Dynamic Reviews Text (Crossfade animation) */}
        <div className="min-h-[200px] sm:min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-[1.35rem] sm:text-[1.7rem] font-serif font-light leading-relaxed tracking-normal max-w-3xl mx-auto italic select-none">
                “{curReview.quote}”
              </p>

              {/* Author and metadata line */}
              <div className="space-y-1">
                <span className="block text-[0.75rem] font-sans tracking-[0.4em] font-bold text-amber-500 uppercase">
                  {curReview.author}
                </span>
                <span className="block text-[0.68rem] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                  {curReview.location} · {curReview.date}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial Navigators */}
        <div className="flex items-center justify-center gap-6 pt-6">
          <button
            id="review-prev"
            onClick={handlePrev}
            className="p-3 border border-zinc-300 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-amber-500"
            aria-label="Previous quote"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            {reviews.map((_, index) => (
              <button
                id={`review-dot-${index}`}
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-amber-400 w-6' : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            id="review-next"
            onClick={handleNext}
            className="p-3 border border-zinc-300 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-amber-500"
            aria-label="Next quote"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
