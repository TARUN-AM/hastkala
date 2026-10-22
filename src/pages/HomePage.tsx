import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Award,
  Flame,
  Layers,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { Product } from '../types/database';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { RevealSection } from '../components/common/RevealSection';

export const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const artisans = db.getArtisans();

  // Get the 8 newly added products from actual database records
  const { products: newProducts } = db.getProducts({ sort: 'newest', limit: 8 });

  // Exclude the 8 newly added products from Curator's Choice and Heritage sections to avoid duplicate product displays
  const newProductIds = new Set(newProducts.map((p) => p.id));

  const { products: allFeatured } = db.getProducts({ sort: 'featured', limit: 20 });
  const curatorChoiceProducts = allFeatured.filter((p) => !newProductIds.has(p.id)).slice(0, 4);

  const { products: allProducts } = db.getProducts({ limit: 50 });
  const heritageMasterpieceProducts = allProducts
    .filter((p) => !newProductIds.has(p.id) && !curatorChoiceProducts.some((c) => c.id === p.id))
    .slice(0, 4);

  const leadArtisan = artisans[0]; // Meera Devi Handlooms

  // 3 Short Edge-to-Edge Craft Category Panels (Reference proportions: 165-170px tall, full viewport width)
  const craftPanels = [
    {
      id: 'tholu-bommalata',
      title: 'Tholu Bommalata',
      subtitle: 'Leather Shadow Art',
      href: '/shop?q=leather',
      image: '/assets/categories/tholu-bommalata.jpg',
      alt: 'Tholu Bommalata traditional leather shadow art and illuminated puppet craft',
    },
    {
      id: 'pen-kalamkari',
      title: 'Pen Kalamkari',
      subtitle: 'Hand-painted Textiles',
      href: '/shop?q=kalamkari',
      image: '/assets/categories/pen-kalamkari.jpg',
      alt: 'Pen Kalamkari master hand-painted botanical textile art with natural dyes',
    },
    {
      id: 'udayagiri-cutlery',
      title: 'Udayagiri Cutlery',
      subtitle: 'Heritage Woodcraft',
      href: '/shop?q=woodcraft',
      image: '/assets/categories/udayagiri-cutlery.jpg',
      alt: 'Udayagiri carved wooden cutlery with delicate jaali filigree openwork',
    },
  ];

  // 4-Item Compact Ivory Benefits Strip
  const benefits = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Handmade',
      subtitle: 'Verified artisan guilds',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On orders above $150',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: '7-day return policy',
    },
    {
      icon: Award,
      title: 'Fair Trade Certified',
      subtitle: 'Artisans paid directly',
    },
  ];

  return (
    <div className="pb-16">
      
      {/* 1. CINEMATIC HERO (Heights: 65-70vh, generous padding, spacious layout preventing header clipping) */}
      <section className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[580px] flex items-center overflow-hidden bg-[#241711]">
        {/* Full-width Photograph: Heritage Textiles, Brass Bowl and Painted Ceramics */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/Heritage_Textiles_and_Painted_Ceramics_bb1b7910.png"
            alt="Handcrafted blue-and-white decorative ceramics, engraved brass bowl, and rich burgundy silk with gold zari embroidery"
            className="w-full h-full object-cover object-[25%_center] sm:object-center transition-transform duration-1000 ease-out"
            loading="eager"
          />
          {/* Carefully Balanced Dark Gradient: High contrast on text left, fading right to preserve photograph vibrancy */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1D120B]/92 via-[#1D120B]/75 via-45% to-[#1D120B]/25 lg:to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content Container (Generous vertical padding ensuring headline and buttons are completely unclipped) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl text-left space-y-4 sm:space-y-5">
            
            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-[1.16] tracking-tight drop-shadow-xs">
              Handcrafted by Artisans,<br className="hidden sm:inline" />
              <span> Delivered to Your Door</span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base text-stone-200/95 font-light leading-relaxed max-w-lg drop-shadow-2xs">
              India's finest handmade crafts — sourced directly from the artisans who make them. Fair prices, transparent sourcing, authentic craft.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary CTA: SHOP NOW → */}
              <Link
                to="/shop"
                className="px-6 py-3 bg-[#7E1726] hover:bg-[#67121F] text-white text-xs font-semibold tracking-wider uppercase rounded shadow-sm active:scale-98 transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>

              {/* Secondary CTA: MEET ARTISANS */}
              <Link
                to="/artisans"
                className="px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white text-xs font-semibold tracking-wider uppercase rounded active:scale-98 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>MEET ARTISANS</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE-PANEL CRAFT CATEGORIES (Edge-to-edge, flush below hero with no gap, height ~165-170px, no outer margins or gaps) */}
      <section className="w-full bg-[#1C140E]" aria-label="Featured Craft Categories">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0">
          {craftPanels.map((panel) => (
            <Link
              key={panel.id}
              to={panel.href}
              className="relative w-full h-[165px] lg:h-[170px] overflow-hidden group cursor-pointer flex flex-col justify-end"
            >
              {/* Full-bleed Craft Photograph with subtle hover zoom */}
              <img
                src={panel.image}
                alt={panel.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] will-change-transform"
                loading="eager"
              />

              {/* Subtle Dark Bottom Gradient for pristine text readability */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1C140E]/90 via-[#1C140E]/40 to-transparent transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Overlaid Label Content at Bottom-Left */}
              <div className="relative z-10 px-5 sm:px-6 py-4 flex flex-col justify-end">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-xs group-hover:text-stone-100 transition-colors">
                  {panel.title}
                </h3>
                <span className="text-[11px] sm:text-xs font-normal text-stone-200/90 mt-0.5 tracking-wide drop-shadow-xs">
                  {panel.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BENEFITS STRIP (Compact ivory bar immediately below craft category panels) */}
      <section className="w-full bg-[#FAF8F5] border-y border-[#E6E0DB] py-3.5 sm:py-4 px-4 sm:px-8" aria-label="Store Benefits">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#7E1726]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#7E1726]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-[#2E1E15] leading-snug truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#877E78] truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* REMAINING HOMEPAGE SECTIONS WITH REFINED SPACING */}
      <div className="space-y-16 sm:space-y-24 mt-12 sm:mt-16">
        
        {/* 4. NEW ARRIVALS — 8 RECENTLY ADDED PRODUCTS SHOWCASE */}
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#E6E0DB] pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7E1726] block mb-1">
                NEW ARRIVALS
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
                Recently Added to Hastkala
              </h2>
              <p className="text-sm text-[#877E78] max-w-xl mt-1.5 font-light">
                Discover handcrafted pieces made with care by India's independent artisans.
              </p>
            </div>
            <Link
              to="/shop?sort=newest"
              className="text-sm font-semibold text-[#7E1726] hover:underline flex items-center gap-1.5 group shrink-0"
            >
              <span>View all new arrivals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </RevealSection>

        {/* 5. CURATOR'S CHOICE (Best-Selling / Featured Handcrafted Pieces) */}
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7E1726] block mb-1">
                Curator’s Choice
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
                Handmade Pieces with Meaning
              </h2>
            </div>
            <p className="text-sm text-[#877E78] max-w-sm">
              Each creation is individually shaped by hand and carries verified provenance documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curatorChoiceProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </RevealSection>

        {/* 6. ARTISAN SPOTLIGHT SECTION (Meera Devi Handlooms) */}
        {leadArtisan && (
          <RevealSection className="bg-[#34483A] text-[#F7F0E5] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-5 aspect-4/5 rounded-lg overflow-hidden shadow-2xl border-2 border-[#E8D9C5]/30 group">
                  <img
                    src={leadArtisan.cover_image_url || leadArtisan.avatar_url}
                    alt={leadArtisan.business_name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EBF0EC]/10 text-[#E8D9C5] text-xs font-semibold tracking-wider uppercase">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Guild-Verified Master Artisan</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                    Spotlight: {leadArtisan.business_name}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-[#E8D9C5]">
                    <MapPin className="w-4 h-4 text-[#8A4935]" />
                    <span>{leadArtisan.region} • {leadArtisan.years_of_experience} years of master practice</span>
                  </div>

                  <p className="text-stone-300 text-base leading-relaxed font-light">
                    "{leadArtisan.story}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-stone-300">
                    <div className="p-3 bg-white/5 rounded border border-white/10">
                      <strong className="block text-[#E8D9C5] font-serif text-sm">Living Tradition</strong>
                      <span>Counted-thread Kasuti on handspun organic khadi</span>
                    </div>
                    <div className="p-3 bg-white/5 rounded border border-white/10">
                      <strong className="block text-[#E8D9C5] font-serif text-sm">Natural Pigments</strong>
                      <span>Pomegranate rind, indigo ferment & madder root</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/artisans/${leadArtisan.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8D9C5] hover:bg-white text-[#29251F] text-sm font-semibold rounded transition-all duration-200 active:scale-98 shadow-xs"
                    >
                      <span>Visit Meera’s studio & collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </RevealSection>
        )}

        {/* 7. HERITAGE MASTERPIECES */}
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7E1726] block mb-1">
                HERITAGE SELECTION
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
                Guild & Handloom Masterpieces
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-semibold text-[#7E1726] hover:underline flex items-center gap-1 group"
            >
              <span>Explore full catalogue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {heritageMasterpieceProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </RevealSection>

        {/* 7. REGIONAL CRAFT DISCOVERY (Heritage Clusters) */}
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F1EADF]/60 rounded-xl p-8 sm:p-12 border border-[#E6E0DB]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7E1726] block mb-1">
              Geography of Craft
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
              Regional Heritage Clusters
            </h2>
            <p className="text-[#877E78] text-sm mt-2">
              Every region possesses distinct geological soils, botanical dye plants, and multigenerational craft guilds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md border border-[#E6E0DB] shadow-xs flex flex-col justify-between hover:border-[#D4CDC5] hover:shadow-sm transition-all duration-300">
              <div>
                <div className="text-xs font-bold text-[#7E1726] tracking-widest uppercase mb-1">Karnataka</div>
                <h3 className="font-serif text-xl font-bold text-[#2E1E15] mb-2">Dharwad Handlooms</h3>
                <p className="text-[#877E78] text-xs leading-relaxed mb-4">
                  Celebrated for count-thread Kasuti needlework inspired by temple chariot carvings and centuries of indigenous cotton farming.
                </p>
              </div>
              <Link to="/shop?region=Karnataka" className="text-xs font-semibold text-[#7E1726] hover:underline">
                Browse Karnataka textiles & crafts →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-md border border-[#E6E0DB] shadow-xs flex flex-col justify-between hover:border-[#D4CDC5] hover:shadow-sm transition-all duration-300">
              <div>
                <div className="text-xs font-bold text-[#7E1726] tracking-widest uppercase mb-1">Tamil Nadu</div>
                <h3 className="font-serif text-xl font-bold text-[#2E1E15] mb-2">Auroville Ceramics</h3>
                <p className="text-[#877E78] text-xs leading-relaxed mb-4">
                  Wood-fired stoneware and unglazed terracotta pottery using local red clay and wood-ash glazes fired in community anagama kilns.
                </p>
              </div>
              <Link to="/shop?region=Tamil" className="text-xs font-semibold text-[#7E1726] hover:underline">
                Browse Auroville ceramics →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-md border border-[#E6E0DB] shadow-xs flex flex-col justify-between hover:border-[#D4CDC5] hover:shadow-sm transition-all duration-300">
              <div>
                <div className="text-xs font-bold text-[#7E1726] tracking-widest uppercase mb-1">Rajasthan</div>
                <h3 className="font-serif text-xl font-bold text-[#2E1E15] mb-2">Jaipur Metals & Woods</h3>
                <p className="text-[#877E78] text-xs leading-relaxed mb-4">
                  Lost-wax cast brass and hand-carved reclaimed architectural teak preserved by family guilds in the historic pink city.
                </p>
              </div>
              <Link to="/shop?region=Rajasthan" className="text-xs font-semibold text-[#7E1726] hover:underline">
                Browse Rajasthan metalwork →
              </Link>
            </div>
          </div>
        </RevealSection>

        {/* 8. CRAFT PROCESS & PROVENANCE STORYTELLING */}
        <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center sm:text-left">
            
            <div className="p-6 bg-white rounded-md border border-[#E6E0DB] space-y-3 hover:border-[#D4CDC5] transition-colors shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#F9EBEF] text-[#7E1726] flex items-center justify-center mx-auto sm:mx-0">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2E1E15]">Slow Craftsmanship</h3>
              <p className="text-[#877E78] text-xs leading-relaxed">
                No industrial assembly lines. Each piece takes days or weeks to create on wooden looms, kick wheels, and hand-chiseled molds.
              </p>
            </div>

            <div className="p-6 bg-white rounded-md border border-[#E6E0DB] space-y-3 hover:border-[#D4CDC5] transition-colors shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBF0EC] text-[#34483A] flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2E1E15]">Documented Provenance</h3>
              <p className="text-[#877E78] text-xs leading-relaxed">
                We verify workshop photos, guild certificates, and material receipts before awarding authenticity badges. No unsupported claims.
              </p>
            </div>

            <div className="p-6 bg-white rounded-md border border-[#E6E0DB] space-y-3 hover:border-[#D4CDC5] transition-colors shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#F1EADF] text-[#7E1726] flex items-center justify-center mx-auto sm:mx-0">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2E1E15]">Fair Artisan Economics</h3>
              <p className="text-[#877E78] text-xs leading-relaxed">
                Artisans set their own prices using our transparent studio tools, receiving the vast majority of every patron purchase.
              </p>
            </div>

          </div>
        </RevealSection>

      </div>

      {/* QUICK VIEW DIALOG */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
