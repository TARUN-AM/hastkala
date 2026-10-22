import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, X, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';
import { GUIDE_CATEGORIES, GUIDE_ARTICLES, GuideArticle } from '../lib/user-guide-data';
import { Link } from '../lib/router';

export const UserGuidePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<GuideArticle | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return GUIDE_ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleFeedback = (val: 'yes' | 'no') => {
    setFeedback(val);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-[#29251F] mb-4">How to Use Hastkala</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">Discover handmade treasures, learn about India's craft traditions, and connect with the artisans behind every creation. This guide will help you make the most of Hastkala.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E8D9C5] rounded px-9 py-2.5 text-xs text-[#29251F] focus:border-[#8A4935] outline-hidden"
            />
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => { setSelectedCategory(null); setActiveArticle(null); }}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded ${!selectedCategory ? 'bg-[#F4ECE2] text-[#8A4935]' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              All Topics
            </button>
            {GUIDE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setActiveArticle(null); }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded ${selectedCategory === cat ? 'bg-[#F4ECE2] text-[#8A4935]' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3 min-h-[500px]">
          {activeArticle ? (
            <div className="bg-white p-8 rounded-lg border border-[#E8D9C5]">
              <button onClick={() => setActiveArticle(null)} className="text-xs text-[#8A4935] font-semibold mb-4 flex items-center gap-1">← Back to {activeArticle.category}</button>
              <h2 className="font-serif text-2xl font-bold text-[#29251F] mb-4">{activeArticle.title}</h2>
              <p className="text-stone-700 leading-relaxed text-sm mb-8">{activeArticle.content}</p>
              
              <div className="border-t border-[#E8D9C5] pt-6 mt-6">
                <p className="text-xs font-semibold text-stone-600 mb-3">Was this guide helpful?</p>
                {feedback ? (
                  <p className="text-xs text-emerald-700 font-medium">Thank you for your feedback!</p>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => handleFeedback('yes')} className="p-2 border border-[#E8D9C5] rounded hover:bg-emerald-50"><ThumbsUp className="w-4 h-4 text-emerald-700" /></button>
                    <button onClick={() => handleFeedback('no')} className="p-2 border border-[#E8D9C5] rounded hover:bg-rose-50"><ThumbsDown className="w-4 h-4 text-rose-700" /></button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArticles.length > 0 ? filteredArticles.map(article => (
                <button
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="bg-white p-6 rounded-lg border border-[#E8D9C5] hover:border-[#8A4935] text-left transition-all group"
                >
                  <BookOpen className="w-5 h-5 text-[#8A4935] mb-3" />
                  <h3 className="font-semibold text-stone-900 group-hover:text-[#8A4935]">{article.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{article.category}</p>
                </button>
              )) : (
                <div className="col-span-2 text-center py-12 text-stone-500 text-sm">No articles found. Try a different search term.</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
