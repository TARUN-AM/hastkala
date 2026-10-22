import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  HeartHandshake,
  Sparkles,
  Users,
  Compass,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Link } from '../lib/router';
import { db } from '../lib/db';
import { RevealSection } from '../components/common/RevealSection';

export const OurImpactPage: React.FC = () => {
  // Real dynamic impact metrics from database
  const artisans = db.getArtisans();
  const { total: totalProducts } = db.getProducts({ limit: 100 });
  const totalEnquiries = db.getEnquiries().length;

  const totalArtisans = artisans.length;
  const craftSpecialties = new Set(artisans.map((a) => a.craft_specialty)).size;
  const regionsCount = new Set(artisans.map((a) => a.city || a.region)).size;

  // Select key artisans for the story showcase
  const featuredArtisans = artisans.slice(0, 4);

  // Craft Heritage Showcase Items
  const heritageTraditions = [
    {
      id: 'tholu-bommalata',
      title: 'Tholu Bommalata Leathercraft',
      region: 'Nimmalakunta, Andhra Pradesh',
      description: 'Translucent cured leather shadow puppets and illuminated lamps punched with fine pinhole skylights.',
      image: '/assets/categories/tholu-bommalata.jpg',
      link: '/shop?q=leather',
      tag: 'GI Tagged Heritage',
    },
    {
      id: 'pen-kalamkari',
      title: 'Pen Kalamkari Textiles',
      region: 'Srikalahasti, Andhra Pradesh',
      description: 'Freehand bamboo reed pen drawings on unbleached cotton colored with Swarnamukhi river-washed botanical dyes.',
      image: '/assets/categories/pen-kalamkari.jpg',
      link: '/shop?q=kalamkari',
      tag: '100% Organic Dyes',
    },
    {
      id: 'udayagiri-wood',
      title: 'Udayagiri Wooden Cutlery',
      region: 'Udayagiri, Andhra Pradesh',
      description: 'Filigree openwork spoons and serveware hand-carved from seasoned Nardi wood using traditional gouges.',
      image: '/assets/categories/udayagiri-cutlery.jpg',
      link: '/shop?q=woodcraft',
      tag: 'Persian Court Heritage',
    },
    {
      id: 'dharwad-kasuti',
      title: 'Dharwad Kasuti Embroidery',
      region: 'Dharwad, Karnataka',
      description: 'Geometric counted-thread needlework featuring identical double-running temple motifs hand-stitched without preliminary lines.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      link: '/shop?region=Karnataka',
      tag: 'Chalukya Lineage',
    },
  ];

  // Impact Pillars
  const impactPillars = [
    {
      id: 'artisan-livelihoods',
      title: 'Artisan Livelihoods',
      subtitle: 'Direct Economic Connection',
      description:
        'Connecting patrons directly with master craftspeople, ensuring their traditional making skills generate fair, dignified livelihoods without speculative wholesale markdowns.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      icon: HeartHandshake,
    },
    {
      id: 'preserving-heritage',
      title: 'Preserving Craft Lineage',
      subtitle: 'Documenting Ancient Making',
      description:
        'Documenting millennia-old techniques, regional sacred geometry, and oral histories through written stories and workshop records so traditional wisdom endures.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      icon: Award,
    },
    {
      id: 'regional-communities',
      title: 'Regional Craft Clusters',
      subtitle: 'Sustaining Local Guilds',
      description:
        'Highlighting specialized geographic clusters—from Nimmalakunta shadow puppeteers to Srikalahasti Kalamkari masters and Udayagiri woodcarvers.',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      icon: MapPin,
    },
    {
      id: 'conscious-shopping',
      title: 'More Conscious Shopping',
      subtitle: 'Appreciating Natural Materials',
      description:
        'Encouraging deep appreciation for handmade pieces crafted from unbleached organic cotton, botanical dyes, riverbed clays, and reclaimed timber.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E7] text-[#2E1E15] font-sans pb-16">
      {/* 1. IMPACT HERO SECTION */}
      <section className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center overflow-hidden bg-[#241711]">
        {/* Background Image: Cream-colored textile with pink floral patterns, wooden ladle & natural materials */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/aistudio/image_8b91e8bf.png"
            alt="Handwoven cream-colored textile with pink floral patterns, carved wooden ladle, and natural materials"
            className="w-full h-full object-cover object-[70%_center] sm:object-[65%_center] md:object-[60%_center] lg:object-center transition-transform duration-1000 ease-out"
            loading="eager"
          />
          {/* Subtle Dark & Warm Burgundy Gradient Overlay for Pristine Readability */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1D120B]/92 via-[#1D120B]/75 via-45% to-[#1D120B]/30 lg:to-transparent"
            aria-hidden="true"
          />
          {/* Soft Top & Bottom Shading */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#241711]/60 via-transparent to-[#241711]/30"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16 w-full">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8D1D32] text-white text-[11px] font-semibold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Living Heritage & Purpose
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-xs">
              Every Purchase Preserves a Tradition
            </h1>

            <p className="text-xs sm:text-sm text-stone-200/95 font-light leading-relaxed max-w-lg drop-shadow-2xs">
              Behind every handcrafted piece is a maker, a community, and a tradition worth carrying forward. Discover the people and skills that make every creation meaningful.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                className="px-5 py-2.5 bg-[#8D1D32] hover:bg-[#721526] text-white text-xs font-semibold tracking-wider uppercase rounded shadow-xs active:scale-98 transition-all duration-200 inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/artisans"
                className="px-5 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white text-xs font-semibold tracking-wider uppercase rounded active:scale-98 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>MEET OUR ARTISANS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL IMPACT METRICS STRIP (Dynamic Database-Backed) */}
      <section className="w-full bg-[#FAF6F0] border-b border-[#E8D9C5] py-8 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#E8D9C5]/80">
            
            <div className="pt-4 lg:pt-0 px-2">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8D1D32]">
                {totalArtisans}
              </div>
              <div className="text-xs font-semibold text-[#2E1E15] uppercase tracking-wider mt-1">
                Participating Artisans
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Master craftspeople in guild clusters
              </p>
            </div>

            <div className="pt-4 lg:pt-0 px-2">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8D1D32]">
                {craftSpecialties}
              </div>
              <div className="text-xs font-semibold text-[#2E1E15] uppercase tracking-wider mt-1">
                Craft Disciplines
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                From Kalamkari to Tholu Bommalata
              </p>
            </div>

            <div className="pt-4 lg:pt-0 px-2">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8D1D32]">
                {regionsCount}
              </div>
              <div className="text-xs font-semibold text-[#2E1E15] uppercase tracking-wider mt-1">
                Regional Clusters
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Nimmalakunta, Srikalahasti, Udayagiri & Jaipur
              </p>
            </div>

            <div className="pt-4 lg:pt-0 px-2">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8D1D32]">
                {totalProducts}
              </div>
              <div className="text-xs font-semibold text-[#2E1E15] uppercase tracking-wider mt-1">
                Handcrafted Listings
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Individual pieces with verified provenance
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16 space-y-20">
        
        {/* 3. IMPACT PILLARS */}
        <RevealSection>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8D1D32] block">
              Pillars of Purpose
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E1E15]">
              How Hastkala Nurtures Living Craft
            </h2>
            <p className="text-stone-600 text-sm font-light">
              Connecting patrons, artisans, and regional heritage through direct support and transparent practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactPillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="group bg-[#FFFDF9] rounded-2xl border border-[#EADBCA] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative aspect-4/3 overflow-hidden bg-[#EAE0D2]">
                      <img
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 text-[#8D1D32] flex items-center justify-center shadow-xs backdrop-blur-xs">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <span className="text-[11px] font-semibold text-[#8B6B4A] uppercase tracking-wider block">
                        {pillar.subtitle}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#2E1E15] group-hover:text-[#8D1D32] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-stone-600 text-xs font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealSection>

        {/* 4. ARTISAN STORYTELLING SECTION */}
        <RevealSection className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#EADBCA] shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8D1D32] block mb-1">
                Faces of the Craft
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
                Meet the Artisans Behind the Work
              </h2>
            </div>
            <Link
              to="/artisans"
              className="text-xs font-semibold text-[#8D1D32] hover:underline inline-flex items-center gap-1 group"
            >
              <span>VIEW ALL ARTISANS ({totalArtisans})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtisans.map((artisan) => (
              <div
                key={artisan.id}
                className="group bg-[#F7F1E7] rounded-2xl p-5 border border-[#EADBCA]/80 flex flex-col justify-between hover:border-[#8D1D32]/40 transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-[#EAE0D2]">
                    <img
                      src={artisan.avatar_url || artisan.cover_image_url}
                      alt={artisan.business_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold bg-[#8D1D32] text-white px-2 py-0.5 rounded-full shadow-xs">
                        Guild Verified
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] text-[#8B6B4A] font-semibold">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{artisan.city}, {artisan.region}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#2E1E15] group-hover:text-[#8D1D32] transition-colors">
                      {artisan.business_name}
                    </h3>

                    <p className="text-xs text-[#8D1D32] font-semibold">
                      {artisan.craft_specialty}
                    </p>

                    <p className="text-stone-600 text-xs font-light leading-relaxed line-clamp-3 pt-1">
                      {artisan.bio}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EADBCA]/60">
                  <Link
                    to={`/artisans/${artisan.slug}`}
                    className="text-xs font-semibold text-[#8D1D32] hover:underline flex items-center justify-between"
                  >
                    <span>Visit Studio</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* 5. CRAFT HERITAGE SHOWCASE */}
        <RevealSection>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8D1D32] block">
              Living Traditions
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#2E1E15]">
              Craft Heritage in Our Catalogue
            </h2>
            <p className="text-stone-600 text-sm font-light">
              Explore authentic regional art forms preserved through dedicated artisan practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heritageTraditions.map((tradition) => (
              <Link
                key={tradition.id}
                to={tradition.link}
                className="group relative rounded-2xl overflow-hidden border border-[#EADBCA] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row bg-[#FFFDF9]"
              >
                <div className="sm:w-1/2 aspect-4/3 sm:aspect-auto overflow-hidden bg-[#EAE0D2] relative">
                  <img
                    src={tradition.image}
                    alt={tradition.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#8D1D32] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#EADBCA]">
                    {tradition.tag}
                  </div>
                </div>

                <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#8B6B4A] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {tradition.region}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#2E1E15] group-hover:text-[#8D1D32] transition-colors">
                      {tradition.title}
                    </h3>
                    <p className="text-stone-600 text-xs font-light leading-relaxed">
                      {tradition.description}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-[#8D1D32] flex items-center gap-1">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </RevealSection>

        {/* 6. EDITORIAL STORYTELLING SECTION */}
        <RevealSection className="bg-[#3B2C24] text-[#F7F1E7] rounded-3xl overflow-hidden shadow-xl border border-[#8B6B4A]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image */}
            <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto bg-[#241711]">
              <img
                src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80"
                alt="Hands weaving thread on traditional pit loom"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8D9C5] block">
                  Editorial Reflection
                </span>
                
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
                  Wisdom Carried in Human Hands
                </h2>

                <div className="space-y-4 text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                  <p>
                    In a world dominated by rapid automated manufacturing, traditional craft represents a different relationship with time, materials, and community. Every curve carved into wood and every thread dyed with pomegranate rind carries centuries of quiet mastery.
                  </p>
                  <p>
                    When you welcome a handcrafted creation into your home, you become part of an unbroken story connecting past, present, and future—ensuring that regional identity and human craftsmanship continue to thrive.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/craft-stories"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8D1D32] hover:bg-[#721526] text-white text-xs font-semibold rounded-md tracking-wider uppercase transition-colors"
                >
                  <span>EXPLORE CRAFT STORIES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </RevealSection>

        {/* 7. CALLS TO ACTION SECTION */}
        <RevealSection className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#EADBCA] text-center space-y-6 shadow-2xs">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8D1D32] block">
              Join the Movement
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E1E15]">
              Be Part of a Living Tradition
            </h2>

            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Discover handmade pieces and the people whose skills bring them to life.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#8D1D32] hover:bg-[#721526] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs active:scale-98 transition-all inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>SHOP HANDMADE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/craft-stories"
              className="px-6 py-3 bg-white hover:bg-[#F7F1E7] text-[#2E1E15] border border-[#EADBCA] hover:border-[#8D1D32] text-xs font-semibold tracking-wider uppercase rounded-md active:scale-98 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>DISCOVER CRAFT STORIES</span>
            </Link>
          </div>
        </RevealSection>

      </div>
    </div>
  );
};
