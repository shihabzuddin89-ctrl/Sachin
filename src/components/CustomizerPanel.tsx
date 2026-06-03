import React, { useState } from 'react';
import { 
  Settings, Sparkles, Sliders, Type, Layers, Check, 
  Eye, EyeOff, RotateCcw, Image, Plus, Trash2, ChevronRight, ChevronLeft
} from 'lucide-react';
import { ThemeConfig, PhotoItem } from '../types';

interface CustomizerPanelProps {
  config: ThemeConfig;
  onChangeConfig: (newConfig: ThemeConfig) => void;
  onResetToDefault: () => void;
  photos: PhotoItem[];
  onChangePhotos: (newPhotos: PhotoItem[]) => void;
}

export default function CustomizerPanel({ 
  config, 
  onChangeConfig, 
  onResetToDefault, 
  photos, 
  onChangePhotos 
}: CustomizerPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'branding' | 'styling' | 'content' | 'managePhotos'>('branding');

  // Photo editing state assistants
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'wedding' | 'editorial' | 'film' | 'lifestyle'>('wedding');
  const [newPhotoLocation, setNewPhotoLocation] = useState('Toronto, ON');

  const updateField = (field: keyof ThemeConfig, value: any) => {
    onChangeConfig({
      ...config,
      [field]: value
    });
  };

  const handleAddCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) return;

    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      url: newPhotoUrl,
      title: newPhotoTitle || 'Untitled Archive Frame',
      category: newPhotoCategory,
      location: newPhotoLocation || 'Toronto, ON',
      year: new Date().getFullYear().toString()
    };

    onChangePhotos([newPhoto, ...photos]);
    // Reset fields
    setNewPhotoUrl('');
    setNewPhotoTitle('');
  };

  const handleDeletePhoto = (id: string) => {
    onChangePhotos(photos.filter(p => p.id !== id));
  };

  return (
    <>
      {/* Floating Toggle Bubble (visible when pane is collapsed) */}
      {!isOpen && (
        <button
          id="editor-open-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 p-4 bg-amber-400 text-zinc-950 rounded-full shadow-2xl hover:scale-105 hover:bg-zinc-900 hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer border border-amber-300"
        >
          <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[0.65rem] font-sans font-semibold tracking-widest uppercase pr-1">
            Visual Studio Editor
          </span>
        </button>
      )}

      {/* Main Customizer Sliding Dock Container */}
      <div
        id="editor-sidebar-container"
        className={`fixed top-0 left-0 bottom-0 z-50 w-full sm:w-[420px] bg-zinc-950 text-zinc-100 border-r border-zinc-800 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Dock Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-400 text-zinc-950 rounded-md">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-100 uppercase">
                STUDIO CMS WORKSPACE
              </h3>
              <p className="text-[0.58rem] text-zinc-400 tracking-wider">
                Live Edit Theme, Typography & Dynamic Frames
              </p>
            </div>
          </div>

          <button
            id="editor-collapse-button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Minimize Panel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls Navigation */}
        <div className="grid grid-cols-4 border-b border-zinc-800 bg-zinc-900 text-center font-mono text-[0.55rem] tracking-wider select-none">
          <button
            id="tab-branding"
            onClick={() => setActiveTab('branding')}
            className={`py-3.5 hover:bg-zinc-800 transition-colors uppercase border-b-2 font-bold ${
              activeTab === 'branding' ? 'text-amber-300 border-amber-400 bg-zinc-950' : 'text-zinc-400 border-transparent'
            }`}
          >
            1. Firm
          </button>
          
          <button
            id="tab-styling"
            onClick={() => setActiveTab('styling')}
            className={`py-3.5 hover:bg-zinc-800 transition-colors uppercase border-b-2 font-bold ${
              activeTab === 'styling' ? 'text-amber-300 border-amber-400 bg-zinc-950' : 'text-zinc-400 border-transparent'
            }`}
          >
            2. Design
          </button>

          <button
            id="tab-content"
            onClick={() => setActiveTab('content')}
            className={`py-3.5 hover:bg-zinc-800 transition-colors uppercase border-b-2 font-bold ${
              activeTab === 'content' ? 'text-amber-300 border-amber-400 bg-zinc-950' : 'text-zinc-400 border-transparent'
            }`}
          >
            3. Sections
          </button>

          <button
            id="tab-photos"
            onClick={() => setActiveTab('managePhotos')}
            className={`py-3.5 hover:bg-zinc-800 transition-colors uppercase border-b-2 font-bold ${
              activeTab === 'managePhotos' ? 'text-amber-300 border-amber-400 bg-zinc-950' : 'text-zinc-400 border-transparent'
            }`}
          >
            4. Photos
          </button>
        </div>

        {/* Content Pane Body (Scrollable scrolling items) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: BRANDING & HEADLINES */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase">
                  PHOTOGRAPHY FIRM NAME *
                </label>
                <input
                  id="edit-studio-name"
                  type="text"
                  value={config.studioName}
                  onChange={(e) => updateField('studioName', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-serif"
                  placeholder="Studio Name"
                />
                <span className="text-[0.55rem] text-zinc-500 font-sans">
                  Instantly rebrand the entire website with your custom firm identity.
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase">
                  PRIMARY TAGLINE 1 (HERO HEADER)
                </label>
                <input
                  id="edit-tagline1"
                  type="text"
                  value={config.tagline1}
                  onChange={(e) => updateField('tagline1', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-sans font-light"
                  placeholder="Primary Tagline"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase">
                  SECONDARY SUB-TAGLINE
                </label>
                <input
                  id="edit-tagline2"
                  type="text"
                  value={config.tagline2}
                  onChange={(e) => updateField('tagline2', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-sans font-light"
                  placeholder="Sub Tagline"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase">
                  LOCATION & MARKETS
                </label>
                <input
                  id="edit-location"
                  type="text"
                  value={config.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-sm text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-sans font-light"
                  placeholder="E.g., Toronto, Ontario"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase">
                  PHOTOGRAPHER PROFILE TEXT
                </label>
                <textarea
                  id="edit-about"
                  rows={4}
                  value={config.aboutText1}
                  onChange={(e) => updateField('aboutText1', e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-hidden focus:border-amber-400 rounded-sm resize-none"
                  placeholder="Introduction paragraph 1"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STYLING & THEMING AND ANIMATION SPEED */}
          {activeTab === 'styling' && (
            <div className="space-y-6">
              
              {/* Theme Presets */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase block">
                  Aesthetic Theme Mode
                </label>
                <div id="aesthetic-presets" className="grid grid-cols-3 gap-2">
                  {(['cream', 'light', 'dark'] as const).map((mode) => (
                    <button
                      id={`theme-preset-${mode}`}
                      key={mode}
                      onClick={() => updateField('themeMode', mode)}
                      className={`cursor-pointer border py-2 text-[0.62rem] font-mono font-bold uppercase rounded-sm transition-all duration-300 block ${
                        config.themeMode === mode
                          ? 'bg-amber-400 text-zinc-950 border-amber-400'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {mode} PRES
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Palettes */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase block">
                  Accent Color Palette
                </label>
                <div id="accent-swatches" className="flex flex-wrap gap-2.5">
                  {[
                    { key: 'champagne', color: 'bg-amber-300 text-zinc-950', name: 'Champagne' },
                    { key: 'slate', color: 'bg-slate-400 text-zinc-950', name: 'Slate' },
                    { key: 'charcoal', color: 'bg-zinc-600 text-white', name: 'Charcoal' },
                    { key: 'emerald', color: 'bg-emerald-600 text-white', name: 'Emerald' },
                    { key: 'rose', color: 'bg-rose-400 hover:scale-105', name: 'Rose Gold' }
                  ].map((preset) => {
                    const isSelected = config.accentColor === preset.key;
                    return (
                      <button
                        id={`accent-swatch-${preset.key}`}
                        key={preset.key}
                        onClick={() => updateField('accentColor', preset.key)}
                        className={`cursor-pointer px-3 py-1.5 rounded-sm text-[0.62rem] font-mono tracking-wide flex items-center gap-1.5 border transition-all ${
                          isSelected
                            ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                            : 'border-zinc-800 hover:border-zinc-700 text-zinc-300 bg-zinc-900'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${preset.color}`} />
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Typography Preset */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase block">
                  Typography pairing Option
                </label>
                <div id="typography-options" className="space-y-2">
                  {[
                    { key: 'editorial', title: 'Cormorant Garamond Serif Theme', desc: 'Warm elegant wedding feel' },
                    { key: 'classic', title: 'Romantic Playfair Italic Serif Theme', desc: 'Soft and cinematic fashion look' },
                    { key: 'modern-mono', title: 'High-contrast JetBrains Tech-Mono Theme', desc: 'Minimalist editorial gallery vibe' }
                  ].map((preset) => (
                    <button
                      id={`typo-btn-${preset.key}`}
                      key={preset.key}
                      onClick={() => updateField('fontPreset', preset.key)}
                      className={`cursor-pointer w-full text-left p-2.5 rounded-sm border transition-all duration-300 block ${
                        config.fontPreset === preset.key
                          ? 'border-amber-400 bg-amber-500/10 text-white'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <h4 className="text-[0.7rem] font-mono font-bold tracking-wide uppercase">{preset.title}</h4>
                      <p className="text-[0.58rem] mt-0.5 text-zinc-500 font-sans">{preset.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animation Speed Modulator */}
              <div className="space-y-2">
                <label className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase block">
                  Page Animation Timings
                </label>
                <div id="speed-triggers" className="grid grid-cols-3 gap-2 text-center">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                      id={`speed-preset-${speed}`}
                      key={speed}
                      onClick={() => updateField('animationSpeed', speed)}
                      className={`cursor-pointer border py-2 text-[0.62rem] font-mono font-bold uppercase rounded-sm transition-all duration-300 ${
                        config.animationSpeed === speed
                          ? 'bg-amber-400 text-zinc-950 border-amber-400'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {speed.toUpperCase()}
                    </button>
                  ))}
                </div>
                <span className="text-[0.52rem] text-zinc-500 font-sans block mt-1">
                  Updates duration curves for image transitions, taglines and text reveals.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: TOGGLE DISPLAY MODULES */}
          {activeTab === 'content' && (
            <div className="space-y-5">
              <span className="text-[0.65rem] font-mono tracking-widest text-zinc-400 uppercase block mb-2">
                Configure Layout Blocks
              </span>

              {[
                { key: 'showFilms', title: 'Include Wedding Cinema Panel', desc: 'Displays embedded media highlights' },
                { key: 'showTips', title: 'Include Bridal Wisdom accordion', desc: 'Wedding guidelines column' },
                { key: 'showReviews', title: 'Include Praise / Couple Letters', desc: 'Emotional multi-slides review block' },
              ].map((item) => {
                const isEnabled = config[item.key as keyof ThemeConfig] as boolean;
                return (
                  <button
                    id={`toggle-layout-${item.key}`}
                    key={item.key}
                    onClick={() => updateField(item.key as keyof ThemeConfig, !isEnabled)}
                    className={`cursor-pointer w-full p-4 rounded-sm border text-left flex items-start justify-between gap-4 transition-all duration-300 ${
                      isEnabled
                        ? 'border-emerald-500/40 bg-emerald-500/5 text-zinc-100'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-500'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <h4 className="text-[0.72rem] font-mono font-bold tracking-wide uppercase flex items-center gap-1.5">
                        {item.title}
                      </h4>
                      <p className="text-[0.58rem] text-zinc-500 font-sans">{item.desc}</p>
                    </div>

                    <div className={`p-1 rounded-sm ${isEnabled ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                      {isEnabled ? <Check className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 4: MANAGE DYNAMIC IMAGES / FRAME FEED */}
          {activeTab === 'managePhotos' && (
            <div className="space-y-6">
              
              {/* Add New Frame Panel */}
              <form onSubmit={handleAddCustomPhoto} className="p-4 bg-zinc-900 border border-zinc-800 rounded-md space-y-3.5">
                <span className="text-[0.6rem] font-mono tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                  <Image className="w-3.5 h-3.5 text-amber-400" />
                  FEED A PORTFOLIO FRAME
                </span>

                <div className="space-y-1">
                  <label className="text-[0.55rem] font-mono tracking-widest text-zinc-500 uppercase">
                    Unsplash Image Direct URL *
                  </label>
                  <input
                    id="add-photo-url"
                    type="url"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 p-2 text-xs text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-sans"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[0.55rem] font-mono tracking-widest text-zinc-500 uppercase">
                      Category *
                    </label>
                    <select
                      id="add-photo-cat"
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                      className="w-full bg-zinc-950 border border-zinc-700 p-2 text-xs text-white focus:outline-hidden rounded-sm font-sans"
                    >
                      <option value="wedding">Wedding</option>
                      <option value="editorial">Editorial</option>
                      <option value="film">Film Frame</option>
                      <option value="lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[0.55rem] font-mono tracking-widest text-zinc-500 uppercase">
                      Location / Region
                    </label>
                    <input
                      id="add-photo-loc"
                      type="text"
                      value={newPhotoLocation}
                      onChange={(e) => setNewPhotoLocation(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-700 p-2 text-xs text-white focus:outline-hidden rounded-sm font-sans"
                      placeholder="Toronto, ON"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.55rem] font-mono tracking-widest text-zinc-500 uppercase">
                    Vows or Couples Name
                  </label>
                  <input
                    id="add-photo-title"
                    type="text"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 p-2 text-xs text-white focus:outline-hidden focus:border-amber-400 rounded-sm font-sans"
                    placeholder="E.g. Love in Motion"
                  />
                </div>

                <button
                  id="add-photo-trigger-btn"
                  type="submit"
                  className="cursor-pointer w-full py-2 bg-amber-400 text-zinc-950 font-bold font-mono text-[0.58rem] tracking-wider uppercase rounded-xs transition-colors hover:bg-white flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  FEED FRAME INTO MAIN GRID
                </button>
              </form>

              {/* Feed List (Delete frames) */}
              <div className="space-y-2">
                <span className="text-[0.62rem] font-mono tracking-widest text-zinc-400 uppercase font-bold block">
                  Current Framed Stock ({photos.length})
                </span>

                <div className="max-h-[220px] overflow-y-auto space-y-1.5 border border-zinc-800 p-2 rounded-sm">
                  {photos.map((photo) => (
                    <div 
                      id={`workspace-photo-${photo.id}`}
                      key={photo.id}
                      className="flex items-center justify-between p-1.5 bg-zinc-900 border border-zinc-800 rounded-sm"
                    >
                      <div className="flex items-center gap-2 max-w-[70%]">
                        <img 
                          src={photo.url} 
                          alt="" 
                          className="w-9 h-9 object-cover rounded-xs border border-zinc-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="text-[0.62rem] font-serif tracking-tight text-white truncate">{photo.title}</p>
                          <p className="text-[0.52rem] font-mono tracking-widest text-amber-500 uppercase">{photo.category}</p>
                        </div>
                      </div>

                      <button
                        id={`delete-photo-${photo.id}`}
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Erase photograph"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Global Reset options in Footer panel */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 select-none">
          <button
            id="workspace-reset-button"
            onClick={onResetToDefault}
            className="cursor-pointer flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 font-mono text-[0.58rem] tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-1"
            title="Reload factory configs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restore Factory Core
          </button>

          <button
            id="workspace-preview-button"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold font-mono text-[0.58rem] tracking-wider uppercase rounded-xs transition-colors text-center"
            title="Clean Preview Mode"
          >
            Hide Workspace
          </button>
        </div>
      </div>
    </>
  );
}
