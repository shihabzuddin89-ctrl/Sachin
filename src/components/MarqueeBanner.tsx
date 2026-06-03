import { motion } from 'motion/react';
import { ThemeConfig } from '../types';

interface MarqueeBannerProps {
  config: ThemeConfig;
}

export default function MarqueeBanner({ config }: MarqueeBannerProps) {
  const words = [
    'TORONTO WEDDING PHOTOGRAPHER',
    '·',
    'EDITORIAL KINSHIP',
    '·',
    'CINEMATIC FILMAKING',
    '·',
    'LUXURY STORYTELLING',
    '·',
    'DESTINATION ARCHIVES',
    '·',
    config.studioName.toUpperCase(),
    '·',
  ];

  // Repeat items to fill infinite horizontal scroll track
  const marqueeItems = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full overflow-hidden bg-zinc-900 text-amber-200/85 py-6 border-y border-amber-300/10 select-none select-none font-mono text-[0.62rem] sm:text-[0.7rem] tracking-[0.4em]">
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <motion.div
          className="flex gap-8 items-center shrink-0 pr-8"
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {marqueeItems.map((item, idx) => (
            <span
              key={`mar-1-${idx}`}
              className={
                item === '·'
                  ? 'text-amber-500 font-bold'
                  : item === config.studioName.toUpperCase()
                  ? 'font-serif text-[0.85rem] italic text-white tracking-widest'
                  : ''
              }
            >
              {item}
            </span>
          ))}
        </motion.div>
        
        <motion.div
          className="flex gap-8 items-center shrink-0 pr-8"
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
          aria-hidden={true}
        >
          {marqueeItems.map((item, idx) => (
            <span
              key={`mar-2-${idx}`}
              className={
                item === '·'
                  ? 'text-amber-500 font-bold'
                  : item === config.studioName.toUpperCase()
                  ? 'font-serif text-[0.85rem] italic text-white tracking-widest'
                  : ''
              }
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
