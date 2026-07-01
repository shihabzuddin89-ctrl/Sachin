import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
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
import SectionDivider from './components/SectionDivider';
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

  // Active page routing state helper
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return 'home';
    const validPages = ['home', 'about', 'portfolio', 'services', 'films', 'journal', 'faq', 'contact'];
    return validPages.includes(hash) ? hash : 'home';
  };

  // Active page routing state
  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis for smooth scroll inertia
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenisInstance(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Listen to hash change for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [lenisInstance]);

  // Lighthouse Lightbox indices
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Scroll to top on page switches and sync with browser hash
  const handleNavigate = (pageId: string) => {
    const targetHash = pageId === 'home' ? '' : `#${pageId}`;
    
    if (window.location.hash === targetHash || (window.location.hash === '' && targetHash === '')) {
      setCurrentPage(pageId);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.location.hash = targetHash;
    }
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
      handleNavigate('home');
    }
  };

  const handleToggleTheme = () => {
    setConfig((prev) => ({
      ...prev,
      themeMode: prev.themeMode === 'dark' ? 'light' : 'dark'
    }));
  };

  // Typography Class compilation
  const isDarkMode = config.themeMode === 'dark';
  const mainBgClass = isDarkMode ? 'bg-[#060709] text-zinc-100' : 'bg-[#E4E3DE] text-zinc-900';
  const fontPresetClassName = `font-sans antialiased leading-relaxed font-normal ${mainBgClass}`;

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-[#C5A880] selection:text-[#060709] pb-12 ${fontPresetClassName}`}>
      {/* 1. Header Navigation block */}
      <Header 
        config={config} 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onThemeToggle={handleToggleTheme}
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
              
              {/* Premium Space Separator Chapter 1 */}
              <SectionDivider 
                category="CURATED PORTFOLIO"
                title="RESONANCE OF LOVE"
                subtitle="Honest stories told through cinematic frames"
                config={config}
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
                <>
                  <SectionDivider 
                    category="CINEMATIC REEL"
                    title="MOTION PORTRAITS"
                    subtitle="The rhythm of luxury films and organic visual motion"
                    config={config}
                  />
                  <FilmGlance 
                    config={config} 
                    films={films} 
                    onNavigate={handleNavigate} 
                  />
                </>
              )}

              {/* 4. Optional Testimonial Carousel block */}
              {config.showReviews && (
                <>
                  <SectionDivider 
                    category="THE CREATOR & WORDS"
                    title="BEHIND THE LENS"
                    subtitle="Sourav Gupta — crafting fine-art memories for rare souls"
                    config={config}
                  />
                  <Testimonials 
                    config={config} 
                    reviews={reviews} 
                  />
                </>
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
