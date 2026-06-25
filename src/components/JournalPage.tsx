import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, MapPin, ArrowLeft, Heart, Share2, CornerDownRight } from 'lucide-react';
import { ThemeConfig } from '../types';

interface JournalPageProps {
  config: ThemeConfig;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  category: 'Weddings' | 'Editorials' | 'Cinematography' | 'Tutorials';
  excerpt: string;
  readTime: string;
  coverImage: string;
  paragraphs: string[];
  gallery: string[];
}

export default function JournalPage({ config }: JournalPageProps) {
  const posts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'A Parisian Autumn Romance: Clara & Julian at Villa Ephrussi',
      slug: 'parisian-autumn-romance-clara-julian',
      date: 'October 14, 2025',
      location: 'PARIS, FRANCE',
      category: 'Weddings',
      excerpt: 'Stunning editorial frames capturing natural light, custom couture, and high-fashion romance in the gardens of Southern France.',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      paragraphs: [
        'There is something deeply poetic about Paris in the autumn. The gold-hued light dancing along limestone arches, the faint scent of rain, and an unspoken stillness in the air. For Clara and Julian, Paris was not just a destination; it was the scenery of their childhood dreams.',
        'We started the day at dawn on the balconies overlooking the Seine. The soft lavender clouds provided a pristine, painting-like backdrop for Clara’s custom Elie Saab silk gown. Choosing to shoot in both digital medium format and classic black-and-white cinematic film allowed us to register the luxurious texture of raw textiles and emotional weight with absolute fidelity.',
        'The intimate ceremony took place in the grand gardens of Villa Ephrussi. Backed by delicate strings and twenty of their closest companions, they exchanged handwritten vows. Every frame in this gallery represents our signature commitment: where editorial styling marries candid romance.',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1519225495810-7517c52086e3?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'post-2',
      title: 'Monochrome Stillness: The Coastal Minimalist Elopement in Big Sur',
      slug: 'monochrome-stillness-big-sur-elopement',
      date: 'September 2, 2025',
      location: 'BIG SUR, CALIFORNIA',
      category: 'Editorials',
      excerpt: 'A raw exploration of wind, high-contrast cliffs, and authentic intimacy. Capturing the beautiful landscape with cinematic Super 8 clips.',
      readTime: '3 min read',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
      paragraphs: [
        'Big Sur commands absolute humility. The towering redwoods meeting the roaring Pacific cliffs create a visual symphony that requires very little extra decoration. This editorial captures a quiet celebration where wind-whipped linen and genuine smiles are the only elements that mattered.',
        'Utilizing vintage Hasselblad lenses, we shot primarily on medium format monochrome film to strip away distractions and let raw textures outline the frame. The sheer contrast between Julianne’s minimalistic slip gown and the high-density mist of the ocean gave each image a dramatic, painterly feel.',
        'The outcome is a timeless collection of quiet moments. No timelines, no artificial light setups, just genuine documentative journalism at its purest core.'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1481653191314-5766253ee04d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'post-3',
      title: 'Tuscan Light Mastery: Framing Love Amidst Century-Old Olives',
      slug: 'tuscan-light-mastery-italy-wedding',
      date: 'August 18, 2025',
      location: 'SIENA, ITALY',
      category: 'Weddings',
      excerpt: 'Step behind our lenses to see how we managed extreme midday sun inside Siena’s rustic brick courtyard to create iconic, historical shots.',
      readTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
      paragraphs: [
        'Weddings in Italy carry an innate warmth that is instantly recognizable. Under the golden Siena sun, Sophia and Mateo merged their lives inside a family olive orchard overlooking the rolling Tuscan valleys.',
        'The midday Italian sun poses a notorious challenge for photographers. To master this, we leveraged architectural shadow play and ambient bounce to soften skin tones while preserving the gorgeous high-contrast gold of the landscape.',
        'During the golden hour, we walked into the cypress alleys. Working only with natural flares and gentle movement directives,Sophia and Mateo melted into the scenery. This feature walks through our top technical takeaways for digital creators shot out on location.'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1510076894073-1fcf3eefd6b6?auto=format&fit=crop&q=80&w=600'
      ]
    }
  ];

  // Active view states
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => {
      const currentVal = !!prev[id];
      setLikes(likesPrev => ({
        ...likesPrev,
        [id]: (likesPrev[id] || 0) + (currentVal ? -1 : 1)
      }));
      return {
        ...prev,
        [id]: !currentVal
      };
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            // Blog list view
            <motion.div
              key="blog-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Title Block */}
              <div className="pb-8 border-b border-white/10">
                <div className="space-y-3 max-w-3xl">
                  <h1 className={`text-4xl md:text-5xl font-light tracking-tight text-white ${config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'}`}>
                    Stories beautifully <span className="italic font-serif text-[#E5C158]">recorded</span>.
                  </h1>
                  <p className="text-xs text-zinc-300 uppercase tracking-widest font-sans">
                    A behind-the-scenes anthology of fine-art celebrations, travel notes, and light study.
                  </p>
                </div>
              </div>

              {/* Tabs list for categories */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                {['All', 'Weddings', 'Editorials', 'Cinematography'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-[0.65rem] tracking-[0.25em] font-sans font-medium uppercase border transition-all duration-300 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#E5C158] text-[#0A1931] border-[#E5C158]'
                        : 'border-white/10 hover:border-[#E5C158]/40 text-zinc-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid Layout of blogs */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                  No post matches your criteria. Clear search or try another folder.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {filteredPosts.map((post, idx) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.8 }}
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo({ top: 0 });
                      }}
                      className="cursor-pointer group space-y-6"
                    >
                      {/* Image container with elegant zooming scale */}
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl relative shadow-md bg-zinc-900 border border-zinc-200/10">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms] ease-out grayscale group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-xs text-white text-[0.55rem] font-mono tracking-[0.25em] uppercase px-3 py-1.5 rounded-md">
                          {post.category}
                        </div>
                      </div>

                      {/* Article summary details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-6 text-[0.62rem] font-mono text-zinc-400">
                          <span className="flex items-center gap-1.5 uppercase">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5 uppercase">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            {post.location}
                          </span>
                        </div>

                        <h2 className={`text-xl md:text-2xl font-light tracking-tight group-hover:text-amber-500 transition-colors duration-300 ${
                          config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
                        }`}>
                          {post.title}
                        </h2>

                        <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 pr-6">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-[0.62rem] font-mono text-amber-500 tracking-[0.3em] uppercase inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                            READ THE JOURNAL
                            <CornerDownRight className="w-3 h-3" />
                          </span>

                          <div className="flex items-center gap-4 text-zinc-400">
                            <button
                              id={`journal-like-btn-${post.id}`}
                              onClick={(e) => handleLike(post.id, e)}
                              className="hover:text-amber-500 flex items-center gap-1 text-[0.62rem] font-mono"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked[post.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                              {(likes[post.id] || 0) + 12}
                            </button>
                            <span className="text-[0.62rem] font-mono">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            // Single blog post full view
            <motion.div
              key="blog-single"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12 max-w-4xl mx-auto"
            >
              {/* Back CTA Button */}
              <button
                id="blog-back-btn"
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2.5 text-zinc-600 dark:text-zinc-300 font-sans text-xs tracking-[0.25em] uppercase hover:text-amber-500 cursor-pointer pt-4 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </button>

              {/* Big Cover Image Header */}
              <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden relative shadow-xl bg-zinc-900 border border-zinc-200/10">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 to-transparent" />
                <div className="absolute bottom-8 left-8 md:left-12">
                  <span className="text-[0.55rem] font-mono text-amber-500 tracking-[0.35em] uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    {selectedPost.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Post Metadata Overview */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5 uppercase">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5 uppercase">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    {selectedPost.location}
                  </span>
                  <span className="text-zinc-500">|</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h1 className={`text-3xl md:text-5xl font-light tracking-tight leading-tight ${
                  config.fontPreset === 'modern-mono' ? 'font-mono' : 'font-serif'
                }`}>
                  {selectedPost.title}
                </h1>
              </div>

              {/* Article Paragraph content block */}
              <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-200 space-y-8 leading-relaxed tracking-wide text-sm font-light">
                {selectedPost.paragraphs.map((p, index) => (
                  <p key={index} className="first-letter:text-4xl first-letter:font-serif first-letter:text-amber-500 first-letter:mr-1 first-letter:float-left first-letter:font-bold">
                    {index === 0 ? p : p}
                  </p>
                ))}
              </div>

              {/* Split Photo Grid representing real wedding shoots */}
              <div className="space-y-4">
                <span className="text-[0.62rem] font-mono text-amber-500 block tracking-[0.4em] uppercase">
                  CAPTURED CHROMATIC FRAMES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {selectedPost.gallery.map((img, index) => (
                    <div key={index} className="aspect-[4/5] rounded-xl overflow-hidden shadow-xs hover:scale-[1.02] transition-transform duration-500 bg-zinc-900 border border-zinc-200/10">
                      <img
                        src={img}
                        alt={`Ceremony highlight shot ${index}`}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Footer details */}
              <div className="flex justify-between items-center pt-8 border-t border-zinc-100 dark:border-zinc-900">
                <div className="flex gap-4">
                  <button
                    id="post-share-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Story link copied to your clipboard!');
                    }}
                    className="p-3 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 rounded-full transition-colors flex items-center justify-center cursor-pointer text-zinc-500 hover:text-amber-500"
                    title="Share story"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    id="post-like-action-btn"
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className={`px-5 py-3 border rounded-full transition-colors flex items-center gap-2 cursor-pointer text-xs font-mono tracking-widest uppercase ${
                      isLiked[selectedPost.id]
                        ? 'border-rose-500 bg-rose-500/5 text-rose-500'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-amber-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked[selectedPost.id] ? 'fill-rose-500' : ''}`} />
                    Like Story
                  </button>
                </div>

                <button
                  id="post-contact-redirect"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-mono text-amber-500 tracking-widest uppercase hover:underline"
                >
                  Return to all files
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
