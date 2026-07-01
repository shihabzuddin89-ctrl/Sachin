import { motion } from 'motion/react';
import { FadeUpReveal } from './ScrollReveal';
import { ThemeConfig } from '../types';

interface SectionDividerProps {
  category: string;
  title: string;
  subtitle?: string;
  id?: string;
  config?: ThemeConfig;
}

export default function SectionDivider({ category, title, subtitle, id, config }: SectionDividerProps) {
  const isDarkMode = !config || config.themeMode === 'dark';

  return (
    <div 
      id={id}
      className={`w-full py-20 md:py-28 lg:py-32 border-y relative z-10 overflow-hidden transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-[#060709] border-zinc-900/40 text-white' 
          : 'bg-[#E4E3DE] border-zinc-300/60 text-zinc-900'
      }`}
    >
      {/* Decorative ultra-subtle pattern block */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode 
          ? 'bg-radial-to-b from-zinc-950/20 via-transparent to-transparent' 
          : 'bg-radial-to-b from-zinc-100/40 via-transparent to-transparent'
      }`} />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
        <FadeUpReveal>
          <div className="flex flex-col items-center">
            {/* Category / Tagline */}
            <span className="text-[0.62rem] md:text-[0.68rem] font-mono tracking-[0.45em] text-amber-500 font-bold uppercase block mb-4 sm:mb-5">
              // {category}
            </span>
            
            {/* Main Elegant Title */}
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-extralight font-serif tracking-[0.25em] uppercase leading-relaxed max-w-2xl ${
              isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
            }`}>
              {title}
            </h2>
            
            {/* Secondary Subtitle text */}
            {subtitle && (
              <p className={`text-[0.7rem] sm:text-[0.78rem] tracking-[0.18em] font-sans max-w-lg mt-5 leading-relaxed uppercase ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {subtitle}
              </p>
            )}
            
            {/* Minimalist Divider Line */}
            <div className="w-16 h-[1px] bg-amber-500/30 mt-8 sm:mt-10" />
          </div>
        </FadeUpReveal>
      </div>
    </div>
  );
}
