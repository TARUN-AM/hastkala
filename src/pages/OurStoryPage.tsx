import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Feather, Compass, Award } from 'lucide-react';
import { Link } from '../lib/router';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#7E1726] block">
          The art of handmade • The soul of India
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#29251F] leading-tight">
          Handcrafted by artisans, made to be cherished.
        </h1>
        <p className="text-stone-600 text-lg leading-relaxed font-light max-w-2xl mx-auto">
          We believe everyday objects should carry memory, human touch, and cultural resonance—not anonymous mass production.
        </p>
      </div>

      {/* Editorial Image Banner */}
      <div className="aspect-16/9 rounded-lg overflow-hidden border border-[#E8D9C5] shadow-sm bg-[#F8F3EB]">
        <img
          src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1200&q=80"
          alt="Artisan hands weaving naturally dyed threads on handloom"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Narrative Section */}
      <div className="prose max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-6">
        <p>
          In an era of hyper-fast industrial turnover, millennia of regional making wisdom—the count-thread Kasuti of Karnataka, the wood-fired stoneware kilns of Auroville, the lost-wax casting of Rajasthan—are at risk of dilution.
        </p>
        <p>
          <strong>Hastkala</strong> was created to serve as an honest bridge between independent artisans and conscious patrons. We don’t purchase stock at unfair wholesale markdowns to sell in impersonal warehouses. Instead, each artisan maintains their own digital studio, sets their prices based on transparent material and labor calculations, and ships directly from their workshop to your hands.
        </p>
      </div>

      {/* 3 Core Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-[#FFFDF9] p-6 rounded border border-[#E8D9C5] space-y-2">
          <div className="w-8 h-8 rounded bg-[#F6ECE6] text-[#8A4935] flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-serif font-bold text-base text-[#29251F]">Evidence-Based Provenance</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We never print unsubstantiated marketing claims. Every "Guild Verified" or "Studio Inspected" badge requires documentary inspection of tools, materials, and workshops.
          </p>
        </div>

        <div className="bg-[#FFFDF9] p-6 rounded border border-[#E8D9C5] space-y-2">
          <div className="w-8 h-8 rounded bg-[#EBF0EC] text-[#34483A] flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-serif font-bold text-base text-[#29251F]">Direct Artisan Economics</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            By eliminating speculative middle layers, artisans receive the vast majority of every patron dollar, allowing them to train apprentices and maintain sustainable livelihoods.
          </p>
        </div>

        <div className="bg-[#FFFDF9] p-6 rounded border border-[#E8D9C5] space-y-2">
          <div className="w-8 h-8 rounded bg-[#F4ECE2] text-[#8A4935] flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-serif font-bold text-base text-[#29251F]">Conscious Materials</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            From wild tussar silk and deshi cotton to wood ash glazes and recycled brass, all creations prioritize renewable, botanical, and natural mineral substances.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#F7F0E5] rounded-xl p-8 border border-[#E8D9C5] text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#29251F]">
          Are you an independent master craftsperson?
        </h2>
        <p className="text-xs text-stone-600 max-w-lg mx-auto">
          Explore our Artisan Studio suite. Publish listings, calculate fair prices, and sell directly to patrons without technical friction.
        </p>
        <Link
          to="/auth"
          className="inline-block px-6 py-3 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B] transition-colors"
        >
          Open an Artisan Studio
        </Link>
      </div>
    </div>
  );
};
