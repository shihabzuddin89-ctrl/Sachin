import { ThemeConfig } from '../types';

interface FooterProps {
  config: ThemeConfig;
  onNavigate: (pageId: string) => void;
}

export default function Footer({ config, onNavigate }: FooterProps) {
  const isDarkMode = config.themeMode === 'dark';

  const findYourWayLinks = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'FILMS', id: 'films' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PORTFOLIO', id: 'portfolio' },
    { label: 'CONTACT', id: 'contact' },
    { label: 'FAQ', id: 'faq' },
    { label: 'JOURNAL', id: 'journal' },
  ];

  const elsewhereLinks = [
    { label: 'INSTAGRAM', url: 'https://instagram.com/souravguptafilm' },
    { label: 'FACEBOOK', url: 'https://facebook.com/souravguptafilm' },
    { label: 'PINTEREST', url: 'https://pinterest.com/souravguptafilm' },
    { label: 'TIKTOK', url: 'https://tiktok.com/@souravguptafilm' },
    { label: 'YOUTUBE', url: 'https://youtube.com/souravguptafilm' },
  ];

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-12 border-t border-white/5 transition-colors duration-500 w-full bg-[#0E0F12] text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 items-start">
          
          {/* Left Column: Monogram Logo and tagline */}
          <div className="md:col-span-5 space-y-6">
            {/* Custom crafted modular logo SG */}
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-baseline relative">
                {/* Visual "SG" logo built with beautiful serif typography like PR */}
                <span className="text-6xl md:text-7xl font-light tracking-tighter leading-none font-serif text-white select-none">
                  S<span className="italic text-[#E5C158] font-normal">G</span>
                </span>
                <span className="text-[#E5C158] text-[10px] absolute -bottom-1 right-2 animate-pulse">&bull;</span>
              </div>
              <div className="pt-2">
                <span className="block text-xs sm:text-[0.72rem] font-bold tracking-[0.4em] text-white uppercase font-sans">
                  SOURAV GUPTA
                </span>
                <span className="block text-[0.55rem] font-mono tracking-[0.45em] text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                  PHOTO + FILM
                </span>
              </div>
            </div>

            <p className="max-w-xs text-[0.62rem] sm:text-[0.68rem] leading-relaxed tracking-[0.18em] text-zinc-500 dark:text-zinc-400 font-sans uppercase">
              TIMELESS, STORYTELLING
              <br />
              WEDDING PHOTOGRAPHY IN
              <br />
              TORONTO, ONTARIO
            </p>
          </div>

          {/* Middle Column: Find Your Way */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-1">
              <span className="block font-serif italic text-zinc-400 dark:text-zinc-500 text-[1.05rem] sm:text-lg leading-none lowercase tracking-wide">
                find your way
              </span>
              <span className="block font-sans font-light tracking-[0.22em] text-sm text-white uppercase">
                AROUND
              </span>
            </div>

            <ul className="space-y-3 pt-2">
              {findYourWayLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="cursor-pointer text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-zinc-400 hover:text-[#E5C158] hover:tracking-[0.35em] transition-all duration-300 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Find Us Elsewhere */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-1">
              <span className="block font-serif italic text-zinc-400 dark:text-zinc-500 text-[1.05rem] sm:text-lg leading-none lowercase tracking-wide">
                find us
              </span>
              <span className="block font-sans font-light tracking-[0.22em] text-sm text-white uppercase">
                ELSEWHERE
              </span>
            </div>

            <ul className="space-y-3 pt-2">
              {elsewhereLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.62rem] sm:text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-zinc-500 dark:text-zinc-400 hover:text-amber-500 hover:tracking-[0.35em] transition-all duration-300 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider and Legalese Footer Credits */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-900 pt-8 mt-4 text-center space-y-4">
          <p className="text-[0.55rem] sm:text-[0.62rem] font-mono tracking-[0.35em] text-zinc-400 dark:text-zinc-500 uppercase">
            &copy; 2026 SOURAV GUPTA PHOTO + FILM &bull; ALL RIGHTS RESERVED
          </p>
          
          <div className="flex items-center justify-center gap-4 text-[0.55rem] sm:text-[0.62rem] font-mono tracking-widest uppercase">
            <button
              onClick={() => onNavigate('faq')}
              className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 hover:underline transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <span className="text-zinc-300 dark:text-zinc-800">|</span>
            <button
              onClick={() => onNavigate('faq')}
              className="text-zinc-500 dark:text-zinc-400 hover:text-amber-500 hover:underline transition-colors cursor-pointer"
            >
              TERMS & CONDITIONS
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
