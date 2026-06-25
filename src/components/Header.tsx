import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig } from '../types';
import { COLOR_PALETTES } from '../data';

interface HeaderProps {
  config: ThemeConfig;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ config, currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'HOME', id: 'home' },
    { label: 'PORTFOLIO', id: 'portfolio' },
    { label: 'FILMS', id: 'films' },
    { label: 'JOURNAL', id: 'journal' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleNavLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const palette = COLOR_PALETTES[config.accentColor as keyof typeof COLOR_PALETTES] || COLOR_PALETTES.champagne;

  const fontClass = config.fontPreset === 'editorial' 
    ? 'font-serif' 
    : config.fontPreset === 'classic' 
    ? 'font-serif italic' 
    : 'font-mono text-xs tracking-wider';

  const logoFontClass = config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif';

  const isHeaderOnDarkBg = config.themeMode === 'dark';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#060709]/85 backdrop-blur-md shadow-lg border-b border-[#E5C158]/10'
          : 'bg-transparent border-b border-transparent'
      } h-[52px] lg:h-[68px] flex items-center`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Desktop Header Layout */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full">
          {/* Left Column: Brand Logo */}
          <div className="flex justify-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick('home');
              }}
              className="flex flex-col items-start transition-opacity duration-300 hover:opacity-80 shrink-0"
            >
              <span className={`text-[1.12rem] lg:text-[1.22rem] font-light tracking-[0.22em] ${logoFontClass} text-[#E5C158]`}>
                {config.studioName.toUpperCase()}
              </span>
              <span className="text-[0.5rem] tracking-[0.45em] text-white/95 -mt-1 font-sans pl-0.5 font-medium">
                PHOTO + FILM
              </span>
            </a>
          </div>

          {/* Center Column: Desktop Nav Links */}
          <nav className="flex items-center justify-center gap-5 lg:gap-6">
            {menuItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleNavLinkClick(item.id)}
                className={`text-[0.64rem] font-sans tracking-[0.22em] font-semibold transition-colors cursor-pointer relative py-0.5 hover:text-[#E5C158] ${
                  currentPage === item.id
                    ? 'text-[#E5C158]'
                    : 'text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#E5C158] rounded" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Column: Inquire CTA Button */}
          <div className="flex justify-end items-center gap-4 shrink-0">
            <button
              id="header-cta-button"
              onClick={() => handleNavLinkClick('contact')}
              className="cursor-pointer px-4 py-2 text-[0.64rem] tracking-[0.22em] font-sans font-semibold border border-[#E5C158]/40 text-[#E5C158] rounded-full transition-all duration-300 flex items-center gap-1.5 hover:-translate-y-[1px] hover:shadow-xs hover:bg-[#E5C158] hover:text-[#0A1931] hover:border-[#E5C158]"
            >
              INQUIRE
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Mobile Header Layout */}
        <div className="lg:hidden flex items-center justify-between w-full">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('home');
            }}
            className="flex flex-col items-start transition-opacity duration-300 hover:opacity-80"
          >
            <span className={`text-[1.02rem] font-light tracking-[0.22em] ${logoFontClass} text-[#E5C158]`}>
              {config.studioName.toUpperCase()}
            </span>
            <span className="text-[0.48rem] tracking-[0.45em] text-[#E5C158]/95 -mt-1 font-sans pl-0.5 font-medium">
              PHOTO + FILM
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-[#E5C158]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between py-6 px-6 md:px-12 min-h-screen bg-[#060709] text-white"
          >
            {/* Ambient luxury subtle glow for dark mode */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,193,88,0.06),transparent_50%)] pointer-events-none" />

            {/* Header row inside mobile menu */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex flex-col text-left">
                <span className="text-[0.62rem] font-mono tracking-[0.35em] font-bold text-[#E5C158] uppercase">
                  {config.studioName.toUpperCase()}
                </span>
                <span className="text-[0.45rem] font-sans tracking-[0.4em] text-zinc-300 uppercase mt-0.5 font-medium">
                  REVEL IN TIMELESS STORIES
                </span>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation Links inside Mobile Menu */}
            <div className="my-auto py-6 sm:py-8 flex flex-col space-y-3.5 sm:space-y-4.5 overflow-y-auto pr-2 relative z-10">
              {menuItems.map((item, index) => {
                const isActive = currentPage === item.id;
                return (
                  <motion.button
                    id={`mobile-nav-link-${item.id}`}
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(item.id);
                    }}
                    className="flex items-center gap-3.5 text-left py-1 inline-block cursor-pointer"
                  >
                    <span 
                      className={`text-xl sm:text-2xl font-light tracking-[0.14em] uppercase font-sans transition-all duration-300 relative ${
                        isActive 
                          ? 'text-[#E5C158] tracking-[0.18em] font-medium pl-1' 
                          : 'text-zinc-200 hover:text-[#E5C158] hover:tracking-[0.18em]'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute -left-1.5 top-[50%] -translate-y-[50%] w-1 h-1 bg-[#E5C158] rounded-full" />
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Segment */}
            <div className="flex flex-col mt-auto relative z-10 pt-4 border-t border-white/10">
              <motion.button
                id="mobile-header-cta"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('contact');
                }}
                className="relative w-full py-3.5 tracking-[0.25em] text-[0.66rem] font-sans font-semibold uppercase rounded-full transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md cursor-pointer text-center bg-[#E5C158] border border-[#E5C158] text-[#0A1931] hover:bg-[#F3D17E] hover:border-[#F3D17E]"
              >
                COMMISSION OUR STUDIO &nbsp;&rarr;
              </motion.button>
              
              <div className="flex items-center justify-between mt-3 text-[0.52rem] font-mono tracking-[0.3em] text-zinc-400 uppercase">
                <span>{config.location.toUpperCase()}</span>
                <span>SOURAV GUPTA &copy; 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
