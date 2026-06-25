import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Film, Heart, Smile, Play, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { ThemeConfig } from '../types';

interface AboutSectionProps {
  config: ThemeConfig;
  onNavigate?: (pageId: string) => void;
}

export default function AboutSection({ config, onNavigate }: AboutSectionProps) {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [theaterMuted, setTheaterMuted] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const theaterVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    if (bgVideo) {
      bgVideo.muted = true;
      bgVideo.playsInline = true;
      bgVideo.loop = true;
      const bgPlayPromise = bgVideo.play();
      if (bgPlayPromise !== undefined) {
        bgPlayPromise.catch((err) => {
          console.warn("Autoplay for background video block averted programmatically:", err);
        });
      }
    }

    const video = theaterVideoRef.current;
    if (video && isTheaterMode) {
      video.muted = theaterMuted;
      video.playsInline = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay block averted programmatically:", err);
        });
      }
    }
  }, [isTheaterMode, theaterMuted]);

  const handleTogglePlay = () => {
    if (theaterVideoRef.current) {
      if (videoPlaying) {
        theaterVideoRef.current.pause();
      } else {
        theaterVideoRef.current.play().catch(() => {});
      }
      setVideoPlaying(!videoPlaying);
    }
  };

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
      className="pt-24 pb-0 md:pt-32 md:pb-0 px-6 md:px-12 transition-colors duration-500 overflow-hidden bg-[#060709] text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Explore Navigation with 4 options */}
        <div id="home-explore-navigation" className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-[0.4em] uppercase font-serif mb-16 text-white">
              EXPLORE
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
              {[
                { 
                  label: 'Wedding', 
                  id: 'portfolio', 
                  desc: 'Our Full Gallery',
                  image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800'
                },
                { 
                  label: 'Films', 
                  id: 'films', 
                  desc: 'Cinematic Cinema',
                  video: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7ef06b72d242efbe1697669d0d9f48f4305bc768&profile_id=165&oauth2_token_id=57447761',
                  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800'
                },
                { 
                  label: 'About', 
                  id: 'about', 
                  desc: 'Story & Ethos',
                  image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800'
                },
                { 
                  label: 'Services', 
                  id: 'services', 
                  desc: 'Offering & Rates',
                  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800'
                },
              ].map((opt) => (
                <button
                  id={`explore-btn-${opt.id}`}
                  key={opt.id}
                  onClick={() => onNavigate && onNavigate(opt.id)}
                  className="group relative py-10 px-8 text-left overflow-hidden transition-all duration-700 rounded-2xl md:rounded-3xl flex flex-col justify-end h-64 sm:h-80 md:h-[420px] cursor-pointer border border-zinc-200/10 shadow-2xl"
                >
                  {/* Media background overlay layer */}
                  {opt.video ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                      <video
                        src={opt.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={opt.image}
                        className="absolute inset-0 w-full h-full object-cover scale-[1.05] group-hover:scale-110 transition-transform duration-[1200ms] ease-out opacity-85"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
                      <img
                        src={opt.image}
                        alt={opt.label}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover scale-[1.05] group-hover:scale-110 transition-transform duration-[1200ms] ease-out opacity-85"
                      />
                    </div>
                  )}

                  {/* Dark premium vignette/tint overlay */}
                  <div className="absolute inset-0 bg-zinc-950/50 group-hover:bg-zinc-950/35 transition-colors duration-500 z-10" />

                  {/* Subtle lower gold accent slide up */}
                  <div className="absolute inset-x-0 bottom-0 h-[4px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  <div className="z-20">
                    <h3 className="text-xl md:text-2xl font-light tracking-widest font-serif text-white group-hover:text-amber-300 transition-colors duration-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {opt.label}
                    </h3>
                    <p className="text-[0.75rem] md:text-[0.82rem] text-zinc-100 mt-2 font-sans font-light tracking-wide drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cinematic Running Video Showcase Block (Full Viewport Width Bleed) */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden bg-zinc-950 h-[50vh] sm:h-[65vh] md:h-[80vh] lg:h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Autoplaying Loop Video */}
          <video
            ref={bgVideoRef}
            src="https://player.vimeo.com/external/435674703.sd.mp4?s=7ef06b72d242efbe1697669d0d9f48f4305bc768&profile_id=165&oauth2_token_id=57447761"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        </div>
      </div>

      {/* Cinematic Immersive Theater Overlay Modal - Full Screen */}
      <AnimatePresence>
        {isTheaterMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-6 md:p-12 select-none"
          >
            {/* Ambient Background blur overlay */}
            <div className="absolute inset-0 bg-radial-to-t from-zinc-950 via-zinc-950/80 to-zinc-900 pointer-events-none" />

            {/* Immersive Cinematic Video player - covers full area */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <video
                ref={theaterVideoRef}
                src="https://player.vimeo.com/external/435674703.sd.mp4?s=7ef06b72d242efbe1697669d0d9f48f4305bc768&profile_id=165&oauth2_token_id=57447761"
                autoPlay
                loop
                muted={theaterMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45 md:bg-black/30 transition-all duration-300 pointer-events-none" />
            </div>

            {/* Header portion of Fullscreen Theater */}
            <div className="relative z-10 flex items-center justify-between pointer-events-auto">
              <div className="flex flex-col">
                <span className="text-[0.62rem] md:text-[0.7rem] font-mono tracking-[0.45em] text-amber-400 font-bold uppercase drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                  // CINEMATIC REEL
                </span>
                <span className="text-xl md:text-2xl font-light font-serif tracking-widest text-white mt-1 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {config.studioName} SHOWCASE
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsTheaterMode(false)}
                className="p-3 rounded-full bg-white/15 hover:bg-amber-500 hover:text-black hover:scale-105 border border-white/20 transition-all duration-300 cursor-pointer text-white shadow-xl"
                title="Close Theater"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Center Play/Pause HUD overlay trigger on click */}
            <div 
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer pointer-events-auto"
              onClick={handleTogglePlay}
            >
              {!videoPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </motion.div>
              )}
            </div>

            {/* Footer Control Bar & Audio Toggle */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 pointer-events-auto bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 max-w-4xl mx-auto w-full shadow-2xl">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-2 text-[0.68rem] tracking-widest uppercase font-mono border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 rounded-md transition-all duration-300"
                >
                  {videoPlaying ? 'PAUSE FILM' : 'PLAY FILM'}
                </button>

                {/* Direct Instruction tooltip */}
                <span className="text-[0.62rem] md:text-[0.68rem] text-zinc-300 font-sans tracking-wide">
                  Double click to exit cinema, or toggle sound configuration
                </span>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                {/* Mute toggle option */}
                <button
                  onClick={() => setTheaterMuted(!theaterMuted)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 text-white pointer-events-auto cursor-pointer"
                >
                  {theaterMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-amber-400" />
                      <span className="text-[0.62rem] font-mono tracking-wider uppercase">Unmute Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[0.62rem] font-mono tracking-wider uppercase">Audio Active</span>
                    </>
                  )}
                </button>

                {/* Indicator info for developers */}
                <div className="hidden sm:block text-right">
                  <p className="text-[0.55rem] font-mono text-zinc-400 tracking-widest uppercase">
                    SHOWCASE ACTIVE
                  </p>
                  <p className="text-[0.68rem] font-sans text-zinc-300 tracking-wider">
                    Ready for your custom link
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
