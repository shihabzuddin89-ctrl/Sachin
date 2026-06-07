import { Sparkles, Camera } from 'lucide-react';
import { ReviewItem, ThemeConfig } from '../types';

interface TestimonialsProps {
  config: ThemeConfig;
  reviews?: ReviewItem[];
}

export default function Testimonials({ config }: TestimonialsProps) {
  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="reviews"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden relative ${
        config.themeMode === 'cream'
          ? 'bg-[#FAF6F0] text-zinc-900 border-b border-zinc-200/50'
          : isDarkMode
          ? 'bg-zinc-950 text-white'
          : 'bg-zinc-50 text-zinc-900 border-b border-zinc-100'
      }`}
    >
      {/* Editorial aesthetic watermark backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[12rem] sm:text-[16rem] font-serif tracking-tighter text-zinc-500/[0.02] select-none pointer-events-none font-light uppercase">
        SOURAV
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Dynamic Two Column Asymmetric Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Stunning Artistic Portrait Framing (Placed first for Left orientation) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-start">
            
            {/* Background design accents */}
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-amber-500/[0.06] to-transparent blur-2xl pointer-events-none" />

            {/* Solid elegant thick visual box backdrop */}
            <div className="absolute -bottom-6 -left-6 w-36 h-36 border-b-2 border-l-2 border-amber-500/20 rounded-bl-[3rem] pointer-events-none hidden sm:block" />
            <div className="absolute -top-6 -right-6 w-36 h-36 border-t-2 border-r-2 border-amber-500/20 rounded-tr-[3rem] pointer-events-none hidden sm:block" />

            {/* Main Portrait Frame Card */}
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.65)] border border-zinc-200/10 w-full max-w-[460px] aspect-[4/5] bg-zinc-900">
              
              {/* Elegant Creative Master portrait of Sourav */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
                alt="Sourav Gupta - Creator and Lead Photographer"
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.03] transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1)"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Vignette Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20 group-hover:from-black/95 transition-all duration-[1000ms] pointer-events-none" />

              {/* Corner Metadata Card overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-10 p-6 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/5 space-y-1 transform group-hover:translate-y-[-5px] transition-transform duration-500">
                <span className="block text-[0.58rem] font-mono tracking-widest text-amber-500 uppercase font-black">
                  CRAFT &bull; VISION &bull; SOUL
                </span>
                <span className="block text-base font-serif text-white font-semibold">
                  Sourav Gupta Co. Estd. 2017
                </span>
                <span className="block text-xs font-sans text-zinc-300 italic">
                  "Let's capture the poetry of your love letter."
                </span>
              </div>
            </div>

            {/* Playful Floating Badge - Left side positioned */}
            <div className="absolute -bottom-8 -left-4 bg-amber-500 text-black px-5 py-5 rounded-full shadow-2xl h-24 w-24 flex flex-col justify-center items-center text-center select-none rotate-[-6deg] border border-zinc-950/5 hover:rotate-12 transition-transform duration-500 hidden sm:flex">
              <Sparkles className="w-5 h-5 mb-0.5 animate-pulse" />
              <span className="font-mono text-[0.68rem] leading-none font-bold">100% LOVE</span>
            </div>

          </div>

          {/* Right Column: Wealth of Elegant Bio & Writing (Placed second for Right orientation) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-5">
              <span className="text-amber-500 text-[0.7rem] tracking-[0.38em] uppercase font-sans font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-500" />
                PRINCIPAL DIRECTOR & PHOTOGRAPHER
              </span>
              
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                Hi, I'm <span className="font-serif italic font-normal text-amber-500 block sm:inline">Sourav Gupta</span>
              </h2>
            </div>

            <div className="space-y-8 text-zinc-600 dark:text-zinc-350 font-sans tracking-wide leading-relaxed text-base md:text-lg">
              <p>
                I look at weddings not as simple, routine events to be documented, but as living, breathing cinematic poems of high-contrast emotion, light, and timeless beauty. 
              </p>
              <p>
                Over the last decade, I have focused on capturing quiet, unposed glances, natural bursts of laughter, and the rich, authentic story that exists between traditional poses. My style resides in the sweet spot between haute-fashion editorial elegance and documentary-style honesty.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
