import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, MessageSquare, Sparkles, Send, Check } from 'lucide-react';
import { ThemeConfig } from '../types';

interface FaqPageProps {
  config: ThemeConfig;
  onNavigate: (page: string) => void;
}

interface FaqItem {
  id: string;
  category: 'Booking' | 'Photography' | 'Cinematography' | 'Post-Production';
  question: string;
  answer: string;
}

export default function FaqPage({ config, onNavigate }: FaqPageProps) {
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'Booking',
      question: 'How far in advance should we reserve our wedding date?',
      answer: 'Due to our limited annual commissions (we limit ourselves to 20 principal celebrations a year to maintain absolute high-fidelity focus and custom styling), couples usually book our services 10 to 18 months in advance. Prime summer and autumn weekends populate incredibly quickly.'
    },
    {
      id: 'faq-2',
      category: 'Booking',
      question: 'Do you travel for destination elopements or international celebrations?',
      answer: 'Absolutely. We shoot globally. Our rates for travel are highly simplified: you cover flights, local transport, and 3 nights of lodging. We handle and book all of our logistics ourselves so you do not have any operational stress.'
    },
    {
      id: 'faq-3',
      category: 'Photography',
      question: 'What happens if the weather is overcast or raining on our session?',
      answer: 'Overcast skies actually provide the ultimate soft box, casting gorgeous painting-like flat templates with Zero harsh shadows. If heavy downpours occur, we have refined indoor shoot locations pre-planned, or we can embrace the cinematic nature of rain under custom retro ivory umbrellas.'
    },
    {
      id: 'faq-4',
      category: 'Photography',
      question: 'Do you supply raw or unedited digital archives of the day?',
      answer: 'We deliver fully polished, colour-mastered, white-balance corrected files in the highest resolution possible. The RAW files are pre-retouch drafts; delivering them would bypass the premium hand-crafting and aesthetic styling that defines our studio signature look.'
    },
    {
      id: 'faq-5',
      category: 'Cinematography',
      question: 'Can we choose the licensing soundtrack music for our wedding film?',
      answer: 'Yes! We purchase commercial licences representing a premium library of musicians. While we take complete creative control over audio atmosphere and storytelling structure, we send a couple of licensed options matching your specific musical and pacing preferences beforehand.'
    },
    {
      id: 'faq-6',
      category: 'Post-Production',
      question: 'When can we expect to see our digital gallery and film delivered?',
      answer: 'We believe you should not have to wait months to feel your day again. Retouched "Sneak Peek" Highlight folders are sent to you within 72 hours of your wedding. Your final, complete high-resolution gallery and edited cinematic wedding films are delivered within 8 to 12 weeks.'
    },
    {
      id: 'faq-7',
      category: 'Post-Production',
      question: 'Can we build custom tactile lay-flat wedding albums with you?',
      answer: 'Yes. Our lay-flat heirloom legacy albums are designed in-house and bound in Italy with luxurious leather, premium linen silks, and thick double-weight cardstock. We guide you through selecting the stories, designing layouts, and paper weights.'
    }
  ];

  const [activeFaqId, setActiveFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive "Ask a custom question" widget state
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [questionSent, setQuestionSent] = useState<boolean>(false);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isDarkMode = config.themeMode === 'dark';

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setCustomQuestion('');
    }, 4500);
  };

  const textTitleClass = isDarkMode ? 'text-white' : 'text-zinc-900';
  const borderClass = isDarkMode ? 'border-white/10' : 'border-zinc-300';

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-[#C5A880] font-bold shrink-0">
            04 // PERSISTENT FAQS & KNOWLEDGE
          </span>
          <div className={`h-[1px] w-full bg-linear-to-r ${isDarkMode ? 'from-white/10' : 'from-zinc-300'} to-transparent`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* FAQ Column (Left/8) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h1 className={`text-3xl md:text-5xl font-light tracking-tight pb-3 ${textTitleClass} ${
                config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
              }`}>
                Answering your <span className="italic font-serif text-[#C5A880]">questions</span>.
              </h1>
              <p className={`text-xs uppercase tracking-widest max-w-xl leading-relaxed font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Transparency is a core foundation of our boutique studio. Read through detail procedures to coordinate seamless photography sessions.
              </p>
            </div>

            {/* Filter Tools */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t ${borderClass} pb-2`}>
              <div className="flex flex-wrap gap-2 text-xs">
                {['All', 'Booking', 'Photography', 'Cinematography', 'Post-Production'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`py-2 px-4 rounded-xl font-sans tracking-wide border transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'border-[#C5A880]/80 bg-[#C5A880]/10 text-[#C5A880] font-semibold'
                        : isDarkMode
                          ? 'border-white/10 hover:border-[#C5A880]/30 text-zinc-400'
                          : 'border-zinc-300 hover:border-[#C5A880]/30 text-zinc-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mini search bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Quick keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-9 pr-3 py-2 w-full md:w-52 border rounded-xl text-xs font-sans focus:outline-hidden focus:border-[#C5A880]/50 ${
                    isDarkMode 
                      ? 'border-white/10 bg-[#141519] text-white placeholder-zinc-500' 
                      : 'border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-4 pt-4">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-2xl transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#C5A880]/40 bg-linear-to-b from-[#C5A880]/5 to-transparent' 
                        : isDarkMode
                          ? 'border-white/10 hover:border-[#C5A880]/15'
                          : 'border-zinc-300 hover:border-[#C5A880]/15'
                    }`}
                  >
                    <button
                      id={`faq-toggle-${faq.id}`}
                      onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left p-6 gap-4 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-[0.6rem] font-mono tracking-widest text-[#C5A880] uppercase">
                          {faq.category}
                        </span>
                        <h3 className={`text-base font-medium tracking-tight font-sans ${isDarkMode ? 'text-zinc-200' : 'text-zinc-900'}`}>
                          {faq.question}
                        </h3>
                      </div>
                      <span className={`p-2 border rounded-lg text-[#C5A880] shrink-0 ${isDarkMode ? 'border-white/10' : 'border-zinc-300'}`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className={`px-6 pb-6 text-xs leading-relaxed font-sans font-medium max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Question Desk widget (Right/4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className={`p-8 border rounded-3xl space-y-6 ${
              isDarkMode 
                ? 'bg-[#0E0F12] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white' 
                : 'bg-[#EBEAE6] border-zinc-300 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-zinc-900'
            }`}>
              <div className="space-y-2">
                <span className="p-3 bg-[#C5A880]/10 text-[#C5A880] rounded-2xl inline-block">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <h3 className={`text-lg font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                  Still have unanswered questions?
                </h3>
                <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Write directly to our studio desk. Our administrative team will reach back with tailored replies within 12 hours.
                </p>
              </div>

              <form onSubmit={handleSendQuestion} className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                    Your Inquire Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="clara@example.com"
                    className={`w-full text-xs font-sans tracking-wide p-3.5 border rounded-xl focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/50 transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-white/10 bg-[#141519] text-white placeholder-zinc-500' 
                        : 'border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[0.62rem] font-mono tracking-widest text-[#C5A880] uppercase block">
                    Your Question
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ask about travel rates, scheduling timelines, second shooter availability..."
                    className={`w-full text-xs font-sans tracking-wide p-3.5 border rounded-xl focus:outline-hidden focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]/50 resize-none leading-relaxed transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-white/10 bg-[#141519] text-white placeholder-zinc-500' 
                        : 'border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400'
                    }`}
                  />
                </div>

                {questionSent ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl flex items-center gap-3 text-xs"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Inquiry processed! Check your email inbox.</span>
                  </motion.div>
                ) : (
                  <button
                    id="faq-submit-question-btn"
                    type="submit"
                    className="w-full py-3.5 bg-[#C5A880] hover:bg-[#D4B48F] text-[#060709] text-xs font-semibold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                  >
                    <Send className="w-3.5 h-3.5" />
                    SEND studio QUESTION
                  </button>
                )}
              </form>

              <div className={`border-t pt-4 text-center ${borderClass}`}>
                <button
                  id="faq-back-contact-btn"
                  onClick={() => onNavigate('contact')}
                  className="text-[0.62rem] font-mono text-[#C5A880] tracking-widest uppercase hover:underline cursor-pointer"
                >
                  Jump to Reserve Form &rarr;
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
