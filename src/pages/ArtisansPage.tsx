import React, { useState, useMemo } from 'react';
import { Search, MapPin, X, Sparkles, Filter } from 'lucide-react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { ArtisanProfile } from '../types/database';

export const ArtisansPage: React.FC = () => {
  const allArtisans = useMemo(() => db.getArtisans(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCraft, setSelectedCraft] = useState<string>('All');

  // Extract unique regions and crafts for filter dropdowns/pills
  const regions = useMemo(() => {
    const set = new Set<string>();
    allArtisans.forEach((a) => {
      if (a.region) {
        // e.g. "Rajasthan", "Andhra Pradesh", "Karnataka", "Tamil Nadu"
        const clean = a.region.split(',').pop()?.trim() || a.region.trim();
        set.add(clean);
      }
    });
    return ['All', ...Array.from(set)];
  }, [allArtisans]);

  const craftCategories = useMemo(() => {
    const set = new Set<string>();
    allArtisans.forEach((a) => {
      if (a.craft_specialty) {
        set.add(a.craft_specialty);
      }
    });
    return ['All', ...Array.from(set)];
  }, [allArtisans]);

  // Filtered artisans
  const filteredArtisans = useMemo(() => {
    return allArtisans.filter((artisan) => {
      // Search query (name, craft, location, bio)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = artisan.business_name.toLowerCase().includes(q);
        const matchesCraft = artisan.craft_specialty.toLowerCase().includes(q);
        const matchesLocation = `${artisan.city || ''} ${artisan.region} ${artisan.workshop_location || ''}`
          .toLowerCase()
          .includes(q);
        const matchesBio = (artisan.bio || '').toLowerCase().includes(q);

        if (!matchesName && !matchesCraft && !matchesLocation && !matchesBio) {
          return false;
        }
      }

      // Region filter
      if (selectedRegion !== 'All') {
        const matchesRegion = artisan.region.toLowerCase().includes(selectedRegion.toLowerCase());
        if (!matchesRegion) return false;
      }

      // Craft filter
      if (selectedCraft !== 'All') {
        if (artisan.craft_specialty !== selectedCraft) return false;
      }

      return true;
    });
  }, [allArtisans, searchQuery, selectedRegion, selectedCraft]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedRegion !== 'All' || selectedCraft !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedCraft('All');
  };

  return (
    <div className="bg-[#FBF9F4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Introductory Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2E1E15] tracking-tight mb-3">
            Our Artisans
          </h1>
          <p className="text-[#877E78] text-sm sm:text-base font-normal leading-relaxed">
            Meet the makers behind every product on Hastkala
          </p>
        </div>

        {/* Directory Search & Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#877E78] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artisans by name, craft, or city..."
                className="w-full bg-white border border-[#E6E0DB] rounded-full pl-11 pr-10 py-2.5 text-xs sm:text-sm text-[#2E1E15] placeholder-[#877E78] focus:outline-hidden focus:border-[#7E1726] focus:ring-1 focus:ring-[#7E1726]/30 transition-all shadow-2xs"
                aria-label="Search artisans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#877E78] hover:text-[#2E1E15] p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Region Dropdown Filter */}
            <div className="w-full sm:w-48">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-white border border-[#E6E0DB] rounded-full px-4 py-2.5 text-xs text-[#2E1E15] focus:outline-hidden focus:border-[#7E1726] cursor-pointer shadow-2xs"
                aria-label="Filter by region"
              >
                <option value="All">All Regions</option>
                {regions
                  .filter((r) => r !== 'All')
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>

            {/* Craft Dropdown Filter */}
            <div className="w-full sm:w-56">
              <select
                value={selectedCraft}
                onChange={(e) => setSelectedCraft(e.target.value)}
                className="w-full bg-white border border-[#E6E0DB] rounded-full px-4 py-2.5 text-xs text-[#2E1E15] focus:outline-hidden focus:border-[#7E1726] cursor-pointer shadow-2xs truncate"
                aria-label="Filter by craft discipline"
              >
                <option value="All">All Craft Disciplines</option>
                {craftCategories
                  .filter((c) => c !== 'All')
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Active Filter Indicator / Clear All */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between text-xs text-[#877E78] px-1 pt-1">
              <span>
                Showing {filteredArtisans.length} of {allArtisans.length} artisans
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[#7E1726] hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Reset all filters</span>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-[#E6E0DB] w-full mb-10" />

        {/* Empty State */}
        {filteredArtisans.length === 0 ? (
          <div className="bg-white/80 rounded-2xl border border-[#E6E0DB] p-12 text-center max-w-lg mx-auto shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#2E1E15] mb-2">No Artisans Found</h3>
            <p className="text-[#877E78] text-xs sm:text-sm leading-relaxed mb-6">
              We couldn't find any artisan profiles matching your selected criteria.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 bg-[#7E1726] text-white text-xs font-semibold rounded-full hover:bg-[#67121F] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Responsive 4-Column Artisan Grid Matching Reference Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredArtisans.map((artisan) => {
              const locationText = artisan.city && artisan.region
                ? `${artisan.city}, ${artisan.region}`
                : artisan.region;

              const isVerified =
                artisan.verification_status === 'guild_verified' ||
                artisan.verification_status === 'admin_verified';

              return (
                <Link
                  key={artisan.id}
                  to={`/artisans/${artisan.slug}`}
                  className="bg-white/95 rounded-2xl border border-[#E6E0DB] p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-200 hover:border-[#D4CDC5] hover:shadow-sm group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7E1726]"
                  aria-label={`View profile of ${artisan.business_name}, ${artisan.craft_specialty}`}
                >
                  {/* Circular Portrait Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-stone-200/90 shadow-2xs mb-4 bg-stone-100 flex-shrink-0 group-hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src={artisan.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
                      alt={artisan.business_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Artisan Name */}
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors leading-snug mb-1">
                    {artisan.business_name}
                  </h2>

                  {/* Craft Specialization (Burgundy Accent) */}
                  <div className="text-xs font-semibold text-[#7E1726] tracking-wide mb-1 line-clamp-1">
                    {artisan.craft_specialty}
                  </div>

                  {/* City & Region */}
                  <div className="text-xs text-stone-500 mb-4 line-clamp-1">
                    {locationText}
                  </div>

                  {/* Verification Badge (Only When Verified) */}
                  {isVerified && (
                    <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-stone-400 mt-auto pt-3 border-t border-stone-100/90 w-full">
                      VERIFIED ARTISAN
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
