import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeConfig } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, Send, CheckCircle2, Award, Heart, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  config: ThemeConfig;
}

export default function ContactPage({ config }: ContactPageProps) {
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
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20 padding-top">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            06 // INQUIRE & RESERVE COMMISSION
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Booking Form Column (Left/7 columns) */}
          <div className="lg:col-span-7">
            <div className="space-y-4 mb-12">
              <span className="text-amber-500 text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                COMMISSION APPLICATION
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-tight ${
                config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
              }`}>
                Tell me <span className="italic font-serif text-amber-500">everything</span>.
              </h1>
              <p className="text-xs text-zinc-950 dark:text-zinc-50 uppercase tracking-widest max-w-xl leading-relaxed font-bold">
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
                  className={`p-10 border text-center space-y-6 rounded-3xl ${
                    config.themeMode === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'
                  }`}
                >
                  <span className="inline-flex p-4 bg-amber-500/10 text-amber-500 rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light font-serif">Inquiry Registered</h3>
                    <p className="text-xs text-zinc-950 dark:text-zinc-50 max-w-md mx-auto leading-relaxed font-bold">
                      Thank you for trusting our studio. Clara, our lead administrative coordinator is already cataloging your venue plans. Expect a handcrafted wedding proposal in your inbox within 12 hours.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 my-6" />
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
                    className="text-xs font-mono text-amber-500 uppercase tracking-widest hover:underline"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                /* Steps form element */
                <motion.form
                  key="inquire-steps"
                  onSubmit={handleSubmitInquireForm}
                  className={`p-8 md:p-10 border rounded-3xl space-y-8 ${
                    config.themeMode === 'dark' ? 'bg-zinc-900/40 border-zinc-900' : 'bg-white border-zinc-200 shadow-md'
                  }`}
                >
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center text-[0.6rem] font-mono tracking-widest text-zinc-950 dark:text-zinc-50 font-bold">
                    <span className={formStep === 1 ? 'text-amber-500 font-bold' : ''}>1. CORE DATA</span>
                    <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    <span className={formStep === 2 ? 'text-amber-500 font-bold' : ''}>2. ATMOSPHERE</span>
                    <span className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    <span className={formStep === 3 ? 'text-amber-500 font-bold' : ''}>3. YOUR TALE</span>
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
                          <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            name="name1"
                            value={formData.name1}
                            onChange={handleChangeInput}
                            placeholder="Clara Bennett"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-zinc-950 dark:text-zinc-50 font-bold uppercase block">
                            Partner\'s Name (Optional)
                          </label>
                          <input
                            type="text"
                            name="name2"
                            value={formData.name2}
                            onChange={handleChangeInput}
                            placeholder="Julian Mercer"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                            Email Inbox Address *
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChangeInput}
                            placeholder="clara@example.com"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                            Mobile Contact Number *
                          </label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChangeInput}
                            placeholder="+1 (416) 555-1200"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                            Celebration Date *
                          </label>
                          <input
                            type="date"
                            required
                            name="date"
                            value={formData.date}
                            onChange={handleChangeInput}
                            className="w-full text-xs font-sans p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                            Venue / City Location *
                          </label>
                          <input
                            type="text"
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChangeInput}
                            placeholder="Casa Loma, Toronto OR Destination..."
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
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
                        <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                          Desired Service Commission Category
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChangeInput}
                          className="w-full text-xs font-sans p-4 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                        >
                          <option value="photo-film" className="text-zinc-950">Intimate Cohesive Union (Photo + Film Coverage)</option>
                          <option value="photo-only" className="text-zinc-950">Fine Art Photography Only Archive</option>
                          <option value="film-only" className="text-zinc-950">Cinematic Wedding Filmmaking Only Archive</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                          Visual Atmosphere & Styling Preference
                        </label>
                        <select
                          name="vibe"
                          value={formData.vibe}
                          onChange={handleChangeInput}
                          className="w-full text-xs font-sans p-4 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50"
                        >
                          <option value="editorial" className="text-zinc-950">Curated Fine-Art Editorial (Bespoke Posing, High Contrast)</option>
                          <option value="documentary" className="text-zinc-950">True candid documentary journal (Sincere, Pure, Raw Light)</option>
                          <option value="dynamic-mix" className="text-zinc-950">A balanced custom mix (50/50 candid spontaneity and formal direction)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
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
                                  ? 'border-amber-500 bg-amber-500/5 text-amber-500'
                                  : 'border-zinc-200 hover:border-amber-500/25'
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
                        <label className="text-[0.62rem] font-mono tracking-widest text-amber-500 uppercase block">
                          Tell me your unique story, vibes & expectations *
                        </label>
                        <textarea
                          required
                          name="story"
                          rows={6}
                          value={formData.story}
                          onChange={handleChangeInput}
                          placeholder="How did you cross paths? What parts of your celebration are you most passionate about capturing? Let us feel your vision..."
                          className="w-full text-xs font-sans p-4 border border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl focus:outline-hidden focus:border-amber-500/50 resize-none leading-relaxed"
                        />
                      </div>

                      <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1.5 flex items-start gap-3">
                        <Award className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[0.65rem] font-mono text-zinc-400 block uppercase">
                            AUTHENTIC ARCHIVES GUARANTEE
                          </span>
                          <span className="text-[0.6rem] text-zinc-950 dark:text-zinc-50 block leading-relaxed uppercase font-semibold">
                            Your reservation respects strict, custom visual direction. We ensure secure delivery of metadata frames.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Operational Flow Buttons */}
                  <div className="flex justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      id="step-prev"
                      type="button"
                      onClick={handlePrevStep}
                      disabled={formStep === 1}
                      className={`px-5 py-2.5 text-[0.62rem] select-none tracking-widest uppercase rounded-lg border font-mono font-medium ${
                        formStep === 1
                          ? 'opacity-30 pointer-events-none'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-amber-500'
                      }`}
                    >
                      &larr; BACK
                    </button>

                    {formStep < 3 ? (
                      <button
                        id="step-next"
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-zinc-900 hover:bg-black font-mono font-semibold text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
                      >
                        CONTINUE &rarr;
                      </button>
                    ) : (
                      <button
                        id="form-submit"
                        type="submit"
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-mono font-semibold flex items-center gap-2"
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

          {/* Interactive Live Scheduler Widget (Right/5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            {/* Real-time Consult Scheduler card */}
            <div className={`p-8 border rounded-3xl ${
              config.themeMode === 'dark' ? 'bg-zinc-901/40 border-zinc-800' : 'bg-white border-zinc-200/50 shadow-xl'
            } space-y-6`}>
              <div className="space-y-1">
                <span className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl inline-block mb-2">
                  <CalendarIcon className="w-5 h-5" />
                </span>
                <h3 className={`text-xl font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                  Book a live studio consult
                </h3>
                <p className="text-xs text-zinc-950 dark:text-zinc-50 leading-relaxed font-sans font-semibold">
                  Let’s schedule a 20-minute digital meeting to walk through albums, discuss vendor coordination, and verify date availability.
                </p>
              </div>

              {/* Styled Mini Calendar layout */}
              <div className="space-y-3 pt-2">
                <span className="text-[0.58rem] font-mono tracking-widest text-amber-500 uppercase block">
                  CHOOSE DATE (MAY 2026)
                </span>
                <div className="grid grid-cols-6 gap-2 text-center text-xs">
                  {calendarDays.map((day) => {
                    const isSelected = selectedCalendarDay === day;
                    const isPast = day < 24;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => !isPast && setSelectedCalendarDay(day)}
                        disabled={isPast}
                        className={`p-2.5 rounded-lg border font-mono transition-colors text-center ${
                          isPast
                            ? 'opacity-25 border-transparent cursor-not-allowed'
                            : isSelected
                            ? 'border-amber-500 bg-amber-500 text-zinc-950 font-bold'
                            : 'border-zinc-100 dark:border-zinc-800 dark:text-zinc-200 text-zinc-700 hover:border-amber-500/40'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Choose Time slots */}
              <div className="space-y-3">
                <span className="text-[0.58rem] font-mono tracking-widest text-amber-500 uppercase block">
                  AVAILABLE TIME SLOTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`px-3 py-2 border rounded-lg text-[0.58rem] font-mono transition-colors ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                            : 'border-zinc-100 dark:border-zinc-800 hover:border-amber-500/30 text-zinc-400'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit mini scheduler button */}
              {consultationBooked ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-amber-500/15 border border-amber-500/30 text-amber-600 rounded-xl text-center space-y-1.5"
                >
                  <p className="text-xs font-bold uppercase font-sans">CONSULTATION CONFIRMED</p>
                  <p className="text-[0.58rem] text-zinc-500 uppercase font-mono tracking-wide leading-relaxed">
                    Meeting link (Google Meet) scheduled for May {selectedCalendarDay} at {selectedTimeSlot}. Sent details!
                  </p>
                </motion.div>
              ) : (
                <button
                  id="contact-consult-submit"
                  onClick={handleBookConsultation}
                  className="w-full py-3.5 bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-black text-xs font-semibold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  SECURE DIGITAL CONSULTATION
                </button>
              )}
            </div>

            {/* Studio Info / Office Coordinates */}
            <div className="space-y-4 pl-4 border-l border-amber-500/20 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-amber-500 text-[0.55rem] tracking-[0.35em] uppercase block">
                  OFFICE COORDINATES
                </span>
                <p className="text-zinc-950 dark:text-zinc-50 font-sans tracking-wide font-bold">
                  Toronto Waterfront Studios, Queens Quay West, Suite 412, Toronto, Ontario
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-amber-500 text-[0.55rem] tracking-[0.35em] uppercase block">
                  REPRESENTATIVE EMAIL
                </span>
                <p className="text-zinc-950 dark:text-zinc-50 font-mono tracking-wider font-bold">
                  studio@pritoreza.ca &middot; support@pritoreza.ca
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
