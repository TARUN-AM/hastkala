import React, { useMemo, useState, useEffect } from 'react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, ShieldCheck, User, Check, BookOpen, Layers, Sparkles, MapPin } from 'lucide-react';

interface StoryDetailPageProps {
  slug: string;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({ slug }) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const story = useMemo(() => {
    return db.getStoryBySlug(slug);
  }, [slug]);

  const relatedStories = useMemo(() => {
    if (!story) return [];
    return db.getRelatedStories(story.slug, 3);
  }, [story]);

  const artisan = useMemo(() => {
    if (!story?.artisan_slug) return null;
    return db.getArtisanBySlug(story.artisan_slug);
  }, [story]);

  // Scroll reading progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!story) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F7F1E7] px-4 py-16">
        <div className="max-w-md w-full text-center space-y-4 p-8 bg-white rounded-2xl border border-[#E8D9C5] shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#2A2118]">Story Not Found</h2>
          <p className="text-stone-600 text-sm">
            The craft story you are looking for may have been moved or updated.
          </p>
          <Link
            to="/craft-stories"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8D1D32] text-white text-xs font-semibold rounded-full hover:bg-[#721526] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Craft Stories</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const sections = story.content?.sections || [];

  return (
    <article className="min-h-screen bg-[#F7F1E7] text-[#2A2118] font-sans relative">
      {/* 1. TOP STICKY READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#EAE0D2] z-50">
        <div
          className="h-full bg-[#8D1D32] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. BREADCRUMBS & NAVIGATION HEADER */}
      <div className="border-b border-[#E8D9C5]/80 bg-[#FFFDF9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-stone-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#8D1D32] transition-colors">
              Home
            </Link>
            <span className="text-stone-300">/</span>
            <Link to="/craft-stories" className="hover:text-[#8D1D32] transition-colors">
              Craft Stories
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-[#8D1D32] font-semibold truncate max-w-[180px] sm:max-w-xs">
              {story.title}
            </span>
          </nav>

          <Link
            to="/craft-stories"
            className="inline-flex items-center gap-1.5 text-[#8D1D32] hover:text-[#6F1426] font-semibold text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories</span>
          </Link>
        </div>
      </div>

      {/* 3. EDITORIAL ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 text-center space-y-6">
        {/* Category & Read Time Tags */}
        <div className="flex items-center justify-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-[#8D1D32] text-white text-[11px] font-bold tracking-widest uppercase shadow-2xs">
            {story.category}
          </span>
          <span className="text-stone-400 text-xs">•</span>
          <span className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#8D1D32]" />
            <span>{story.read_time_minutes} min read</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2118] leading-[1.18] tracking-tight max-w-3xl mx-auto">
          {story.title}
        </h1>

        {/* Subtitle / Excerpt Intro */}
        {story.subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto">
            {story.subtitle}
          </p>
        )}

        {/* Author Byline, Date & Share Action */}
        <div className="pt-4 border-t border-[#E5DAD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EAE0D2] text-[#8D1D32] flex items-center justify-center font-bold text-xs border border-[#DCD0C0]">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-bold text-[#2A2118] block text-sm">{story.author_name}</span>
              <span className="text-[11px] text-stone-500">{story.author_role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-stone-500 text-xs">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{formatDate(story.published_at)}</span>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DAD0] hover:bg-[#F4ECE2] text-[#2A2118] text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 4. HERO WIDE PHOTOGRAPH */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="aspect-16/9 sm:aspect-21/9 rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E8D9C5] shadow-sm bg-[#EAE0D2]">
          <img
            src={story.cover_image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
        {story.region && (
          <p className="text-center text-[11px] text-stone-500 mt-3 flex items-center justify-center gap-1 italic">
            <MapPin className="w-3 h-3 text-[#8D1D32]" />
            <span>Documented on location in {story.region}</span>
          </p>
        )}
      </div>

      {/* 5. MAIN ARTICLE CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        {/* Lead Paragraph */}
        {story.content?.leadParagraph && (
          <div className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-[#E8D9C5] shadow-2xs space-y-2">
            <p className="text-lg sm:text-xl font-serif text-[#2A2118] leading-relaxed font-normal">
              {story.content.leadParagraph}
            </p>
          </div>
        )}

        {/* Table of Contents if multiple sections */}
        {sections.length > 1 && (
          <div className="p-6 bg-white rounded-2xl border border-[#EADFCB] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8D1D32]">
              <BookOpen className="w-4 h-4" />
              <span>In This Story</span>
            </div>
            <ul className="space-y-2 text-sm text-stone-700">
              {sections.map((sec, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="hover:text-[#8D1D32] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8D1D32]" />
                    <span className="font-medium">{sec.heading}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Narrative Sections */}
        {sections.map((section, idx) => (
          <section
            key={idx}
            id={`section-${idx}`}
            className="space-y-4 pt-4 scroll-mt-20"
          >
            <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[#2A2118] leading-snug">
              {section.heading}
            </h2>
            <div className="text-stone-700 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line space-y-3">
              {section.body}
            </div>

            {/* Pull Quote */}
            {section.quote && (
              <blockquote className="my-6 p-6 bg-white rounded-2xl border-l-4 border-[#8D1D32] shadow-2xs space-y-2">
                <p className="font-serif text-lg sm:text-xl text-[#2A2118] italic leading-snug">
                  “{section.quote}”
                </p>
                {section.quoteAuthor && (
                  <cite className="block text-xs uppercase tracking-widest font-bold text-[#8D1D32] not-italic">
                    — {section.quoteAuthor}
                  </cite>
                )}
              </blockquote>
            )}

            {/* Section Image */}
            {section.image && (
              <figure className="my-6 rounded-2xl overflow-hidden border border-[#E8D9C5] bg-[#EAE0D2]">
                <img
                  src={section.image}
                  alt={section.imageCaption || section.heading}
                  className="w-full h-auto object-cover max-h-[440px]"
                />
                {section.imageCaption && (
                  <figcaption className="p-3 text-xs text-stone-500 bg-white border-t border-[#E8D9C5] text-center italic">
                    {section.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </section>
        ))}

        {/* Provenance Verification Box */}
        {story.content?.provenanceNote && (
          <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E8D9C5] shadow-2xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EBF0EC] text-[#2D5A37] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#D1E0D4]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A37] block">
                Hastkala Verified Provenance
              </span>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                {story.content.provenanceNote}
              </p>
            </div>
          </div>
        )}

        {/* Featured Master Artisan Card */}
        {artisan && (
          <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-white border border-[#EADFCB] shadow-2xs flex flex-col sm:flex-row items-center gap-5 justify-between">
            <div className="flex items-center gap-4">
              <img
                src={artisan.avatar_url}
                alt={artisan.business_name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#F7F1E7] shadow-xs"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D1D32] block mb-0.5">
                  Featured Master Artisan
                </span>
                <h4 className="font-serif text-xl font-bold text-[#2A2118]">
                  {artisan.business_name}
                </h4>
                <p className="text-xs text-stone-500">{artisan.region}, {artisan.country}</p>
              </div>
            </div>
            <Link
              to={`/artisans/${artisan.slug}`}
              className="px-6 py-2.5 bg-[#8D1D32] text-white text-xs font-semibold rounded-full hover:bg-[#721526] transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs"
            >
              <span>Visit Artisan Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 6. RELATED STORIES SECTION */}
      {relatedStories.length > 0 && (
        <section className="border-t border-[#E5DAD0] bg-[#EAE0D2]/40 py-14 px-6 sm:px-10 lg:px-14">
          <div className="max-w-[1440px] mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#8D1D32] block">
                  Continue Reading
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A2118]">
                  Related Craft Stories
                </h3>
              </div>
              <Link
                to="/craft-stories"
                className="text-xs font-semibold uppercase tracking-wider text-[#8D1D32] hover:text-[#6F1426] flex items-center gap-1"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {relatedStories.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col space-y-3"
                >
                  <Link
                    to={`/craft-stories/${rel.slug}`}
                    className="block aspect-4/3 w-full rounded-[24px] overflow-hidden bg-[#EAE0D2] shadow-2xs"
                  >
                    <img
                      src={rel.cover_image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="bg-white rounded-2xl p-5 border border-[#EADBCA]/60 flex flex-col justify-between flex-1 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D1D32] block">
                      {rel.category}
                    </span>
                    <Link to={`/craft-stories/${rel.slug}`}>
                      <h4 className="font-serif font-bold text-base text-[#2A2118] group-hover:text-[#8D1D32] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-stone-600 line-clamp-2 font-light">{rel.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
