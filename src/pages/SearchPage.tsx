import React, { useState } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import { useRouter } from '../lib/router';
import { db } from '../lib/db';
import { Product } from '../types/database';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

export const SearchPage: React.FC = () => {
  const { searchParams, setSearchParams } = useRouter();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { products, total } = db.getProducts({ query, limit: 50 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchInput.trim() });
  };

  const sampleKeywords = ['Kasuti', 'Khadi', 'Stoneware', 'Brass', 'Teak', 'Ikat', 'Auroville'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="font-serif text-3xl font-bold text-[#29251F] mb-3">Discover Crafts</h1>
        
        <form onSubmit={handleSearch} className="relative mt-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by craft, natural material, artisan or region..."
            className="w-full bg-[#FFFDF9] border-2 border-[#E8D9C5] focus:border-[#8A4935] rounded-full pl-12 pr-28 py-3 text-sm text-[#29251F] shadow-sm outline-none transition-all"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#8A4935] text-white text-xs font-semibold rounded-full hover:bg-[#753C2B] transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-stone-600">
          <span className="font-medium text-stone-500">Popular Searches:</span>
          {sampleKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setSearchInput(kw);
                setSearchParams({ q: kw });
              }}
              className="px-2.5 py-1 rounded-full bg-[#F4ECE2] hover:bg-[#E8D9C5] text-[#29251F] transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D9C5] mb-6 text-xs text-stone-600">
          <span>
            {query ? (
              <>Showing <strong>{total}</strong> creations for "<em>{query}</em>"</>
            ) : (
              'Showing all catalog pieces'
            )}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-lg p-12 text-center border border-[#E8D9C5] space-y-4">
            <p className="font-serif text-xl font-bold text-[#29251F]">
              No pieces match "{query}"
            </p>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Try searching with broader craft terms, or check spelling.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
