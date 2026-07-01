import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FilmItem, ThemeConfig } from '../types';
import { Play, Film, MapPin, Sparkles, Volume2, VolumeX, Music, Maximize } from 'lucide-react';

interface FilmsPageProps {
  config: ThemeConfig;
  films: FilmItem[];
}

export default function FilmsPage({ config, films }: FilmsPageProps) {
  const [selectedFilm, setSelectedFilm] = useState<FilmItem>(films[0] || {
    id: 'film-1',
    title: 'The Italian Cypress Whispers',
    couple: 'Sophia & Mateo',
    location: 'SIENA, ITALY',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://vimeo.com/823724898',
    category: 'Cinematic'
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  
  // Custom mock interactive audio soundscape engine
  const [activeSoundtrackIndex, setActiveSoundtrackIndex] = useState<number>(0);
  const soundscapes = [
    { name: 'Celestial Cello Plucks', genre: 'Orchestral/Ambient', bpm: '68 bpm', vibe: 'Romantic, Deep, Slow Heritage' },
    { name: 'Warm Nostalgia Super 8', genre: 'Saturate Vinyl Tape', bpm: '72 bpm', vibe: 'Vintage, Textured, Organic' },
    { name: 'Midnight Sparkle Dust', genre: 'Dream Pop / Cinematic Synth', bpm: '80 bpm', vibe: 'Modern, Pulsing, Emotional' }
  ];

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Large Cinematic theater component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-stretch">
          
          {/* Main Visual Screen Player (8 columns) */}
          <div className="lg:col-span-8 relative aspect-[16/9] bg-zinc-950 overflow-hidden rounded-3xl border border-zinc-900 shadow-2xl flex items-center justify-center group">
            {isPlaying ? (
              <div className="absolute inset-0 z-10 bg-zinc-950 flex flex-col items-center justify-center p-8 text-center space-y-6">
                {/* Simulated high-fidelity player stream with retro scanner line */}
                <div className="absolute inset-0 bg-radial-to-r from-[#C5A880]/5 to-transparent pointer-events-none" />
                <div className="absolute h-[1px] w-full bg-white/5 top-1/2 left-0 animate-pulse pointer-events-none" />
                
                <span className="p-4 rounded-full border border-[#C5A880]/30 text-[#C5A880]/80 animate-ping">
                  <Play className="w-6 h-6 fill-[#C5A880]" />
                </span>
                
                <div className="space-y-2 max-w-sm">
                  <span className="text-[0.62rem] font-mono text-zinc-400 tracking-[0.25em] uppercase block">
                    NOW STREAMING IN 4K CINEMA
                  </span>
                  <h3 className="text-xl text-white font-medium font-serif">
                     {selectedFilm.title}
                  </h3>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
                     Atmospheric audio active: {soundscapes[activeSoundtrackIndex].name}
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    id="film-sim-mute"
                    onClick={() => setIsMuted(!isMuted)}
                    className="px-4 py-2 border border-white/20 rounded-lg text-[0.65rem] font-mono tracking-widest text-zinc-400 hover:text-white hover:border-white transition-colors"
                  >
                    {isMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO'}
                  </button>
                  <button
                    id="film-sim-stop"
                    onClick={() => setIsPlaying(false)}
                    className="px-4 py-2 bg-[#C5A880] text-[#060709] font-semibold rounded-lg text-[0.65rem] font-mono tracking-widest hover:bg-[#D4B48F] transition-colors"
                  >
                    STOP FEED
                  </button>
                </div>
              </div>
            ) : null}

            {/* Poster Thumbnail element */}
            <img
              src={selectedFilm.thumbnail}
              alt={selectedFilm.title}
              className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-80 group-hover:scale-101 transition-all duration-[1000ms] group-hover:opacity-100 group-hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Simulated Super 8 Grain lines */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/2 to-transparent mix-blend-overlay opacity-30" />

            {/* Static Controller Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 z-5">
              <span className="bg-zinc-900/90 backdrop-blur-xs text-[#C5A880] text-[0.55rem] font-mono tracking-[0.3em] uppercase px-3 py-1.5 rounded-md self-start border border-[#C5A880]/10">
                RECOMMENDED: WEAR HEADPHONES &middot; 4K
              </span>

              <button
                id="film-play-toggle"
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md text-[#C5A880] font-bold self-center hover:scale-110 shadow-xl border border-[#C5A880]/20 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center"
              >
                <Play className="w-6 h-6 fill-[#C5A880] translate-x-0.5" />
              </button>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
                <div className="space-y-1">
                  <span className="text-[0.62rem] font-mono text-[#C5A880] tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedFilm.location}
                  </span>
                  <h2 className={`text-2xl font-light tracking-tight font-serif`}>
                    {selectedFilm.title}
                  </h2>
                  <p className="text-xs text-zinc-200 font-semibold font-sans">
                     Featuring {selectedFilm.couple} / Commission Archive
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-zinc-950/60 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl">
                  <Film className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[0.58rem] font-mono tracking-widest text-zinc-100 font-semibold">
                    ANALOG KODAK SUPER 8 HIGHLIGHT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Music Soundscape controller (4 columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className={`p-8 border rounded-3xl ${
              config.themeMode === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
            } space-y-6 h-full flex flex-col justify-between`}>
              <div className="space-y-3">
                <span className="text-[0.6rem] font-mono text-[#C5A880] tracking-[0.3em] uppercase block">
                  ASTRONOMY AUDIO COGNITION
                </span>
                <h3 className={`text-xl font-light tracking-tight ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                  Select Atmospheric Mood
                </h3>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans font-medium">
                  We license bespoke instrumental compositions for each film. Toggle the preset soundscapes to experience different atmospheric editing curves.
                </p>
              </div>

              {/* Soundscape Options list */}
              <div className="space-y-3 pt-4">
                {soundscapes.map((track, idx) => {
                  const isActive = activeSoundtrackIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveSoundtrackIndex(idx)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isActive
                          ? 'border-[#C5A880] bg-[#C5A880]/5'
                          : 'border-white/10 hover:border-[#C5A880]/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className={`text-xs block font-sans font-medium ${isActive ? 'text-[#C5A880]' : 'text-zinc-200'}`}>
                          {track.name}
                        </span>
                        <span className="text-[0.58rem] text-zinc-300 font-mono block font-medium">
                          {track.genre} &middot; {track.bpm}
                        </span>
                      </div>
                      <span className={`p-2 rounded-lg border shrink-0 ${isActive ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880] animate-pulse' : 'border-white/10 text-zinc-300'}`}>
                        <Music className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
                <div className="flex justify-between items-center text-[0.6rem] font-mono tracking-widest text-zinc-700 dark:text-zinc-300 uppercase font-semibold">
                  <span>Selected Mood:</span>
                  <span className="text-[#C5A880]">{soundscapes[activeSoundtrackIndex].bpm} preset</span>
                </div>
                <p className="text-[0.65rem] text-zinc-805 dark:text-zinc-200 mt-2 leading-relaxed font-medium">
                  {soundscapes[activeSoundtrackIndex].vibe}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Cinematic list grid */}
        <div className="space-y-8">
          <h3 className={`text-2xl font-light tracking-tight pb-2 border-b border-white/10 text-white ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
            Cinematography Commissions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {films.map((film, index) => {
              const isCurrent = selectedFilm.id === film.id;
              return (
                <div
                  key={film.id}
                  onClick={() => {
                    setSelectedFilm(film);
                    setIsPlaying(false);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  className={`cursor-pointer group relative border p-4 rounded-2xl transition-all duration-300 ${
                    isCurrent
                      ? 'border-[#C5A880] bg-[#C5A880]/5'
                      : 'border-white/10 hover:border-[#C5A880]/20'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl relative shadow-xs bg-zinc-950 mb-4">
                    <img
                      src={film.thumbnail}
                      alt={film.title}
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-[800ms] grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-zinc-950 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 fill-zinc-950 text-zinc-950" />
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[0.58rem] font-mono tracking-widest text-[#C5A880] uppercase">
                      {film.location.toUpperCase()}
                    </span>
                    <h4 className="text-sm font-semibold tracking-tight text-white">
                      {film.title}
                    </h4>
                    <p className="text-[0.65rem] text-zinc-300 font-sans font-medium tracking-wide">
                      Couple: {film.couple} &middot; Art Cut
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
