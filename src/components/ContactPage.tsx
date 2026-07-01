import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, Send, CheckCircle2, Award, Heart, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  config: ThemeConfig;
}

export default function ContactPage({ config }: ContactPageProps) {
  const isDarkMode = config.themeMode === 'dark';

  const formBgClass = isDarkMode 
    ? 'bg-[#0E0F12] border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
    : 'bg-[#EBEAE6] border-zinc-300 text-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.08)]';
    
  const inputClass = `w-full text-xs font-sans tracking-wide p-3.5 border rounded-xl focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/50 transition-all duration-300 ${
    isDarkMode 
      ? 'border-white/10 bg-[#141519] text-white placeholder-zinc-500' 
      : 'border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400'
  }`;

  const selectClass = `w-full text-xs font-sans p-4 border rounded-xl focus:outline-hidden focus:border-[#C5A880] transition-all duration-300 cursor-pointer ${
    isDarkMode 
      ? 'border-white/10 bg-[#141519] text-white' 
      : 'border-zinc-300 bg-white text-zinc-900'
  }`;

  const textTitleClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const textSubClass = isDarkMode ? 'text-zinc-300' : 'text-zinc-700';
  const borderClass = isDarkMode ? 'border-white/10' : 'border-zinc-300';

  // Form states
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    budget: '$6,000 - $8,000',
    serviceType: 'photo-film',
    vibe: 'editorial',
    story: '',
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Mini Calendar scheduler state
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(25);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('02:00 PM EST');
  const [consultationBooked, setConsultationBooked] = useState<boolean>(false);

  const budgetOptions = [
    'Below $5,000',
    '$5,000 - $8,000',
    '$8,000 - $12,000',
    'Above $12,000',
  ];

  const calendarDays = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2];
  const timeSlots = ['10:00 AM EST', '11:30 AM EST', '02:00 PM EST', '04:00 PM EST', '05:30 PM EST'];

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setFormStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setFormStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitInquireForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleBookConsultation = () => {
    setConsultationBooked(true);
    setTimeout(() => {
      setConsultationBooked(false);
    }, 4500);
  };

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Booking Form Column (Left/8 columns) */}
          <div className="lg:col-span-8">
            <div className="space-y-4 mb-12">
              <span className="text-[#C5A880] text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                COMMISSION APPLICATION
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-tight ${textTitleClass} ${
                config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
              }`}>
                Tell me <span className="italic font-serif text-[#C5A880]">everything</span>.
              </h1>
              <p className={`text-xs uppercase tracking-widest max-w-xl leading-relaxed font-bold ${textSubClass}`}>
                By maintaining a highly strict commission cap of 20 celebrations annually, we commit entirely to styling your heritage story. Complete this application to get a personalized quote.
              </p>
            </div>

            <AnimatePresence mode="wait">
               {formSubmitted ? (
                /* Success screen */
                <motion.div
                  key="form-success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-10 border text-center space-y-6 rounded-3xl ${formBgClass}`}
                >
                  <span className="inline-flex p-4 bg-[#C5A880]/10 text-[#C5A880] rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </span>
                  <div className="space-y-2">
                    <h3 className={`text-2xl font-light font-serif ${textTitleClass}`}>Inquiry Registered</h3>
                    <p className={`text-xs max-w-md mx-auto leading-relaxed ${textSubClass}`}>
                      Thank you for trusting our studio. Clara, our lead administrative coordinator is already cataloging your venue plans. Expect a handcrafted wedding proposal in your inbox within 12 hours.
                    </p>
                  </div>
                  <div className={`w-full h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-zinc-300'} my-6`} />
                  <button
                    id="submit-reset-btn"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormStep(1);
                      setFormData({
                        name1: '',
                        name2: '',
                        email: '',
                        phone: '',
                        date: '',
                        location: '',
                        budget: '$6,000 - $8,000',
                        serviceType: 'photo-film',
                        vibe: 'editorial',
                        story: '',
                      });
                    }}
                    className="text-xs font-mono text-[#C5A880] hover:text-[#D4B48F] uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                /* Steps form element */
                <motion.form
                  key="inquire-steps"
                  onSubmit={handleSubmitInquireForm}
                  className={`p-8 md:p-10 border rounded-3xl space-y-8 ${formBgClass}`}
                >
                  {/* Step Indicators */}
                  <div className={`flex justify-between items-center text-[0.6rem] font-mono tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    <span className={formStep === 1 ? 'text-[#C5A880] font-bold' : ''}>1. CORE DATA</span>
                    <span className={`w-8 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-zinc-300'}`} />
                    <span className={formStep === 2 ? 'text-[#C5A880] font-bold' : ''}>2. ATMOSPHERE</span>
                    <span className={`w-8 h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-zinc-300'}`} />
                    <span className={formStep === 3 ? 'text-[#C5A880] font-bold' : ''}>3. YOUR TALE</span>
                  </div>

                  {/* Form step screens */}
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            name="name1"
                            value={formData.name1}
                            onChange={handleChangeInput}
                            placeholder="Clara Bennett"
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className={`text-[0.62rem] font-mono tracking-widest font-bold uppercase block ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            Partner's Name (Optional)
                          </label>
                          <input
                            type="text"
                            name="name2"
                            value={formData.name2}
                            onChange={handleChangeInput}
                            placeholder="Julian Mercer"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                            Email Inbox Address *
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChangeInput}
                            placeholder="clara@example.com"
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                            Mobile Contact Number *
                          </label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChangeInput}
                            placeholder="+1 (416) 555-1200"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                            Celebration Date *
                          </label>
                          <input
                            type="date"
                            required
                            name="date"
                            value={formData.date}
                            onChange={handleChangeInput}
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                            Venue / City Location *
                          </label>
                          <input
                            type="text"
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChangeInput}
                            placeholder="Casa Loma, Toronto OR Destination..."
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                          Desired Service Commission Category
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChangeInput}
                          className={selectClass}
                        >
                          <option value="photo-film" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>Intimate Cohesive Union (Photo + Film Coverage)</option>
                          <option value="photo-only" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>Fine Art Photography Only Archive</option>
                          <option value="film-only" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>Cinematic Wedding Filmmaking Only Archive</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                          Visual Atmosphere & Styling Preference
                        </label>
                        <select
                          name="vibe"
                          value={formData.vibe}
                          onChange={handleChangeInput}
                          className={selectClass}
                        >
                          <option value="editorial" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>Curated Fine-Art Editorial (Bespoke Posing, High Contrast)</option>
                          <option value="documentary" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>True candid documentary journal (Sincere, Pure, Raw Light)</option>
                          <option value="dynamic-mix" className={isDarkMode ? 'bg-[#141519] text-white' : 'bg-white text-zinc-900'}>A balanced custom mix (50/50 candid spontaneity and formal direction)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                          Anticipated Investment Budget Bracket
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          {budgetOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, budget: opt }))}
                              className={`p-4 rounded-xl text-xs font-sans border text-left transition-colors duration-300 ${
                                formData.budget === opt
                                  ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880] font-semibold'
                                  : isDarkMode
                                    ? 'border-white/10 bg-[#141519] text-zinc-300 hover:border-[#C5A880]/30'
                                    : 'border-zinc-300 bg-white text-zinc-700 hover:border-[#C5A880]/40'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                          Tell me your unique story, vibes & expectations *
                        </label>
                        <textarea
                          required
                          name="story"
                          rows={6}
                          value={formData.story}
                          onChange={handleChangeInput}
                          placeholder="How did you cross paths? What parts of your celebration are you most passionate about capturing? Let us feel your vision..."
                          className={inputClass + " resize-none leading-relaxed"}
                        />
                      </div>

                      <div className={`p-4 rounded-xl space-y-1.5 flex items-start gap-3 border ${
                        isDarkMode 
                          ? 'bg-[#C5A880]/5 border-[#C5A880]/10' 
                          : 'bg-[#C5A880]/10 border-[#C5A880]/20'
                      }`}>
                        <Award className="w-5 h-5 text-[#C5A880] mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <span className={`text-[0.65rem] font-mono block uppercase ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            AUTHENTIC ARCHIVES GUARANTEE
                          </span>
                          <span className={`text-[0.6rem] block leading-relaxed uppercase font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>
                            Your reservation respects strict, custom visual direction. We ensure secure delivery of metadata frames.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Operational Flow Buttons */}
                  <div className={`flex justify-between pt-6 border-t ${borderClass}`}>
                    <button
                      id="step-prev"
                      type="button"
                      onClick={handlePrevStep}
                      disabled={formStep === 1}
                      className={`px-5 py-2.5 text-[0.62rem] select-none tracking-widest uppercase rounded-lg border font-mono font-medium ${
                        formStep === 1
                          ? 'opacity-30 pointer-events-none'
                          : isDarkMode 
                            ? 'border-white/10 text-zinc-400 hover:text-[#C5A880]'
                            : 'border-zinc-300 text-zinc-600 hover:text-[#C5A880]'
                      }`}
                    >
                      &larr; BACK
                    </button>

                    {formStep < 3 ? (
                      <button
                        id="step-next"
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-[#C5A880] hover:bg-[#D4B48F] font-mono font-semibold text-[#060709]"
                      >
                        CONTINUE &rarr;
                      </button>
                    ) : (
                      <button
                        id="form-submit"
                        type="submit"
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-[#C5A880] hover:bg-[#D4B48F] text-[#060709] font-mono font-semibold flex items-center gap-2"
                      >
                         SUBMIT COMMISSION
                        <Send className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Studio Info / Office Coordinates (Right/4 columns) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4 pl-4 border-l border-[#C5A880]/20 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[#C5A880] text-[0.55rem] tracking-[0.35em] uppercase block">
                  OFFICE COORDINATES
                </span>
                <p className={`${textSubClass} font-sans tracking-wide`}>
                  Toronto Waterfront Studios, Queens Quay West, Suite 412, Toronto, Ontario
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[#C5A880] text-[0.55rem] tracking-[0.35em] uppercase block">
                  REPRESENTATIVE EMAIL
                </span>
                <p className={`${textSubClass} font-mono tracking-wider`}>
                  example@gmail.com
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
