import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, HelpCircle, Sparkles, DollarSign, Clock, Camera, FileText } from 'lucide-react';
import { ThemeConfig } from '../types';
import { FadeUpReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface ServicesPageProps {
  config: ThemeConfig;
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ config, onNavigate }: ServicesPageProps) {
  const packages = [
    {
      id: 'heritage-photo',
      title: 'The Editorial Archive',
      subtitle: 'FINE ART PHOTOGRAPHY',
      price: '$5,800',
      description: 'Stellar photography storytelling paired with custom editorial direction for couples seeking authentic, elegant documentation.',
      features: [
        '9 Hours of Continuous Coverage',
        'Lead Artist Sourav Sachin & Secondary Shooter',
        'Custom Curated High-Res Digital Archive (600+ Images)',
        'Full Art-Direction & Styling Consultation',
        'Online Private Gallery with 10-Year Cloud Storage',
        'Sneak Peek Highlights delivered within 72 hours',
        'Complimentary Engagement Session (2 Hours)',
      ],
      badge: 'Most Desired',
    },
    {
      id: 'cinematic-film',
      title: 'The Cinematic Heirloom',
      subtitle: 'MOTION ARTISTRY & FILM',
      price: '$6,500',
      description: 'Elegant cinematic filmmaking highlighting raw emotions, laughter, and premium soundscapes of your celebration.',
      features: [
        '9 Hours of Motion Capture',
        'Two Dedicated Cinematographers',
        '5-7 Minute Editorial Highlight Film',
        'Full Ceremony & Toasts Master Cuts',
        'High-Fidelity Audio Sound Design & Licenced Music track',
        '4K Cinematic Resolution Delivery',
        'Sneak Peek Video Reel within 2 weeks',
      ],
      badge: 'Pure Cinema',
    },
    {
      id: 'monument-duo',
      title: 'The Kinship Union',
      subtitle: 'COHESIVE PHOTO + FILM EXPERIENCE',
      price: '$10,800',
      description: 'The definitive service pairing photography and cinematography seamlessly, ensuring zero compromise on your wedding day.',
      features: [
        'Full Day Coverage (12 Hours)',
        'Sourav Sachin + 3 Associate shooters (2 Photo, 2 Film)',
        'Engagement Session OR Rehearsal Dinner coverage',
        'Complete High-Res Digital Archive (900+ Images)',
        '8-10 Minute Cinematic Film & Full Master Cuts',
        'Stunning Handcrafted 12x12 Signature Leather Album',
        'Ultra-fast Sneak Peeks & High-Priority Retouching',
      ],
      badge: 'Prestige Tier',
    },
  ];

  const alacarte = [
    { name: 'Extra Hour of Coverage', price: '$450/hr', desc: 'Add extra time for both photography or cinematography, scheduled anytime.' },
    { name: 'Heirloom Fine-Art Album', price: '$850', desc: 'Crafted in Italy with premium Italian leather and archival-quality museum paper.' },
    { name: 'Engagement Session Only', price: '$950', desc: '2 hours of curated portraiture in up to two Toronto or custom locations.' },
    { name: 'Rehearsal Dinner Coverage', price: '$1,200', desc: '3 hours of coverage of intimate toasts and family reunions before the big day.' },
    { name: 'Super 8mm Film Highlights', price: '$800', desc: 'Authentic retro aesthetic shot on genuine Kodak Super 8 film stock.' },
    { name: 'Drone/Aerial Film Upgrade', price: '$400', desc: 'Subject to local flight regulations, adds spectacular grand scale perspectives.' },
  ];

  // Custom interactive pricing builder state
  const [selectedMainTier, setSelectedMainTier] = useState<string>('heritage-photo');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [durationHours, setDurationHours] = useState<number>(9);

  const getTierBasePrice = () => {
    if (selectedMainTier === 'heritage-photo') return 5800;
    if (selectedMainTier === 'cinematic-film') return 6500;
    return 10800;
  };

  const calculateCustomTotal = () => {
    let total = getTierBasePrice();
    
    // Add-on calculations
    selectedAddons.forEach(addonName => {
      const addon = alacarte.find(item => item.name === addonName);
      if (addon) {
        const numeral = parseInt(addon.price.replace(/[^0-9]/g, ''), 10);
        if (!isNaN(numeral)) {
          total += numeral;
        }
      }
    });

    // Custom hours calculation
    const baseHours = selectedMainTier === 'monument-duo' ? 12 : 9;
    if (durationHours > baseHours) {
      total += (durationHours - baseHours) * 450;
    }

    return total;
  };

  const handleToggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(prev => prev.filter(item => item !== name));
    } else {
      setSelectedAddons(prev => [...prev, name]);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header Divider Line */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-[0.62rem] font-mono tracking-[0.45em] text-amber-500 font-bold shrink-0">
            05 // SERVICES & COLLECTIONS
          </span>
          <div className="h-[1px] w-full bg-linear-to-r from-amber-500/30 to-transparent" />
        </div>

        {/* Title Content */}
        <div className="max-w-3xl mb-24">
          <FadeUpReveal>
            <h1
              className={`text-4xl md:text-6xl font-light tracking-tight pb-6 ${
                config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
              }`}
            >
              Invest in <span className="italic font-serif text-amber-500/90">your legacy</span>.
            </h1>
          </FadeUpReveal>
          <FadeUpReveal delay={0.15}>
            <p className="text-sm md:text-base text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed max-w-2xl">
              I believe that photography should be deeply felt. Our bespoke collections are tailored entirely to your requirements, crafted with premium standards, luxury leather albums, and master-retouched archives.
            </p>
          </FadeUpReveal>
        </div>

        {/* 3 Main Packages Card Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          {packages.map((pkg, index) => (
            <StaggerItem key={pkg.id}>
              <div
                className={`relative h-full flex flex-col justify-between border p-8 md:p-10 transition-all duration-500 group rounded-2xl ${
                  config.themeMode === 'dark'
                    ? 'bg-zinc-900/55 border-zinc-800 hover:border-amber-500/35'
                    : 'bg-white border-zinc-200 hover:border-amber-500/35 shadow-xs'
                }`}
              >
                <div>
                  {/* Badge decoration */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[0.62rem] font-mono tracking-[0.35em] text-amber-600 dark:text-amber-400 font-bold uppercase">
                      {pkg.subtitle}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-widest font-sans font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-light mb-2 tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                    {pkg.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-6 text-amber-500">
                    <span className="text-3xl font-light font-sans">{pkg.price}</span>
                    <span className="text-xs text-zinc-950 dark:text-zinc-50 font-bold">/ local experience</span>
                  </div>

                  <p className="text-xs text-zinc-950 dark:text-zinc-50 leading-relaxed font-bold mb-8">
                    {pkg.description}
                  </p>

                  {/* Features Divider */}
                  <div className="w-full h-[1px] bg-zinc-300/60 dark:bg-zinc-800/60 mb-8" />

                  {/* Features List */}
                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((fea, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-zinc-950 dark:text-zinc-50 tracking-wide font-sans font-bold">
                          {fea}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`services-pkg-select-${pkg.id}`}
                  onClick={() => {
                    setSelectedMainTier(pkg.id);
                    const calcEl = document.getElementById('investment-calculator');
                    if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 text-center cursor-pointer transition-all duration-300 text-xs font-sans font-medium tracking-[0.2em] uppercase border rounded-xl hover:-translate-y-0.5 hover:shadow-sm mt-auto bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-800 dark:border-zinc-800 dark:hover:bg-zinc-700 hover:bg-black"
                >
                  SELECT & CALCULATE Addons
                </button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Interactive Bespoke Pricing Estimator Section */}
        <div id="investment-calculator" className="mb-28 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
            <span className="text-amber-500 text-[0.62rem] tracking-[0.45em] uppercase font-sans font-semibold block">
              BESPOKE STUDIO ESTIMATOR
            </span>
            <h2 className={`text-3xl font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
              Build Your Heritage Collection
            </h2>
            <p className="text-xs text-zinc-950 dark:text-zinc-50 font-bold">
              Select your primary tier, customize coverage timeline, and pick tactile add-ons to real-time estimate your final investment value.
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 border rounded-3xl ${
            config.themeMode === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'
          }`}>
            {/* Customizer Columns */}
            <div className="lg:col-span-8 space-y-10">
              {/* Step 1: Choose Main Tier */}
              <div>
                <label className="text-xs font-mono tracking-widest text-amber-500 uppercase block mb-4">
                  1. CHOOSE SIGNATURE BASE TYPE
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedMainTier(p.id);
                        // Reset duration to fit package defaults
                        setDurationHours(p.id === 'monument-duo' ? 12 : 9);
                      }}
                      className={`p-5 text-left rounded-xl border transition-all duration-300 ${
                        selectedMainTier === p.id
                          ? 'border-amber-500 bg-amber-500/5'
                          : 'border-zinc-300 dark:border-zinc-800 hover:border-amber-500/30'
                      }`}
                    >
                      <span className="text-[0.62rem] font-mono text-zinc-950 dark:text-zinc-50 block tracking-widest uppercase mb-1 font-bold">
                        {p.subtitle.split(' ')[0]}
                      </span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block mb-2 font-sans">
                        {p.title}
                      </span>
                      <span className="text-amber-500 font-mono text-sm">{p.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Tailor Coverage hours */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-mono tracking-widest text-amber-500 uppercase block">
                    2. COVERAGE HOURS DURATION
                  </label>
                  <span className="text-xs font-mono text-zinc-950 dark:text-zinc-50 bg-zinc-200/80 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full font-bold">
                    {durationHours} Hours Highlighted
                  </span>
                </div>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={selectedMainTier === 'monument-duo' ? 12 : 6}
                    max={16}
                    step={1}
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[0.65rem] text-zinc-950 dark:text-zinc-50 font-mono font-bold">
                    <span>{selectedMainTier === 'monument-duo' ? '12 Hours (Base)' : '6 Hours'}</span>
                    <span>10 Hours</span>
                    <span>14 Hours</span>
                    <span>16 Hours max</span>
                  </div>
                </div>
              </div>

              {/* Step 3: Tactile & Print Alacarte */}
              <div>
                <label className="text-xs font-mono tracking-widest text-amber-500 uppercase block mb-4">
                  3. INCORPORATE AD-ONS & ARCHIVAL UPGRADES
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alacarte.filter(item => item.name !== 'Extra Hour of Coverage').map((addon) => {
                    const isSelected = selectedAddons.includes(addon.name);
                    return (
                      <div
                        key={addon.name}
                        onClick={() => handleToggleAddon(addon.name)}
                        className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 flex justify-between items-start ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/5'
                            : 'border-zinc-300 dark:border-zinc-800 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="max-w-[70%]">
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block font-sans">
                            {addon.name}
                          </span>
                          <span className="text-[0.65rem] text-zinc-950 dark:text-zinc-50 line-clamp-1 block mt-0.5 font-semibold">
                            {addon.desc}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-500 shrink-0">
                          +{addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Price Output Summary Card */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-mono tracking-widest text-zinc-950 dark:text-zinc-50 uppercase block border-b border-zinc-200 dark:border-zinc-800 pb-2 font-bold">
                  ESTIMATE BREAKDOWN
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-950 dark:text-zinc-50 font-bold">
                    <span>Base Tier:</span>
                    <span className="font-mono">{formatCurrency(getTierBasePrice())}</span>
                  </div>

                  {/* Hours upgrade calculation */}
                  {((selectedMainTier === 'monument-duo' && durationHours > 12) || 
                    (selectedMainTier !== 'monument-duo' && durationHours > 9)) && (
                    <div className="flex justify-between text-zinc-950 dark:text-zinc-50 font-bold">
                      <span>Add\'l Hours ({durationHours - (selectedMainTier === 'monument-duo' ? 12 : 9)}hr):</span>
                      <span className="font-mono">
                        {formatCurrency((durationHours - (selectedMainTier === 'monument-duo' ? 12 : 9)) * 450)}
                      </span>
                    </div>
                  )}

                  {/* Addon details */}
                  {selectedAddons.map(name => {
                    const found = alacarte.find(item => item.name === name);
                    if (!found) return null;
                    return (
                      <div key={name} className="flex justify-between text-zinc-950 dark:text-zinc-50 pl-2 border-l border-amber-500/30 font-bold">
                        <span className="truncate max-w-[150px]">{name}:</span>
                        <span className="font-mono">{found.price}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                  <span className="text-[0.62rem] font-mono tracking-wider text-zinc-950 dark:text-zinc-50 uppercase block mb-1 font-bold">
                    TOTAL INVESTMENT ESTIMATE
                  </span>
                  <div className="text-4xl font-light text-amber-500 tracking-tight font-sans">
                    {formatCurrency(calculateCustomTotal())}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-12">
                <button
                  id="estimator-submit-btn"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-4 text-center cursor-pointer bg-amber-500 hover:bg-amber-600 text-zinc-950 font-sans font-bold text-xs tracking-[0.25em] uppercase rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  SECURE THIS PROPOSAL
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[0.58rem] font-mono text-zinc-950 dark:text-zinc-50 block text-center uppercase tracking-widest leading-relaxed font-bold">
                  Prices exclude applicable local sales taxes. Final quote generated upon formal contract signing.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* A la Carte Complete List Details */}
        <div>
          <h3 className={`text-2xl font-light mb-10 tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
            Bespoke Elements / À La Carte
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alacarte.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 font-sans">
                    {item.name}
                  </h4>
                  <span className="text-xs font-mono text-amber-500 font-bold shrink-0 pl-4">{item.price}</span>
                </div>
                <p className="text-xs text-zinc-950 dark:text-zinc-50 font-bold max-w-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
