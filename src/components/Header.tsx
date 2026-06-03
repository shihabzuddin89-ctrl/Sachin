import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
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
    { label: 'SERVICES', id: 'services' },
    { label: 'FILMS', id: 'films' },
    { label: 'JOURNAL', id: 'journal' },
    { label: 'ABOUT', id: 'about' },
    { label: 'FAQ', id: 'faq' },
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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-zinc-100 py-4'
          : 'bg-transparent py-6'
      } ${config.themeMode === 'dark' && isScrolled ? 'bg-zinc-950/95 border-zinc-900' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick('home');
          }}
          className={`flex flex-col items-start transition-opacity duration-300 hover:opacity-80`}
        >
          <span className={`text-[1.3rem] font-light tracking-[0.25em] ${logoFontClass} ${
            config.themeMode === 'dark' && !isScrolled ? 'text-white' : 'text-zinc-900'
          }`}>
            {config.studioName.toUpperCase()}
          </span>
          <span className="text-[0.55rem] tracking-[0.5em] text-amber-500 -mt-1 font-sans pl-1">
            PHOTO + FILM
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {menuItems.map((item) => (
            <button
              id={`nav-link-${item.id}`}
              key={item.id}
              onClick={() => handleNavLinkClick(item.id)}
              className={`text-[0.68rem] font-sans tracking-[0.25em] font-medium transition-colors cursor-pointer relative py-1 hover:text-amber-500 ${
                currentPage === item.id
                  ? 'text-amber-600'
                  : config.themeMode === 'dark' && !isScrolled
                  ? 'text-zinc-200'
                  : 'text-zinc-600'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-500/80 rounded" />
              )}
            </button>
          ))}
        </nav>

        {/* Inquire CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            id="header-cta-button"
            onClick={() => handleNavLinkClick('contact')}
            className={`cursor-pointer px-5 py-2.5 text-[0.68rem] tracking-[0.25em] font-sans font-medium border rounded-full transition-all duration-300 flex items-center gap-2 hover:-translate-y-[1px] hover:shadow-xs ${
              config.themeMode === 'dark' && !isScrolled
                ? 'border-white/30 text-white hover:bg-white/10 hover:border-white'
                : 'border-zinc-800 text-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-900'
            }`}
          >
            INQUIRE NOW
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md ${
              config.themeMode === 'dark' && !isScrolled ? 'text-white' : 'text-zinc-800'
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className={`fixed inset-y-0 right-0 top-[72px] bottom-0 w-80 z-30 flex flex-col justify-between py-12 px-8 shadow-2xl animate-fade-in ${
            config.themeMode === 'dark' ? 'bg-zinc-950 text-white border-l border-zinc-900' : 'bg-white text-zinc-900 border-l border-zinc-100'
          }`}
        >
          <div className="flex flex-col gap-5 text-left pt-6">
            {menuItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleNavLinkClick(item.id)}
                className={`text-[1.1rem] font-light tracking-[0.2em] font-serif block text-left hover:text-amber-500 py-1.5 border-b border-zinc-100 dark:border-zinc-900 ${
                  currentPage === item.id ? 'text-amber-500 font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 text-center mt-auto">
            <button
              id="mobile-header-cta"
              onClick={() => handleNavLinkClick('contact')}
              className="w-full py-4 bg-zinc-900 text-white hover:bg-black text-xs font-semibold tracking-widest rounded-xl"
            >
              INQUIRE NOW
            </button>
            <p className="text-[0.62rem] tracking-widest text-zinc-400 uppercase">
              {config.location}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
