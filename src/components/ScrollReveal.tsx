import { useRef, ReactNode, Key } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

/**
 * 1. Silk Smooth Fade Up Reveal
 * Animates opacity and vertical translation with luxury custom cubic-bezier.
 */
export function FadeUpReveal({
  children,
  delay = 0,
  duration = 1.2,
  yOffset = 40,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxury custom ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 2. Elegantly staggered container
 * Staggers children reveal animations for cards/grids
 */
export function StaggerContainer({
  children,
  className = '',
  staggerChildren = 0.15,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  key?: Key;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  yOffset = 30,
}: {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  key?: Key;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 3. Text Line Reveal
 * Creates an elegant editorial look where text lines rise from an invisible clipping mask.
 */
export function TextLineReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden py-1">
      <motion.span
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`block ${className}`}
      >
        {text}
      </motion.span>
    </div>
  );
}

/**
 * 4. Image Clip Reveal
 * Mimics high-fashion magazine page reveals with a sweeping clip-path or scale reveal.
 */
export function ImageClipReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio = 'aspect-[3/4]',
  referrerPolicy = 'no-referrer',
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
  referrerPolicy?: 'no-referrer' | 'origin';
}) {
  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Clip Reveal sliding panel */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute inset-0 bg-[#C5A880] z-10 pointer-events-none"
      />
      {/* Zoomed out image sliding in slightly on enter */}
      <motion.img
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        src={src}
        alt={alt}
        referrerPolicy={referrerPolicy}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/**
 * 5. Premium Parallax Scroll Container
 * Creates layered, physical feel of elements moving at slightly offset speeds.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  yOffsetRange = [-60, 60],
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  yOffsetRange?: [number, number];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], yOffsetRange);
  const smoothY = useSpring(yTransform, { stiffness: 60, damping: 22, mass: 0.4 });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.img
        style={{ y: smoothY }}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={`absolute -inset-y-16 left-0 right-0 w-full h-[calc(100%+8rem)] object-cover ${imgClassName}`}
      />
    </div>
  );
}

/**
 * 6. Luxury Scroll Scale Container
 * Elegant scale-down/zoom-out scroll-driven transformation for immersive cards, videos, or banners.
 */
export function ScrollScaleContainer({
  children,
  className = '',
  scaleRange = [1.18, 1],
  opacityRange = [0.8, 1],
}: {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);
  const smoothScale = useSpring(scale, { stiffness: 70, damping: 25, mass: 0.3 });
  const smoothOpacity = useSpring(opacity, { stiffness: 70, damping: 25, mass: 0.3 });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ scale: smoothScale, opacity: smoothOpacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * 7. High-End Scroll Reading Progress Bar
 */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A880] via-[#E6D4BE] to-[#C5A880] origin-left z-[100] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
