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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Booking Form Column (Left/8 columns) */}
          <div className="lg:col-span-8">
            <div className="space-y-4 mb-12">
              <span className="text-[#E5C158] text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
                COMMISSION APPLICATION
              </span>
              <h1 className={`text-4xl md:text-5xl font-light tracking-tight text-white ${
                config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
              }`}>
                Tell me <span className="italic font-serif text-[#E5C158]">everything</span>.
              </h1>
              <p className="text-xs text-zinc-300 uppercase tracking-widest max-w-xl leading-relaxed font-bold">
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
                  className="p-10 border text-center space-y-6 rounded-3xl bg-[#0E0F12] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white"
                >
                  <span className="inline-flex p-4 bg-[#E5C158]/10 text-[#E5C158] rounded-full">
                    <CheckCircle2 className="w-10 h-10" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light font-serif">Inquiry Registered</h3>
                    <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                      Thank you for trusting our studio. Clara, our lead administrative coordinator is already cataloging your venue plans. Expect a handcrafted wedding proposal in your inbox within 12 hours.
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 my-6" />
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
                    className="text-xs font-mono text-[#E5C158] hover:text-[#F3D17E] uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    SUBMIT ANOTHER INQUIRY
                  </button>
                </motion.div>
              ) : (
                /* Steps form element */
                <motion.form
                  key="inquire-steps"
                  onSubmit={handleSubmitInquireForm}
                  className="p-8 md:p-10 border rounded-3xl space-y-8 bg-[#0E0F12] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center text-[0.6rem] font-mono tracking-widest text-zinc-400">
                    <span className={formStep === 1 ? 'text-[#E5C158] font-bold' : ''}>1. CORE DATA</span>
                    <span className="w-8 h-[1px] bg-white/10" />
                    <span className={formStep === 2 ? 'text-[#E5C158] font-bold' : ''}>2. ATMOSPHERE</span>
                    <span className="w-8 h-[1px] bg-white/10" />
                    <span className={formStep === 3 ? 'text-[#E5C158] font-bold' : ''}>3. YOUR TALE</span>
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
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            name="name1"
                            value={formData.name1}
                            onChange={handleChangeInput}
                            placeholder="Clara Bennett"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-zinc-300 font-bold uppercase block">
                            Partner's Name (Optional)
                          </label>
                          <input
                            type="text"
                            name="name2"
                            value={formData.name2}
                            onChange={handleChangeInput}
                            placeholder="Julian Mercer"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                            Email Inbox Address *
                          </label>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChangeInput}
                            placeholder="clara@example.com"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                            Mobile Contact Number *
                          </label>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleChangeInput}
                            placeholder="+1 (416) 555-1200"
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                            Celebration Date *
                          </label>
                          <input
                            type="date"
                            required
                            name="date"
                            value={formData.date}
                            onChange={handleChangeInput}
                            className="w-full text-xs font-sans p-3.5 border border-white/10 bg-[#141519] text-white rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                            Venue / City Location *
                          </label>
                          <input
                            type="text"
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleChangeInput}
                            placeholder="Casa Loma, Toronto OR Destination..."
                            className="w-full text-xs font-sans tracking-wide p-3.5 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 transition-all duration-300"
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
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                          Desired Service Commission Category
                        </label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChangeInput}
                          className="w-full text-xs font-sans p-4 border border-white/10 bg-[#141519] text-white rounded-xl focus:outline-hidden focus:border-[#E5C158] transition-all duration-300 cursor-pointer"
                        >
                          <option value="photo-film" className="bg-[#141519] text-white">Intimate Cohesive Union (Photo + Film Coverage)</option>
                          <option value="photo-only" className="bg-[#141519] text-white">Fine Art Photography Only Archive</option>
                          <option value="film-only" className="bg-[#141519] text-white">Cinematic Wedding Filmmaking Only Archive</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                          Visual Atmosphere & Styling Preference
                        </label>
                        <select
                          name="vibe"
                          value={formData.vibe}
                          onChange={handleChangeInput}
                          className="w-full text-xs font-sans p-4 border border-white/10 bg-[#141519] text-white rounded-xl focus:outline-hidden focus:border-[#E5C158] transition-all duration-300 cursor-pointer"
                        >
                          <option value="editorial" className="bg-[#141519] text-white">Curated Fine-Art Editorial (Bespoke Posing, High Contrast)</option>
                          <option value="documentary" className="bg-[#141519] text-white">True candid documentary journal (Sincere, Pure, Raw Light)</option>
                          <option value="dynamic-mix" className="bg-[#141519] text-white">A balanced custom mix (50/50 candid spontaneity and formal direction)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
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
                                  ? 'border-[#E5C158] bg-[#E5C158]/5 text-[#E5C158] font-semibold'
                                  : 'border-white/10 bg-[#141519] text-zinc-300 hover:border-[#E5C158]/30'
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
                        <label className="text-[0.62rem] font-mono tracking-widest text-[#E5C158] uppercase block">
                          Tell me your unique story, vibes & expectations *
                        </label>
                        <textarea
                          required
                          name="story"
                          rows={6}
                          value={formData.story}
                          onChange={handleChangeInput}
                          placeholder="How did you cross paths? What parts of your celebration are you most passionate about capturing? Let us feel your vision..."
                          className="w-full text-xs font-sans p-4 border border-white/10 bg-[#141519] text-white placeholder-zinc-500 rounded-xl focus:outline-hidden focus:border-[#E5C158] focus:ring-1 focus:ring-[#E5C158]/50 resize-none leading-relaxed"
                        />
                      </div>

                      <div className="p-4 bg-[#E5C158]/5 border border-[#E5C158]/10 rounded-xl space-y-1.5 flex items-start gap-3">
                        <Award className="w-5 h-5 text-[#E5C158] mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[0.65rem] font-mono text-zinc-400 block uppercase">
                            AUTHENTIC ARCHIVES GUARANTEE
                          </span>
                          <span className="text-[0.6rem] text-zinc-300 block leading-relaxed uppercase font-semibold">
                            Your reservation respects strict, custom visual direction. We ensure secure delivery of metadata frames.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Operational Flow Buttons */}
                  <div className="flex justify-between pt-6 border-t border-white/10">
                    <button
                      id="step-prev"
                      type="button"
                      onClick={handlePrevStep}
                      disabled={formStep === 1}
                      className={`px-5 py-2.5 text-[0.62rem] select-none tracking-widest uppercase rounded-lg border font-mono font-medium ${
                        formStep === 1
                          ? 'opacity-30 pointer-events-none'
                          : 'border-white/10 text-zinc-400 hover:text-[#E5C158]'
                      }`}
                    >
                      &larr; BACK
                    </button>

                    {formStep < 3 ? (
                      <button
                        id="step-next"
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-[#E5C158] hover:bg-[#F3D17E] font-mono font-semibold text-[#060709]"
                      >
                        CONTINUE &rarr;
                      </button>
                    ) : (
                      <button
                        id="form-submit"
                        type="submit"
                        className="px-6 py-2.5 text-[0.62rem] cursor-pointer tracking-widest uppercase rounded-lg bg-[#E5C158] hover:bg-[#F3D17E] text-[#060709] font-mono font-semibold flex items-center gap-2"
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
            <div className="space-y-4 pl-4 border-l border-[#E5C158]/20 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[#E5C158] text-[0.55rem] tracking-[0.35em] uppercase block">
                  OFFICE COORDINATES
                </span>
                <p className="text-zinc-300 font-sans tracking-wide">
                  Toronto Waterfront Studios, Queens Quay West, Suite 412, Toronto, Ontario
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[#E5C158] text-[0.55rem] tracking-[0.35em] uppercase block">
                  REPRESENTATIVE EMAIL
                </span>
                <p className="text-zinc-300 font-mono tracking-wider">
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
