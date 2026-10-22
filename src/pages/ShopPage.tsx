import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RotateCcw, MapPin, Sparkles, Award, BookOpen, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { db } from '../lib/db';
import { Product } from '../types/database';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const ShopPage: React.FC = () => {
  const { searchParams, setSearchParams } = useRouter();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Read query params
  const categoryParam = searchParams.get('category') || '';
  const regionParam = searchParams.get('region') || '';
  const artisanParam = searchParams.get('artisan') || '';
  const queryParam = searchParams.get('q') || '';
  const sortParam = (searchParams.get('sort') || 'featured') as 'featured' | 'newest' | 'price_asc' | 'price_desc';
  const inStockParam = searchParams.get('inStock') === 'true';
  const minPriceParam = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;

  const categories = db.getCategories();
  const artisans = db.getArtisans();

  // Distinct regions from products
  const availableRegions = useMemo(() => {
    const { products } = db.getProducts({ limit: 100 });
    const set = new Set<string>();
    products.forEach((p) => {
      const state = p.region_of_origin.split(',').pop()?.trim() || p.region_of_origin;
      set.add(state);
    });
    return Array.from(set);
  }, []);

  // Filter products using server-side / store logic
  const { products, total } = useMemo(() => {
    return db.getProducts({
      categorySlug: categoryParam || undefined,
      region: regionParam || undefined,
      artisanId: artisanParam || undefined,
      query: queryParam || undefined,
      sort: sortParam,
      inStockOnly: inStockParam,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
      limit: 100,
    });
  }, [categoryParam, regionParam, artisanParam, queryParam, sortParam, inStockParam, minPriceParam, maxPriceParam]);

  const updateFilter = (key: string, value: string | null) => {
    const current: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      current[k] = v;
    });

    if (value === null || value === '') {
      delete current[key];
    } else {
      current[key] = value;
    }
    setSearchParams(current);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    categoryParam || regionParam || artisanParam || queryParam || inStockParam || minPriceParam || maxPriceParam
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-stone-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-[#8A4935]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#8A4935]">Shop</Link>
        {categoryParam && (
          <>
            <span>/</span>
            <span className="text-[#29251F] font-semibold capitalize">
              {categoryParam === 'tholu-bommalata' ? 'Tholu Bommalata' : categories.find((c) => c.slug === categoryParam)?.name || categoryParam}
            </span>
          </>
        )}
      </nav>

      {/* Page Header or Dedicated Collection Banner */}
      {categoryParam === 'tholu-bommalata' ? (
        <div className="bg-[#FFFDF9] border border-[#E8D9C5] rounded-2xl overflow-hidden shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image Banner */}
            <div className="lg:col-span-5 relative aspect-16/9 lg:aspect-auto bg-[#241711] overflow-hidden min-h-[220px]">
              <img
                src="/assets/categories/tholu-bommalata.jpg"
                alt="Tholu Bommalata traditional illuminated leather shadow puppet art"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#7E1726] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                GI Tagged Andhra Heritage
              </div>
            </div>

            {/* Right Editorial Info */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7E1726] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Nimmalakunta, Andhra Pradesh</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29251F]">
                  Tholu Bommalata Collection
                </h1>

                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-xl">
                  Discover Tholu Bommalata, Andhra Pradesh’s expressive leather-shadow-puppetry tradition. Explore intricate handcrafted pieces shaped by generations of storytelling, illustration, and skilled handwork.
                </p>
              </div>

              {/* Master Artisans & Story Links */}
              <div className="pt-4 border-t border-[#E8D9C5] flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-stone-600">
                  <span className="font-semibold text-[#29251F]">Nimmalakunta Guild Artisans:</span>
                  <Link to="/artisans/kanday-anjanappa" className="hover:text-[#7E1726] underline font-medium">Kanday Anjanappa</Link>
                  <span>•</span>
                  <Link to="/artisans/dalavai-kullayappa" className="hover:text-[#7E1726] underline font-medium">Dalavai Kullayappa</Link>
                  <span>•</span>
                  <Link to="/artisans/sindhe-siva" className="hover:text-[#7E1726] underline font-medium">Sindhe Siva</Link>
                </div>

                <Link
                  to="/craft-stories/tholu-bommalata-the-art-of-shadow-puppetry"
                  className="text-[#7E1726] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Craft Story →</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="border-b border-[#E8D9C5] pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A4935] block mb-1">
                Handcrafted Catalogue
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29251F]">
                {categoryParam
                  ? categories.find((c) => c.slug === categoryParam)?.name || 'The Collection'
                  : 'All Artisan Creations'}
              </h1>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                Ethically sourced pieces directly from master weavers, potters, and metalworkers.
              </p>
            </div>

            {/* Sort Controls & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E8D9C5] bg-[#FFFDF9] rounded text-xs font-semibold text-stone-800"
              >
                <Filter className="w-3.5 h-3.5 text-[#8A4935]" />
                <span>Filters {hasActiveFilters && `(Active)`}</span>
              </button>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 hidden sm:inline">Sort:</span>
                <select
                  value={sortParam}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="bg-[#FFFDF9] border border-[#E8D9C5] rounded px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#8A4935]"
                >
                  <option value="featured">Featured Curations</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs bg-[#FFFDF9] p-3 rounded-lg border border-[#E8D9C5]">
          <span className="text-stone-500 font-medium">Applied Filters:</span>
          {categoryParam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EBF0EC] text-[#34483A]">
              Category: {categoryParam === 'tholu-bommalata' ? 'Tholu Bommalata' : categoryParam}
              <button type="button" onClick={() => updateFilter('category', null)} aria-label="Remove category filter">
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {regionParam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F4ECE2] text-stone-800">
              Region: {regionParam}
              <button type="button" onClick={() => updateFilter('region', null)} aria-label="Remove region filter">
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {artisanParam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#F6ECE6] text-[#8A4935]">
              Artisan: {artisans.find((a) => a.id === artisanParam)?.business_name || 'Selected'}
              <button type="button" onClick={() => updateFilter('artisan', null)} aria-label="Remove artisan filter">
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {queryParam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-200 text-stone-800">
              Query: "{queryParam}"
              <button type="button" onClick={() => updateFilter('q', null)} aria-label="Remove query filter">
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          {inStockParam && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
              In Stock Only
              <button type="button" onClick={() => updateFilter('inStock', null)} aria-label="Remove in-stock filter">
                <X className="w-3 h-3 hover:text-black" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-[#8A4935] hover:underline font-semibold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear all
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-[#FFFDF9] rounded-lg p-5 border border-[#E8D9C5] space-y-6">
            
            {/* Keyword Search */}
            <div>
              <label htmlFor="shop-keyword-search" className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                Search Catalogue
              </label>
              <div className="relative">
                <input
                  id="shop-keyword-search"
                  type="text"
                  value={queryParam}
                  onChange={(e) => updateFilter('q', e.target.value)}
                  placeholder="e.g. kasuti, brass, bowl..."
                  className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#8A4935]"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                Disciplines
              </label>
              <div className="space-y-1 text-xs">
                <button
                  type="button"
                  onClick={() => updateFilter('category', null)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                    !categoryParam ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                  }`}
                >
                  All Disciplines
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateFilter('category', c.slug)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                      categoryParam === c.slug ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-[#E8D9C5]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                <input
                  type="checkbox"
                  checked={inStockParam}
                  onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : null)}
                  className="rounded text-[#8A4935] focus:ring-[#8A4935] border-stone-300"
                />
                <span>In Stock & Ready to Ship</span>
              </label>
            </div>

            {/* Artisan Studio Filter */}
            <div className="pt-4 border-t border-[#E8D9C5]">
              <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                Artisan Studio
              </label>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => updateFilter('artisan', null)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                    !artisanParam ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                  }`}
                >
                  All Master Artisans
                </button>
                {artisans.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => updateFilter('artisan', a.id)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                      artisanParam === a.id ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                    }`}
                  >
                    {a.business_name}
                  </button>
                ))}
              </div>
            </div>

            {/* Regional Filter */}
            <div className="pt-4 border-t border-[#E8D9C5]">
              <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                Craft Region
              </label>
              <div className="space-y-1 text-xs">
                <button
                  type="button"
                  onClick={() => updateFilter('region', null)}
                  className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                    !regionParam ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                  }`}
                >
                  All Regions
                </button>
                {availableRegions.map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => updateFilter('region', reg)}
                    className={`w-full text-left py-1.5 px-2 rounded transition-colors ${
                      regionParam === reg ? 'bg-[#F4ECE2] font-semibold text-[#8A4935]' : 'hover:bg-[#F7F0E5]'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-[#E8D9C5]">
              <label className="text-xs font-bold text-[#29251F] uppercase tracking-wider block mb-2">
                Price Range ($)
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPriceParam !== undefined ? minPriceParam : ''}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="bg-[#F7F0E5] border border-[#E8D9C5] rounded px-2.5 py-1.5 text-stone-800"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPriceParam !== undefined ? maxPriceParam : ''}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="bg-[#F7F0E5] border border-[#E8D9C5] rounded px-2.5 py-1.5 text-stone-800"
                />
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
            <span>Showing {products.length} of {total} pieces</span>
          </div>

          {products.length === 0 ? (
            <div className="bg-[#FFFDF9] rounded-lg p-12 text-center border border-[#E8D9C5] space-y-4">
              <p className="font-serif text-xl font-semibold text-[#29251F]">
                No handmade pieces match your current filters.
              </p>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Try widening your price range, clearing craft tags, or browsing by master artisan.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
