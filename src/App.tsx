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
import AboutSection from './components/AboutSection';
import MarqueeBanner from './components/MarqueeBanner';
import GallerySection from './components/GallerySection';
import ImageModal from './components/ImageModal';
import FilmsSection from './components/FilmsSection';
import TipsSection from './components/TipsSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import FilmGlance from './components/FilmGlance';
import DoublePhotoSplit from './components/DoublePhotoSplit';
import Footer from './components/Footer';
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
  const fontPresetClassName = 'font-sans antialiased text-zinc-100 leading-relaxed font-normal';

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#E5C158] selection:text-[#060709] pb-12 ${fontPresetClassName} bg-[#060709] text-white`}>
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
              {/* 1. Full Screen Editorial Double Photo Split Hero */}
              <DoublePhotoSplit 
                config={config} 
                photos={photos} 
              />

              {/* 2. About Section Profile block */}
              <AboutSection 
                config={config} 
                onNavigate={handleNavigate}
              />
              
              {/* 3. Filterable Signature Gallery block (Curated for Home) */}
              <GallerySection 
                config={config} 
                photos={photos} 
                onSelectPhoto={handleOpenLightbox}
                featuredOnly={true}
                onNavigate={handleNavigate}
              />

              {/* Cinematic Video/Film Option Glance */}
              {config.showFilms && (
                <FilmGlance 
                  config={config} 
                  films={films} 
                  onNavigate={handleNavigate} 
                />
              )}

              {/* 4. Optional Testimonial Carousel block */}
              {config.showReviews && (
                <Testimonials 
                  config={config} 
                  reviews={reviews} 
                />
              )}

              {/* 5. Minimalist Booking Form landing teaser block */}
              <ContactSection 
                config={config} 
              />
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

      <Footer 
        config={config} 
        onNavigate={handleNavigate} 
      />

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
