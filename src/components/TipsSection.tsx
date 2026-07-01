import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { TipItem, ThemeConfig } from '../types';
import { FadeUpReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface TipsSectionProps {
  config: ThemeConfig;
  tips: TipItem[];
}

export default function TipsSection({ config, tips }: TipsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(tips[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="tips"
      className="py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 bg-[#060709] text-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            04 // BRIDAL WISDOM
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        {/* Title and Header Description */}
        <FadeUpReveal>
          <div className="text-center space-y-4 mb-16">
            <span className="text-amber-500 text-[0.62rem] md:text-[0.7rem] tracking-[0.45em] uppercase font-sans font-semibold block">
              BRIDAL WISDOM & DIALOGUE
            </span>
            <h2 className="text-[2rem] sm:text-[3rem] font-light font-serif tracking-tight text-white leading-tight">
              Advice for a{' '}
              <span className="font-serif italic text-[#C5A880] font-medium">
                Perfect Wedding
              </span>
            </h2>
            <div className="w-12 h-[1px] bg-white/15 mx-auto" />
            <p className="text-[0.85rem] uppercase tracking-widest text-zinc-200 font-semibold">
              Priceless guidelines directly from our decade in the field.
            </p>
          </div>
        </FadeUpReveal>

        {/* Dynamic Accordion list */}
        <StaggerContainer className="space-y-4">
          {tips.map((tip, index) => {
            const isExpanded = expandedId === tip.id;
            return (
              <StaggerItem key={tip.id}>
                <div
                  id={`tip-accordion-item-${tip.id}`}
                  className={`border rounded-lg transition-all duration-300 ${
                    isExpanded
                      ? 'border-[#C5A880]/55 bg-white/5 shadow-md'
                      : 'border-white/10 hover:border-[#C5A880]/30'
                  }`}
                >
                  {/* Header Toggle */}
                  <button
                    id={`tip-toggle-button-${tip.id}`}
                    onClick={() => toggleExpand(tip.id)}
                    className="cursor-pointer w-full text-left py-6 px-6 sm:px-8 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <span className="text-[0.58rem] font-mono tracking-[0.3em] text-amber-500 uppercase font-semibold">
                        {tip.category}
                      </span>
                      <h3 className="text-[1.1rem] sm:text-[1.25rem] font-serif font-light tracking-wide text-white">
                        {tip.title}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-500 transition-transform duration-300 ${
                      isExpanded ? 'bg-amber-100 text-amber-700 border-amber-200 rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Animated content expansion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`tip-content-${tip.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-8 text-[0.88rem] leading-relaxed text-zinc-200 space-y-4 font-sans font-normal border-t border-white/10 pt-6">
                          <p>{tip.content}</p>
                          
                          <div className="flex items-center gap-3 bg-amber-500/5 dark:bg-amber-400/5 p-4 rounded-md border border-amber-300/10">
                            <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <span className="text-[0.72rem] text-amber-200 tracking-wide font-sans">
                              Interested in talking more about this guideline during your alignment session? Mention this in your inquiry script!
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
