import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Heart, Calendar, MapPin, Sparkles, X } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ContactSectionProps {
  config: ThemeConfig;
}

export default function ContactSection({ config }: ContactSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('full');
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !email) return;

    setIsSubmitting(true);
    
    // Simulate premium server-side sync action (1.5 seconds)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setEventDate('');
    setLocation('');
    setStory('');
  };

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section id="inquire" className="relative transition-colors duration-500">
      
      {/* 1. TOP PORTION: Toronto Wedding Photographer Serving Ontario & Worldwide */}
      <div 
        className={`py-24 md:py-32 px-6 md:px-12 text-center transition-colors duration-500 border-t ${
          config.themeMode === 'cream'
            ? 'bg-[#FAF6F0] text-zinc-900 border-zinc-200/50'
            : isDarkMode
            ? 'bg-zinc-950 text-white border-zinc-900'
            : 'bg-zinc-50/50 text-zinc-900 border-zinc-100'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4.5xl md:text-5.5xl lg:text-6.5xl font-extralight tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight uppercase font-serif">
            TORONTO WEDDING <br className="hidden sm:inline" />
            PHOTOGRAPHER SERVING <br />
            <span className="font-serif italic font-normal text-amber-500">ONTARIO & WORLDWIDE</span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xs sm:text-[0.88rem] leading-relaxed text-zinc-500 dark:text-zinc-400 font-sans tracking-wide">
            As a <strong className="font-semibold text-zinc-800 dark:text-zinc-300">Toronto wedding photographer</strong>, my work blends editorial direction with documentary storytelling. I photograph weddings across Toronto and throughout Ontario, including Oakville, Mississauga, Hamilton, Burlington, Caledon, Niagara, Barrie, Markham, Vaughan, and Muskoka, while also capturing destination weddings worldwide. My goal is to create timeless images that feel natural, emotional, and beautifully composed.
          </p>
        </div>
      </div>

      {/* 2. BOTTOM PORTION: Immersive Romantic Backdrop Banner with "Something Magical" */}
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9] min-h-[480px] md:min-h-[580px] overflow-hidden bg-zinc-950 flex flex-col justify-center items-center px-6 text-center">
        
        {/* Silhouette Wedding Couple Photo Layer */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1544078751-58fed2b84d57?q=80&w=1600"
            alt="Wedding silhouette"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.45] transition-all duration-[1500ms]"
            referrerPolicy="no-referrer"
          />
          
          {/* Crimson Red Backdrop wash spotlights & deep vignetting as requested by the image */}
          <div className="absolute inset-0 bg-[#3f060a]/25 mix-blend-color-burn pointer-events-none" />
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-red-800/25 via-zinc-950/75 to-zinc-950 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-950/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-5xl space-y-6">
          <span className="block font-serif italic text-amber-400 text-lg sm:text-2xl tracking-wide font-light select-none">
            Let's Make
          </span>
          
          <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight font-serif tracking-[0.2em] sm:tracking-[0.25em] text-white leading-none uppercase select-none">
            SOMETHING MAGICAL
          </h3>

          <p className="max-w-md mx-auto text-xs sm:text-sm text-zinc-400 font-sans tracking-wide pt-4">
            Have a story to tell? I'd love to hear it. Let's begin with a simple note.
          </p>

          <div className="pt-6">
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer px-10 py-4 border border-zinc-500/80 hover:border-amber-400 bg-white/5 backdrop-blur-xs text-white hover:text-black hover:bg-amber-400 text-xs sm:text-[0.7rem] font-mono tracking-[0.25em] uppercase rounded-full shadow-2xl transition-all duration-500"
            >
              INQUIRE NOW
            </button>
          </div>
        </div>
      </div>

      {/* 3. POPUP MODAL: Interactive Editorial Booking Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-zinc-950 text-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800/80 p-8 sm:p-12 relative shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-amber-400 hover:text-black text-zinc-400 transition-all duration-300 cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="inquiry-form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <span className="text-amber-500 text-[0.62rem] tracking-[0.35em] uppercase font-mono font-bold block">
                        LET'S BEGIN WITH A SIMPLE NOTE
                      </span>
                      <h4 className="text-3xl sm:text-4xl font-serif font-light text-white">
                        Tell me <span className="font-serif italic text-amber-500">everything</span>.
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                      {/* Name Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold">
                            first name *
                          </label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold">
                            last name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold">
                          email address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white"
                          placeholder="hello@example.com"
                        />
                      </div>

                      {/* Event details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-500" />
                            target event date
                          </label>
                          <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-mono text-sm text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            venue / location
                          </label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white"
                            placeholder="Oakville, Ontario"
                          />
                        </div>
                      </div>

                      {/* Service Scope Selection */}
                      <div className="space-y-1.5">
                        <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold">
                          commission scope
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-transparent py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white"
                        >
                          <option className="bg-zinc-950 text-white" value="full">Coordinated Editorial Photo & Film package</option>
                          <option className="bg-zinc-950 text-white" value="photo">Wedding Photography only</option>
                          <option className="bg-zinc-950 text-white" value="film">Cinematography / Wedding Film only</option>
                          <option className="bg-zinc-950 text-white" value="lifestyle">Editorial Portraiture & Lifestyle</option>
                        </select>
                      </div>

                      {/* Vision Story */}
                      <div className="space-y-1.5">
                        <label className="text-[0.6rem] font-mono tracking-widest text-zinc-400 lowercase font-semibold flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                          share your dream, concept or aesthetic vision
                        </label>
                        <textarea
                          rows={3}
                          value={story}
                          onChange={(e) => setStory(e.target.value)}
                          className="w-full bg-transparent px-2 py-2 border-b border-zinc-800 focus:border-amber-400 outline-none transition-colors font-sans text-sm text-white resize-none"
                          placeholder="Tell us a bit about your story and plans..."
                        />
                      </div>

                      {/* Submit Trigger */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full mt-4 py-4 bg-amber-500 text-black hover:bg-amber-400 font-semibold font-mono text-[0.7rem] tracking-[0.3em] uppercase rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                            COMMISSIONING ALIGNMENTS...
                          </>
                        ) : (
                          <>
                            SEND INQUIRY
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="modal-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 pt-4 pb-2"
                  >
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 animate-pulse">
                      <CheckCircle2 className="w-8 h-8 text-amber-500" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-light text-white leading-snug">
                        Vision Received with Warmth, <br />
                        <span className="italic text-amber-500">{firstName}</span>
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                        Thank you for trusting us with your heritage story. Clara, our lead coordinator, is reading your visions and checking local dates. Expect a beautiful response within 12 hours.
                      </p>
                    </div>

                    <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10 max-w-md">
                      <span className="flex items-center gap-1 text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase justify-center font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Priority Flag Added
                      </span>
                      <p className="text-[0.72rem] text-zinc-300 font-sans mt-2">
                        Your inquiry has been successfully prioritised. Talk to you very soon!
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <button
                        onClick={handleReset}
                        className="text-[10px] font-mono tracking-wider text-amber-500 hover:underline uppercase cursor-pointer"
                      >
                        Submit another note
                      </button>
                      <span className="text-zinc-700 hidden sm:inline">•</span>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] font-mono tracking-wider text-zinc-400 hover:text-white uppercase cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
