import { motion } from 'motion/react';
import { Camera, Film, Award, Heart, ShieldAlert, Sparkles, Compass } from 'lucide-react';
import { ThemeConfig } from '../types';

interface AboutPageProps {
  config: ThemeConfig;
  onNavigate: (page: string) => void;
}

export default function AboutPage({ config, onNavigate }: AboutPageProps) {
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
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            01 // DETAILED STORY & PHILOSOPHY
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        {/* Big split column: Portrait Left, Philosophy Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28">
          
          {/* Portrait Sidebar (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-200/10 shadow-2xl">
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
                className="absolute inset-0 bg-amber-500 z-10 pointer-events-none"
              />
            </div>

            <div className="mt-8 space-y-4">
              <span className="text-[0.62rem] font-mono tracking-[0.3em] text-amber-500 uppercase block">
                MAIN CREATIVE KIT
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 border rounded-xl border-zinc-200 dark:border-zinc-700">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Leica SL2 Duo</span>
                  <span className="text-[0.65rem] text-zinc-700 dark:text-zinc-300 font-mono font-medium">50mm f/1.4 &middot; 35mm f/2.0</span>
                </div>
                <div className="p-4 border rounded-xl border-zinc-200 dark:border-zinc-700">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Pentax 67 Film</span>
                  <span className="text-[0.65rem] text-zinc-700 dark:text-zinc-300 font-mono font-medium">105mm f/2.4 &middot; Portra 400</span>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Narrative (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-amber-500 text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                 ARTIST MINDSET
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                Candid frames, <span className="italic font-serif text-amber-500">masterly</span> art directed.
              </h1>
              <div className="w-16 h-[1.5px] bg-amber-400/80 my-4" />
            </div>

            <div className="prose text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal space-y-6">
              <p>
                 Hello there, I'm <span className="font-semibold text-amber-500">{config.studioName}</span>. Most couples who step before my lens start by telling me: 
                <span className="italic"> "We have never done this, we feel so clumsy in front of cameras."</span> My complete mission is to erase that fear entirely.
              </p>
              <p>
                My working philosophy doesn't rely on static, robot-like poses or forced smiles. Instead, we establish real conversations, gentle walks, and tailored interactions. We allow the authentic gravity of your kinship to surface.
              </p>
              <p>
                Whether blending digital medium format cameras for absolute sharpness or classic Kodak Super 8 reels to capture nostalgic, flickering motion, we preserve your legacy with absolute devotion. No distractions, just beauty.
              </p>
            </div>

            {/* Philosophy items cards list */}
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-[0.65rem] font-mono tracking-widest text-amber-500 uppercase block mb-4">
                CORE PHILOSOPHY METRICS
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {corePhilosophy.map((phil, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="text-amber-500 text-xs font-bold font-sans block">
                      0{idx + 1} &middot; {phil.title}
                    </span>
                    <p className="text-[0.68rem] text-zinc-750 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                      {phil.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Timeline representation */}
        <div className="mb-28">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-20">
            <span className="text-amber-500 text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
               STUDIO MILESTONES
            </span>
            <h2 className={`text-3xl font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
               Our Creative Evolution
            </h2>
            <p className="text-xs text-zinc-650 dark:text-zinc-300 font-semibold">
               A decade-long historical trace of our photography philosophy, commissions, and technological maturity since inception.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {years.map((y, index) => (
              <div
                key={index}
                className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-800 bg-linear-to-b from-white/20 to-transparent hover:border-amber-500/15 duration-300 transition-all space-y-4"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-4xl font-light text-amber-500 font-sans">{y.year}</span>
                  <span className="text-[0.55rem] font-mono text-zinc-700 dark:text-zinc-200 uppercase tracking-widest bg-zinc-200/80 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full font-semibold">
                    {y.tag}
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase font-mono tracking-wider">
                    {y.title}
                  </h4>
                  <p className="text-[0.68rem] text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {y.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Travel Map section or prompt */}
        <div className={`p-8 md:p-12 border rounded-3xl text-center bg-zinc-900 border-zinc-800 text-white relative overflow-hidden flex flex-col items-center justify-center space-y-6`}>
          {/* Subtle decoration map graphics layout */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#f59e0b10,transparent_75%)] pointer-events-none" />
          <Compass className="w-8 h-8 text-amber-500 animate-spin-slow" />
          
          <div className="space-y-2 max-w-lg relative z-5">
            <span className="text-[0.62rem] font-mono text-amber-500 tracking-[0.3em] uppercase block">
              WORLDWIDE WEDDINGS COMMISSIONED
            </span>
            <h3 className="text-2xl font-light font-serif tracking-tight text-white">
              Currently Booking international dates for 2026 / 2027
            </h3>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium mt-2">
              From historic French villas, raw coastlines of Big Sur California, to luxury Tuscan elopements, we travel for your kinematics. Let\'s coordinate your bespoke travel package.
            </p>
          </div>

          <button
            id="about-travel-cta"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 cursor-pointer bg-amber-500 hover:bg-amber-600 text-zinc-950 font-sans font-semibold text-xs tracking-widest uppercase rounded-xl transition-all hover:scale-101"
          >
             BOOK TOUR RATES
          </button>
        </div>

      </div>
    </div>
  );
}
