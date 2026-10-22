import React, { useState, useMemo } from 'react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { StoryCategory } from '../types/database';
import { Calendar, User } from 'lucide-react';

type FilterOption = 'All Stories' | StoryCategory;

export const CraftStoriesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('All Stories');

  const allStories = useMemo(() => {
    return db.getStories();
  }, []);

  const filteredStories = useMemo(() => {
    if (selectedFilter === 'All Stories') {
      return allStories;
    }
    return allStories.filter((s) => s.category === selectedFilter);
  }, [allStories, selectedFilter]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7] flex flex-col font-sans">
      {/* CATEGORY FILTERS & MAIN STORY LISTING SECTION (Warm Cream #F7F1E7) */}
      <main className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 flex-1 flex flex-col space-y-8">
        {/* Category Filter Pills (Near top-left of content container) */}
        <nav
          aria-label="Story categories"
          className="flex flex-wrap items-center gap-3 sm:gap-3.5"
        >
          {(['All Stories', 'Craft Heritage', 'Artisan Stories'] as FilterOption[]).map((tab) => {
            const isSelected = selectedFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#8D1D32] ${
                  isSelected
                    ? 'bg-[#8D1D32] text-white shadow-xs'
                    : 'bg-[#EEE5D8] hover:bg-[#E5DAD2] text-[#3B2C24]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* 3-Column Story Cards Grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-20 bg-white/80 rounded-2xl border border-[#EADFCB] max-w-xl mx-auto p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-[#2A2118] mb-2">No Stories Found</h3>
            <p className="text-stone-600 text-sm mb-6">
              There are currently no articles in this category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedFilter('All Stories')}
              className="px-6 py-2.5 bg-[#8D1D32] text-white text-xs font-semibold rounded-full hover:bg-[#721526] transition-colors"
            >
              View All Stories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="group flex flex-col space-y-4"
              >
                {/* Story Image Card (4:3 Aspect Ratio with 28-32px Rounded Corners) */}
                <Link
                  to={`/craft-stories/${story.slug}`}
                  className="block relative aspect-4/3 w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#EAE0D2] shadow-xs group-hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={story.cover_image}
                    alt={story.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Article Info Panel beneath image (White Card Body) */}
                <div className="bg-white rounded-[24px] p-6 shadow-2xs border border-[#EADBCA]/60 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    {/* Category Label in Burgundy */}
                    <span className="text-[#8D1D32] text-xs font-bold uppercase tracking-wider block">
                      {story.category}
                    </span>

                    {/* Story Title */}
                    <Link to={`/craft-stories/${story.slug}`} className="block">
                      <h2 className="font-serif text-xl sm:text-[22px] font-bold text-[#2A2118] group-hover:text-[#8D1D32] transition-colors duration-200 leading-snug line-clamp-2">
                        {story.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Card Footer: Author & Date */}
                  <div className="pt-3.5 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#F4ECE2] text-[#8D1D32] flex items-center justify-center font-bold text-[10px] border border-[#E8D9C5]">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-[#2A2118] text-xs">
                        {story.author_name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{formatDate(story.published_at)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
