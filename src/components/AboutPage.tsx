import { motion } from 'motion/react';
import { Camera, Film, Award, Heart, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { ThemeConfig } from '../types';
import { FadeUpReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface AboutPageProps {
  config: ThemeConfig;
  onNavigate: (page: string) => void;
}

export default function AboutPage({ config, onNavigate }: AboutPageProps) {
  const isDarkMode = config.themeMode === 'dark';

  const years = [
    { year: '2015', tag: 'The Inception', title: 'Aperture Foundations', desc: 'Commenced professional fine-art documentation in Toronto, experimenting with raw shadows and historical architecture.' },
    { year: '2018', tag: 'The Awakening', title: 'Analog Rediscovery', desc: 'Incorporated vintage medium-format cameras (Hasselblad & Pentax 67) into wedding collections, creating our signature luxury aesthetic.' },
    { year: '2021', tag: 'The Prestige', title: 'Cap commission limit', desc: 'Enforced our strict limit of 20 couples annually to secure unprecedented artistic and personal dedication for every commission.' },
    { year: '2025', tag: 'The Present', title: 'Global Archives', desc: 'Now traveling globally to capture destination legacies across Paris, Tuscany, California, and beyond.' }
  ];

  const corePhilosophy = [
    { title: 'Organic Spontaneity', desc: 'No stiff postures, no robotic expressions. We curate micro-moments of comfort so that your true self breathes within the frame.' },
    { title: 'The Cinematic Edge', desc: 'We pair high-contrast noir shadow curves with warm golden hour tones, resulting in timeless visuals that never fall victim to trends.' },
    { title: 'Archival Obsession', desc: 'From Italian-bound leathers to secure cloud backups, we treat your imagery and filmmaking with strict archival precision.' }
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Big split column: Portrait Left, Philosophy Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28">
          
          {/* Portrait Sidebar (5 columns) */}
          <FadeUpReveal className="lg:col-span-5 relative">
            <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-3xl ${
              isDarkMode ? 'bg-zinc-900 border-zinc-200/10' : 'bg-zinc-100 border-zinc-200'
            } border shadow-2xl`}>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                alt="Portrait of Sourav Sachin"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-[1200ms]"
                referrerPolicy="no-referrer"
              />
              {/* Slide block reveal curve */}
              <motion.div
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
                className="absolute inset-0 bg-[#C5A880] z-10 pointer-events-none"
              />
            </div>

            <div className="mt-8 space-y-4">
              <span className="text-[0.62rem] font-mono tracking-[0.3em] text-[#C5A880] uppercase block">
                MAIN CREATIVE KIT
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className={`p-4 border rounded-xl ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50'}`}>
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Leica SL2 Duo</span>
                  <span className={`text-[0.65rem] font-mono font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>50mm f/1.4 &middot; 35mm f/2.0</span>
                </div>
                <div className={`p-4 border rounded-xl ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50'}`}>
                  <span className={`font-bold block ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Pentax 67 Film</span>
                  <span className={`text-[0.65rem] font-mono font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>105mm f/2.4 &middot; Portra 400</span>
                </div>
              </div>
            </div>
          </FadeUpReveal>

          {/* Philosophy Narrative (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <FadeUpReveal className="space-y-4">
              <span className="text-[#C5A880] text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                 ARTIST MINDSET
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-tight ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              } ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                Candid frames, <span className="italic font-serif text-[#C5A880]">masterly</span> art directed.
              </h1>
              <div className="w-16 h-[1.5px] bg-[#C5A880]/80 my-4" />
            </FadeUpReveal>

            <FadeUpReveal delay={0.15}>
              <div className={`prose text-sm leading-relaxed font-normal space-y-6 ${
                isDarkMode ? 'text-zinc-200' : 'text-zinc-700'
              }`}>
                <p>
                   Hello there, I'm <span className="font-semibold text-[#C5A880]">{config.studioName}</span>. Most couples who step before my lens start by telling me: 
                  <span className="italic"> "We have never done this, we feel so clumsy in front of cameras."</span> My complete mission is to erase that fear entirely.
                </p>
                <p>
                  My working philosophy doesn't rely on static, robot-like poses or forced smiles. Instead, we establish real conversations, gentle walks, and tailored interactions. We allow the authentic gravity of your kinship to surface.
                </p>
                <p>
                  Whether blending digital medium format cameras for absolute sharpness or classic Kodak Super 8 reels to capture nostalgic, flickering motion, we preserve your legacy with absolute devotion. No distractions, just beauty.
                </p>
              </div>
            </FadeUpReveal>

            {/* Philosophy items cards list */}
            <FadeUpReveal delay={0.3} className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-zinc-200'}`}>
              <span className="text-[0.65rem] font-mono tracking-widest text-[#C5A880] uppercase block mb-4">
                CORE PHILOSOPHY METRICS
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {corePhilosophy.map((phil, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-[#C5A880] text-xs font-bold font-sans block">
                      0{idx + 1} &middot; {phil.title}
                    </span>
                    <p className={`text-[0.68rem] leading-relaxed font-sans font-medium ${
                      isDarkMode ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                      {phil.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUpReveal>
          </div>

        </div>

        {/* Detailed Timeline representation */}
        <div className="mb-28">
          <FadeUpReveal className="text-center max-w-xl mx-auto space-y-4 mb-20">
            <span className="text-[#C5A880] text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
               STUDIO MILESTONES
            </span>
            <h2 className={`text-3xl font-light tracking-tight ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            } ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
               Our Creative Evolution
            </h2>
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
               A decade-long historical trace of our photography philosophy, commissions, and technological maturity since inception.
            </p>
          </FadeUpReveal>
 
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {years.map((y, index) => (
              <StaggerItem key={index}>
                <div
                  className={`p-6 h-full border rounded-2xl hover:border-[#C5A880]/40 duration-300 transition-all space-y-4 ${
                    isDarkMode ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-zinc-50'
                  }`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-light text-[#C5A880] font-sans">{y.year}</span>
                    <span className={`text-[0.55rem] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full font-semibold ${
                      isDarkMode ? 'text-white bg-white/10' : 'text-zinc-800 bg-zinc-100'
                    }`}>
                      {y.tag}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-xs font-semibold uppercase font-mono tracking-wider ${
                      isDarkMode ? 'text-zinc-100' : 'text-zinc-900'
                    }`}>
                      {y.title}
                    </h4>
                    <p className={`text-[0.68rem] font-medium leading-relaxed ${
                      isDarkMode ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                      {y.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Global Travel Map section or prompt */}
        <FadeUpReveal>
          <div className={`p-8 md:p-12 border rounded-3xl text-center relative overflow-hidden flex flex-col items-center justify-center space-y-6 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
          }`}>
            {/* Subtle decoration map graphics layout */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(197,168,128,0.06),transparent_75%)] pointer-events-none" />
            <Compass className="w-8 h-8 text-[#C5A880] animate-spin-slow" />
            
            <div className="space-y-2 max-w-lg relative z-5">
              <span className="text-[0.62rem] font-mono text-[#C5A880] tracking-[0.3em] uppercase block">
                WORLDWIDE WEDDINGS COMMISSIONED
              </span>
              <h3 className={`text-2xl font-light font-serif tracking-tight ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}>
                Currently Booking international dates for 2026 / 2027
              </h3>
              <p className={`text-xs leading-relaxed font-sans font-medium mt-2 ${
                isDarkMode ? 'text-zinc-200' : 'text-zinc-600'
              }`}>
                From historic French villas, raw coastlines of Big Sur California, to luxury Tuscan elopements, we travel for your kinematics. Let's coordinate your bespoke travel package.
              </p>
            </div>

            <button
              id="about-travel-cta"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 cursor-pointer bg-[#C5A880] hover:bg-[#D4B48F] text-[#060709] font-sans font-semibold text-xs tracking-widest uppercase rounded-xl transition-all hover:scale-101"
            >
               BOOK TOUR RATES
            </button>
          </div>
        </FadeUpReveal>

      </div>
    </div>
  );
}
