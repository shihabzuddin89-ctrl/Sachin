import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DEFAULT_THEME_CONFIG, 
  DEFAULT_PHOTOS, 
  DEFAULT_FILMS, 
  DEFAULT_REVIEWS, 
  DEFAULT_TIPS 
} from './data';
import { ThemeConfig, PhotoItem, FilmItem, ReviewItem, TipItem } from './types';

// Importing Core Components
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import MarqueeBanner from './components/MarqueeBanner';
import GallerySection from './components/GallerySection';
import ImageModal from './components/ImageModal';
import FilmsSection from './components/FilmsSection';
import TipsSection from './components/TipsSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
// Importing Brand New Individual Page Components
import AboutPage from './components/AboutPage';
import PortfolioPage from './components/PortfolioPage';
import FilmsPage from './components/FilmsPage';
import ServicesPage from './components/ServicesPage';
import JournalPage from './components/JournalPage';
import FaqPage from './components/FaqPage';
import ContactPage from './components/ContactPage';

export default function App() {
  // Config states & assets linked to visual editor CMS
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [films, setFilms] = useState<FilmItem[]>(DEFAULT_FILMS);
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);
  const [tips, setTips] = useState<TipItem[]>(DEFAULT_TIPS);

  // Active page routing state
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Lighthouse Lightbox indices
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Scroll to top on page switches
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Keyboard and modal helpers
  const handleOpenLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePrevLightbox = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  };

  const handleNextLightbox = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
  };

  // Handle resetting Visual Studio configs
  const handleResetToDefault = () => {
    if (window.confirm('Restore default Sourav Sachin photography firm preset details?')) {
      setConfig(DEFAULT_THEME_CONFIG);
      setPhotos(DEFAULT_PHOTOS);
      setFilms(DEFAULT_FILMS);
      setReviews(DEFAULT_REVIEWS);
      setTips(DEFAULT_TIPS);
      setCurrentPage('home');
    }
  };

  // Typography Class compilation
  const fontPresetClassName = 
    config.fontPreset === 'editorial' 
      ? 'font-serif' 
      : config.fontPreset === 'classic' 
      ? 'font-serif italic text-amber-900/95 dark:text-zinc-100' 
      : 'font-mono tracking-tight text-zinc-950 dark:text-zinc-200';

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-amber-300 selection:text-zinc-950 pb-12 ${fontPresetClassName} ${
      config.themeMode === 'cream' 
        ? 'bg-[#FAF6F0]' 
        : config.themeMode === 'dark' 
        ? 'bg-zinc-950 text-white' 
        : 'bg-white'
    }`}>
      {/* 1. Header Navigation block */}
      <Header 
        config={config} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Pages Router with luxury fade animations */}
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {currentPage === 'home' && (
            <div id="home-view" className="space-y-0">
              {/* 1. Hero Section Slider block */}
              <HeroSlider 
                config={config} 
                photos={photos} 
              />

              {/* 2. About Section Profile block */}
              <AboutSection 
                config={config} 
              />
              
              {/* Profile Read More Button decoration */}
              <div className="flex justify-center pb-20 -mt-8">
                <button
                  id="home-about-more-btn"
                  onClick={() => handleNavigate('about')}
                  className="px-6 py-3 border border-amber-500/30 hover:border-amber-500 text-amber-500 font-sans text-[0.68rem] tracking-[0.25em] uppercase rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  READ MY PHILOSOPHY & Timeline &rarr;
                </button>
              </div>

              {/* Marquee Banner */}
              <MarqueeBanner config={config} />

              {/* 3. Filterable Signature Gallery block */}
              <GallerySection 
                config={config} 
                photos={photos} 
                onSelectPhoto={handleOpenLightbox}
              />

              {/* View Full Portfolio Button decoration */}
              <div className="flex justify-center pb-24 -mt-4">
                <button
                  id="home-portfolio-more-btn"
                  onClick={() => handleNavigate('portfolio')}
                  className="px-6 py-3 border border-amber-500/30 hover:border-amber-500 text-amber-500 font-sans text-[0.68rem] tracking-[0.25em] uppercase rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  EXPLORE PORTFOLIO STYLES &rarr;
                </button>
              </div>

              {/* 4. Optional Film Reel block */}
              {config.showFilms && (
                <div className="space-y-0">
                  <FilmsSection 
                    config={config} 
                    films={films} 
                  />
                  <div className="flex justify-center pb-24">
                    <button
                      id="home-films-more-btn"
                      onClick={() => handleNavigate('films')}
                      className="px-6 py-3 border border-amber-500/30 hover:border-amber-500 text-amber-500 font-sans text-[0.68rem] tracking-[0.25em] uppercase rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      ENTER THEATER ROOM &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* 5. Optional Tips Guidelines accordion */}
              {config.showTips && (
                <div id="tips-block" className="space-y-0">
                  <TipsSection 
                    config={config} 
                    tips={tips} 
                  />
                  <div className="flex justify-center pb-24">
                    <button
                      id="home-faq-more-btn"
                      onClick={() => handleNavigate('faq')}
                      className="px-6 py-3 border border-amber-500/30 hover:border-amber-500 text-amber-500 font-sans text-[0.68rem] tracking-[0.25em] uppercase rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      BROWSE ALL PERSISTENT FAQS &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* 6. Optional Testimonial Carousel block */}
              {config.showReviews && (
                <Testimonials 
                  config={config} 
                  reviews={reviews} 
                />
              )}

              {/* 7. Minimalist Booking Form landing teaser block */}
              <ContactSection 
                config={config} 
              />
              <div className="flex justify-center pb-12">
                <button
                  id="home-register-more-btn"
                  onClick={() => handleNavigate('contact')}
                  className="px-6 py-3 border border-amber-500/35 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-zinc-950 font-sans text-[0.68rem] tracking-[0.25em] uppercase rounded-full transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  OPEN BESPOKE SCHEDULER SUITE &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Individual Page components */}
          {currentPage === 'about' && (
            <AboutPage 
              config={config} 
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'portfolio' && (
            <PortfolioPage 
              config={config} 
              photos={photos} 
              onSelectPhoto={handleOpenLightbox}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage 
              config={config} 
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'films' && (
            <FilmsPage 
              config={config} 
              films={films} 
            />
          )}

          {currentPage === 'journal' && (
            <JournalPage 
              config={config} 
            />
          )}

          {currentPage === 'faq' && (
            <FaqPage 
              config={config} 
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage 
              config={config} 
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* 10. Lightbox Lighthouse Modal overlay */}
      <ImageModal
        photos={photos}
        selectedIndex={selectedPhotoIndex}
        onClose={handleCloseLightbox}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
      />
    </div>
  );
}
