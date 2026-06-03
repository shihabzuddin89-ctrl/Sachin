import { motion } from 'motion/react';
import { Camera, Film, Heart, Smile } from 'lucide-react';
import { ThemeConfig } from '../types';

interface AboutSectionProps {
  config: ThemeConfig;
}

export default function AboutSection({ config }: AboutSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="about"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 overflow-hidden ${
        config.themeMode === 'cream'
          ? 'bg-[#FAF6F0] text-zinc-900'
          : isDarkMode
          ? 'bg-zinc-950 text-white border-y border-zinc-900'
          : 'bg-white text-zinc-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            01 // PROFILE REVELATION
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Photographer's Portrait side (asymmetric) with original look-and-feel & added elegant slider curtain animation */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden group shadow-2xl bg-zinc-900 border border-zinc-200/10"
            >
              {/* Premium Photographer portrait */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200"
                alt="Sourav Sachin Photographer Portrait"
                className="w-full h-full object-cover object-center grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Cinematic block slide curtain reveal */}
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-amber-400 z-20 pointer-events-none"
              />

              {/* Background accent block */}
              <div className="absolute inset-0 bg-amber-500/15 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-750" />
            </motion.div>

            {/* floating badges / stickers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`absolute -bottom-6 -right-4 lg:right-6 bg-white p-5 border border-zinc-100 shadow-lg text-zinc-900 max-w-[200px] hidden sm:block ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : ''
              }`}
            >
              <h4 className="text-[0.6rem] tracking-[0.3em] text-amber-500 uppercase font-semibold font-sans">
                BASED IN TORONTO
              </h4>
              <p className="text-[0.72rem] font-serif font-light mt-1 text-zinc-600 dark:text-zinc-300">
                Crafting luxurious visuals near & far. Serving Ontario & Worldwide.
              </p>
            </motion.div>
          </div>

          {/* Narrative description side */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-6"
            >
              {/* Label */}
              <motion.span
                variants={itemVariants}
                className="text-amber-500 text-[0.62rem] md:text-[0.7rem] tracking-[0.45em] uppercase font-sans font-semibold block"
              >
                THE ARCHIVIST + STORYTELLER
              </motion.span>

              {/* Serif Title Name */}
              <motion.h2
                variants={itemVariants}
                className="text-[2.2rem] sm:text-[3.2rem] font-light font-serif tracking-tight leading-[1.1] text-zinc-900 dark:text-zinc-50"
              >
                Meet{' '}
                <span className="font-serif italic text-amber-600 font-medium">
                  {config.studioName}
                </span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="w-16 h-[1.5px] bg-amber-400/80 mr-auto"
              />

              {/* Emotional comfort block quote */}
              <motion.div
                variants={itemVariants}
                className={`py-4 pl-6 border-l-2 border-amber-400 my-8`}
              >
                <p className="text-[1.1rem] md:text-[1.3rem] font-serif italic text-amber-700/90 dark:text-amber-300">
                  {config.aboutQuote}
                </p>
              </motion.div>

              {/* Story text paragraphs */}
              <motion.p
                variants={itemVariants}
                className={`text-[0.92rem] font-sans font-light leading-relaxed text-zinc-600 dark:text-zinc-300`}
              >
                {config.aboutText1}
              </motion.p>

              <motion.p
                variants={itemVariants}
                className={`text-[0.92rem] font-sans font-light leading-relaxed text-zinc-600 dark:text-zinc-300`}
              >
                {config.aboutText2}
              </motion.p>

              {/* Highlight metrics */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800"
              >
                <div>
                  <span className="block text-[1.8rem] font-serif font-light text-zinc-900 dark:text-white">
                    12+
                  </span>
                  <span className="block text-[0.55rem] tracking-[0.25em] text-zinc-400 font-sans uppercase">
                    YEARS OF STORIES
                  </span>
                </div>
                <div>
                  <span className="block text-[1.8rem] font-serif font-light text-zinc-900 dark:text-white">
                    350+
                  </span>
                  <span className="block text-[0.55rem] tracking-[0.25em] text-zinc-400 font-sans uppercase">
                    WEDDINGS CAPTURED
                  </span>
                </div>
                <div>
                  <span className="block text-[1.8rem] font-serif font-light text-zinc-900 dark:text-white">
                    14+
                  </span>
                  <span className="block text-[0.55rem] tracking-[0.25em] text-zinc-400 font-sans uppercase">
                    GLOBAL DESTINATIONS
                  </span>
                </div>
              </motion.div>

              {/* Signature Graphic Mockup */}
              <motion.div variants={itemVariants} className="pt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  <span className="text-zinc-300 dark:text-zinc-800 font-mono text-[2.5rem] tracking-tight pointer-events-none select-none italic font-black -mt-6">
                    Sourav Sachin
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[0.62rem] tracking-[0.2em] font-sans font-medium uppercase text-zinc-400">
                    Currently in Toronto, ON
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
