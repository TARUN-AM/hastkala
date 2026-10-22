import React, { useState, useMemo } from 'react';
import { ArrowLeft, Shield, MapPin, Award, CheckCircle2, Sparkles, Hammer, Info } from 'lucide-react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { Product } from '../types/database';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

interface ArtisanProfilePageProps {
  slug: string;
}

export const ArtisanProfilePage: React.FC<ArtisanProfilePageProps> = ({ slug }) => {
  const artisan = db.getArtisanBySlug(slug);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Retrieve products published by this artisan
  const { products } = useMemo(() => {
    if (!artisan) return { products: [], total: 0 };
    return db.getProducts({ artisanId: artisan.id, limit: 50 });
  }, [artisan]);

  // Compute completed orders for this artisan
  const completedOrdersCount = useMemo(() => {
    if (!artisan) return 0;
    if (typeof artisan.completed_orders_count === 'number') {
      return artisan.completed_orders_count;
    }
    const artisanOrders = db.getOrdersForArtisan(artisan.id);
    const count = artisanOrders.filter(
      ({ order }) => order.order_status === 'delivered' || order.order_status === 'shipped'
    ).length;
    return count;
  }, [artisan]);

  if (!artisan) {
    return (
      <div className="bg-[#FAF7F2] min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-2xl border border-[#E8DFD3] p-10 max-w-md w-full text-center shadow-xs">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-3">
            Artisan Studio Not Found
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mb-6 leading-relaxed">
            We could not find an artisan profile for "{slug}". The artisan may have relocated or updated their studio handle.
          </p>
          <Link
            to="/artisans"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7E1726] text-white text-xs font-semibold rounded-full hover:bg-[#67121F] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Artisans Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const isVerified =
    artisan.verification_status === 'guild_verified' ||
    artisan.verification_status === 'admin_verified';

  // Format verified date & joined date
  const verifiedDate =
    artisan.verified_at ||
    (artisan.created_at ? artisan.created_at.slice(0, 10) : '2026-05-17');

  const joinedDate = artisan.created_at
    ? artisan.created_at.slice(0, 10)
    : '2026-05-17';

  const locationSubtitle = artisan.city && artisan.region
    ? `${artisan.craft_specialty} • ${artisan.region}`
    : `${artisan.craft_specialty} • ${artisan.region}`;

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      
      {/* A. ARTISAN HERO BANNER (Matches Reference Screenshot 2) */}
      <section
        className="w-full relative text-white overflow-hidden"
        style={{
          background: 'linear-gradient(100deg, #8E656B 0%, #835B61 35%, #764F56 70%, #68434A 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          
          {/* Back to Directory Link */}
          <div className="mb-6">
            <Link
              to="/artisans"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Artisans Directory</span>
            </Link>
          </div>

          {/* Artisan Header Composition */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 text-center sm:text-left">
            {/* Circular Artisan Portrait */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-3 border-white/95 shadow-md flex-shrink-0 bg-stone-200">
              <img
                src={artisan.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
                alt={artisan.business_name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Typography Details */}
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {artisan.business_name}
              </h1>

              <div className="text-sm sm:text-base text-stone-200 font-medium">
                {locationSubtitle}
              </div>

              {/* Verified Badge with Golden Shield Outline & Date */}
              {isVerified && (
                <div className="pt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm text-[#F3C068] font-normal">
                  <Shield className="w-4 h-4 text-[#F3C068] fill-none stroke-[1.75]" />
                  <span>Verified Artisan since {verifiedDate}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* B. STATISTICS STRIP (Matches Reference Screenshot 2) */}
      <section className="w-full bg-[#F4ECE1] border-b border-[#EADDC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            {/* Stat 1: Products */}
            <div className="flex flex-col items-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                {products.length}
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                Products
              </div>
            </div>

            {/* Stat 2: Orders Completed */}
            <div className="flex flex-col items-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                {completedOrdersCount}
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                Orders Completed
              </div>
            </div>

            {/* Stat 3: Rating */}
            <div className="flex flex-col items-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                {artisan.rating ?? 'New'}
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                Rating
              </div>
            </div>

            {/* Stat 4: On Hastkala Since */}
            <div className="flex flex-col items-center">
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                {joinedDate}
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                On Hastkala Since
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* C, D, E. MAIN BODY CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* C. ABOUT THE ARTISAN */}
        <section className="max-w-3xl">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-3">
            About {artisan.business_name}
          </h2>
          
          <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-3">
            <p>
              Artisan specializing in {artisan.craft_specialty}
              {artisan.years_of_experience ? ` with ${artisan.years_of_experience} years of experience` : ''}.
            </p>
            {artisan.bio && artisan.bio !== `Artisan specializing in ${artisan.craft_specialty} with ${artisan.years_of_experience} years of experience.` && (
              <p>{artisan.bio}</p>
            )}
            {artisan.story && (
              <p className="text-stone-600 italic border-l-2 border-[#7E1726]/40 pl-4 py-0.5">
                "{artisan.story}"
              </p>
            )}
          </div>
        </section>

        {/* D. CRAFTS AND SPECIALTIES (Where Supported by Data) */}
        {(artisan.materials?.length || artisan.techniques?.length || artisan.cultural_context || artisan.workshop_location) && (
          <section className="bg-white/80 rounded-2xl border border-[#E8DFD3] p-6 sm:p-8 space-y-6 max-w-4xl">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Craft Tradition & Workshop Lineage
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* Primary Discipline & Workshop */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7E1726] block mb-1">
                    Craft Discipline
                  </span>
                  <p className="text-[#1C1917] font-medium">{artisan.craft_specialty}</p>
                </div>

                {artisan.workshop_location && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                      Workshop Location
                    </span>
                    <p className="text-[#1C1917] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#7E1726]" />
                      <span>{artisan.workshop_location}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Materials & Techniques */}
              <div className="space-y-4">
                {artisan.materials && artisan.materials.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">
                      Raw Materials
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {artisan.materials.map((mat, i) => (
                        <span
                          key={i}
                          className="bg-[#FAF7F2] text-stone-700 border border-[#E4D8C8] px-2.5 py-1 rounded-full text-xs font-medium"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {artisan.techniques && artisan.techniques.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">
                      Heritage Techniques
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {artisan.techniques.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[#FAF7F2] text-stone-700 border border-[#E4D8C8] px-2.5 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cultural Context */}
            {artisan.cultural_context && (
              <div className="pt-4 border-t border-[#E8DFD3]/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                  Cultural Context
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {artisan.cultural_context}
                </p>
              </div>
            )}
          </section>
        )}

        {/* E. PRODUCTS BY THIS ARTISAN */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              Products by {artisan.business_name}
            </h2>
            <span className="text-xs text-stone-500 font-medium">
              {products.length} {products.length === 1 ? 'Piece' : 'Pieces'} available
            </span>
          </div>

          {products.length === 0 ? (
            <div className="bg-white/90 rounded-2xl border border-[#E8DFD3] p-12 text-center max-w-lg mx-auto shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">
                No Public Listings Currently
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm mb-6 leading-relaxed">
                {artisan.business_name} is currently crafting new pieces in the workshop. Check back soon or explore other artisans.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#7E1726] text-white text-xs font-semibold rounded-full hover:bg-[#67121F] transition-colors"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
