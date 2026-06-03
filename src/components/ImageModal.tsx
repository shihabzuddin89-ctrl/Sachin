import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Compass } from 'lucide-react';
import { PhotoItem } from '../types';

interface ImageModalProps {
  photos: PhotoItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageModal({ photos, selectedIndex, onClose, onPrev, onNext }: ImageModalProps) {
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable background page scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, onPrev, onNext, onClose]);

  if (selectedIndex === null) return null;

  const currentPhoto = photos[selectedIndex];
  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      <div 
        id="lightbox-container"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      >
        {/* Absolute Background Close Trigger */}
        <div id="lightbox-backdrop" className="absolute inset-0" onClick={onClose} />

        {/* Top Control Bar (Fades in) */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent text-white">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-[0.62rem] font-mono tracking-[0.3em] text-zinc-300 uppercase">
              LIGHTHOUSE VIEWER · IMAGE {selectedIndex + 1} OF {photos.length}
            </span>
          </div>

          <button
            id="lightbox-close-button"
            onClick={onClose}
            className="p-3 border border-white/15 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer text-white"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Left Arrow Trigger */}
        <button
          id="lightbox-prev-button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-6 z-50 p-4 border border-white/10 bg-black/30 hover:bg-white/10 hover:border-white transition-all duration-300 text-white rounded-full cursor-pointer"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Core Image Canvas container */}
        <div className="relative max-w-5xl max-h-[75vh] w-[90%] flex flex-col items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img
              key={currentPhoto.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl border border-zinc-900 select-none z-10"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </div>

        {/* Right Arrow Trigger */}
        <button
          id="lightbox-next-button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-6 z-50 p-4 border border-white/10 bg-black/30 hover:bg-white/10 hover:border-white transition-all duration-300 text-white rounded-full cursor-pointer"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Metadata Info Card (Fades in) */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent py-8 px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="max-w-xl mx-auto space-y-3"
          >
            <span className="inline-block text-[0.58rem] font-mono tracking-[0.4em] text-amber-300 border border-amber-300/30 px-3 py-1 rounded-full uppercase">
              {currentPhoto.category} ARCHIVE
            </span>

            <h3 className="text-[1.5rem] font-serif font-light text-white tracking-wide">
              {currentPhoto.title}
            </h3>

            <div className="flex justify-center items-center gap-6 text-zinc-300 text-[0.72rem] font-mono tracking-widest uppercase">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                {currentPhoto.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                YEAR {currentPhoto.year}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
