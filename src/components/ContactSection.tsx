import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Heart, Calendar, MapPin, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ContactSectionProps {
  config: ThemeConfig;
}

export default function ContactSection({ config }: ContactSectionProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('full'); // full = Photo & Film, photo = Photo Only, film = Film Only
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

  const isDarkMode = config.themeMode === 'dark';

  return (
    <section
      id="inquire"
      className={`py-24 md:py-32 px-6 md:px-12 transition-colors duration-500 relative overflow-hidden ${
        config.themeMode === 'cream'
          ? 'bg-[#FAF6F0] text-zinc-900'
          : isDarkMode
          ? 'bg-zinc-950 text-white border-b border-zinc-900'
          : 'bg-white text-zinc-900 border-b border-zinc-100'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            06 // INQUIRE & RESERVE
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Information & Taglines column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <span className="text-amber-500 text-[0.62rem] md:text-[0.7rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                LET'S CREATE MAGIC
              </span>
              <h2 className="text-[2.2rem] sm:text-[3.2rem] font-light font-serif tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
                Inquire{' '}
                <span className="font-serif italic text-amber-600 font-medium">
                  With Us
                </span>
              </h2>
              <div className="w-16 h-[1.5px] bg-amber-400/80 mr-auto" />
              
              <p className="text-[0.92rem] font-sans font-light leading-relaxed text-zinc-500 dark:text-zinc-400">
                Let us lock down these fleeting glances for you. We accept an extremely limited number of editorial weddings and bespoke commissions each year to guarantee every film gets our precise, hyper-detailed craftsmanship.
              </p>
            </div>

            {/* Practical Contact Points */}
            <div className="space-y-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-800">
              <div>
                <span className="text-[0.58rem] font-mono tracking-[0.3em] text-zinc-400 block uppercase mb-1">EMAIL DIREKLY</span>
                <a href="mailto:memories@pritoreza.ca" className="text-[1.1rem] font-serif hover:text-amber-600 transition-colors text-zinc-800 dark:text-zinc-200">
                  memories@pritoreza.ca
                </a>
              </div>
              
              <div>
                <span className="text-[0.58rem] font-mono tracking-[0.3em] text-zinc-400 block uppercase mb-1">LOCAL PRESENCE</span>
                <p className="text-[0.9rem] font-sans font-medium hover:text-amber-600 transition-colors text-zinc-700 dark:text-zinc-300">
                  Toronto Studio · Serve Downtown & Global
                </p>
              </div>

              <div>
                <span className="text-[0.58rem] font-mono tracking-[0.3em] text-zinc-400 block uppercase mb-1">OFFICE HOURS</span>
                <p className="text-[0.88rem] font-sans text-zinc-500 dark:text-zinc-400">
                  Monday — Friday: 10:00 AM to 6:00 PM EST
                </p>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase hidden lg:block">
              © {new Date().getFullYear()} {config.studioName.toUpperCase()} STUDIO
            </div>
          </div>

          {/* Majestic Interactive Form Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 sm:p-12 border border-zinc-100 dark:border-zinc-800/80 shadow-2xl rounded-xs">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* First + Last Name Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="first_name" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase">
                        First Name *
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800"
                        placeholder="John"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="last_name" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase">
                        Last Name
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Date and Location Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="event_date" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        Target Event Date
                      </label>
                      <input
                        id="event_date"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-700 dark:text-white dark:border-zinc-800"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="location" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        Venue / Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800"
                        placeholder="Casa Loma, Toronto"
                      />
                    </div>
                  </div>

                  {/* Services Needed dropdown selection */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase">
                      Commission Scope
                    </label>
                    <select
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-transparent py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800"
                    >
                      <option className="bg-white dark:bg-zinc-900" value="full">Coordinated Editorial Photo & Film package</option>
                      <option className="bg-white dark:bg-zinc-900" value="photo">Wedding Photography only</option>
                      <option className="bg-white dark:bg-zinc-900" value="film">Cinematography / Wedding Film only</option>
                      <option className="bg-white dark:bg-zinc-900" value="lifestyle">Editorial Portraiture & Commercial Lifestyle</option>
                    </select>
                  </div>

                  {/* Relationship Story description (encourages emotional storytelling) */}
                  <div className="space-y-1.5">
                    <label htmlFor="story" className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      Tell Us Your Vision, Story or Vibe
                    </label>
                    <textarea
                      id="story"
                      rows={3}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 border-b border-zinc-200 focus:border-amber-400 outline-hidden transition-colors font-sans text-[0.9rem] text-zinc-800 dark:text-white dark:border-zinc-800 font-light resize-none"
                      placeholder="Share elements of your story, design concept or general vision..."
                    />
                  </div>

                  {/* Submit commission form trigger */}
                  <button
                    id="submit-inquiry-button"
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full mt-2 py-4 bg-zinc-950 text-white hover:bg-amber-500 font-medium font-sans text-[0.7rem] tracking-[0.3em] uppercase rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        COMMISSING ALIGNMENTS...
                      </>
                    ) : (
                      <>
                        SEND INQUIRY SCRIPT
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="submit-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 animate-pulse">
                    <CheckCircle2 className="w-8 h-8 text-amber-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[1.5rem] font-serif font-light text-zinc-900 dark:text-zinc-50">
                      Vision Received with Warmth, {firstName}
                    </h3>
                    <p className="text-[0.85rem] font-sans font-light text-zinc-500 max-w-md mx-auto leading-relaxed">
                      Thank you for trusting us with your story! We have synced your event script, and we will return to your inbox within 24 business hours to coordinate an intimate alignment call.
                    </p>
                  </div>

                  <div className="bg-amber-500/5 p-4 rounded-md border border-amber-400/20 max-w-md">
                    <span className="flex items-center gap-1 text-[0.62rem] font-mono tracking-widest text-amber-600 uppercase justify-center font-bold">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      Exclusive Spark
                    </span>
                    <p className="text-[0.72rem] text-amber-800/90 font-sans mt-1">
                      Because you reached us close to sunset, your inquiries are flagged as Priority VIP Commissions. Keep an eyes out for our direct message!
                    </p>
                  </div>

                  <button
                    id="reset-form-button"
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setEmail('');
                      setEventDate('');
                      setLocation('');
                      setStory('');
                    }}
                    className="cursor-pointer text-xs font-mono tracking-widest text-zinc-400 hover:text-zinc-600 underline uppercase"
                  >
                    SUBMIT ANOTHER INQUIRY SCRIPT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
