import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, HeartHandshake, Compass, Sparkles } from 'lucide-react';
import { Link } from '../../lib/router';
import { db } from '../../lib/db';
import { HastkalaLogo, HastkalaLogoMark } from './HastkalaLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    db.subscribeNewsletter(email);
    setSubscribed(true);
    setError('');
    setEmail('');
  };

  return (
    <footer className="bg-[#2E1E15] text-[#FBF9F4] pt-16 pb-12 border-t border-[#3E2B20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Mission & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#4A362B]">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center">
              <HastkalaLogo variant="dark" size="sm" />
            </div>
            
            <p className="text-stone-300 text-sm leading-relaxed max-w-md">
              <strong className="text-[#E6E0DB]">The art of handmade. The soul of India.</strong> Our mission is to connect master artisans directly with conscious patrons worldwide, celebrating regional heritage crafts, ethical studio livelihoods, and timeless craftsmanship.
            </p>

            <div className="flex items-center gap-4 text-xs text-[#E6E0DB] pt-2">
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#7E1726]" />
                <span>Fair artisan compensation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Evidence-based provenance</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-7 bg-[#241710] rounded-md p-6 sm:p-8 border border-[#4A362B]">
            <h3 className="font-serif text-xl font-semibold text-[#FBF9F4] mb-2">
              Stories from the Loom & Wheel
            </h3>
            <p className="text-stone-300 text-sm mb-4 leading-relaxed">
              Receive monthly studio dispatches, seasonal small-batch releases, and profiles of master craftspeople preserving living traditions.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded-md text-sm">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you for joining our community of craft patrons. Welcome dispatch sent.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for craft dispatches..."
                    className="w-full bg-[#1A110B] border border-[#4A362B] rounded-md px-4 py-2.5 text-sm text-[#FBF9F4] placeholder-stone-400 focus:outline-hidden focus:border-[#7E1726]"
                  />
                  <Mail className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#7E1726] hover:bg-[#67121F] text-white text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

            {error && <p className="text-rose-400 text-xs mt-2">{error}</p>}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800 text-sm">
          <div>
            <h4 className="font-serif font-semibold text-[#E8D9C5] mb-4 uppercase tracking-wider text-xs">
              Craft Disciplines
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-xs">
              <li><Link to="/categories/textiles" className="hover:text-white transition-colors">Handwoven Textiles & Khadi</Link></li>
              <li><Link to="/categories/pottery" className="hover:text-white transition-colors">Wheel-Thrown Pottery</Link></li>
              <li><Link to="/categories/jewellery" className="hover:text-white transition-colors">Lost-Wax Brass & Silver</Link></li>
              <li><Link to="/categories/home-decor" className="hover:text-white transition-colors">Reclaimed Teak & Metalwork</Link></li>
              <li><Link to="/categories/accessories" className="hover:text-white transition-colors">Quilted Folios & Totes</Link></li>
              <li><Link to="/categories/gifts" className="hover:text-white transition-colors">Curated Artisan Gifts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-[#E8D9C5] mb-4 uppercase tracking-wider text-xs">
              Artisans & Origins
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-xs">
              <li><Link to="/artisans" className="hover:text-white transition-colors">Artisan Directory</Link></li>
              <li><Link to="/artisans/meera-devi-textiles" className="hover:text-white transition-colors">Meera Devi (Karnataka)</Link></li>
              <li><Link to="/artisans/clay-and-earth-atelier" className="hover:text-white transition-colors">Clay & Earth (Auroville)</Link></li>
              <li><Link to="/artisans/viraat-heritage-metals" className="hover:text-white transition-colors">Viraat Metals (Jaipur)</Link></li>
              <li><Link to="/our-story" className="hover:text-white transition-colors">Provenance Standards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-[#E8D9C5] mb-4 uppercase tracking-wider text-xs">
              Artisan & Studio
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-xs">
              <li><Link to="/studio" className="hover:text-white transition-colors">Artisan Studio Dashboard</Link></li>
              <li><Link to="/studio/products/new" className="hover:text-white transition-colors">Publish New Craft Listing</Link></li>
              <li><Link to="/studio/orders" className="hover:text-white transition-colors">Artisan Order Fulfilment</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Curator & Admin Oversight</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Customer Order History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-[#E8D9C5] mb-4 uppercase tracking-wider text-xs">
              Support & Transparency
            </h4>
            <ul className="space-y-2.5 text-stone-300 text-xs">
              <li><Link to="/user-guide" className="hover:text-white transition-colors">Platform User Guide</Link></li>
              <li><span className="text-stone-400">Carbon-Neutral Shipping</span></li>
              <li><span className="text-stone-400">Natural & Botanical Dyes</span></li>
              <li><span className="text-stone-400">Zero Synthetic Plastic Wadding</span></li>
              <li><span className="text-stone-400">100% Direct Studio Payouts</span></li>
              <li><span className="text-stone-400">Contact: hello@hastkala.dev</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 Hastkala. The art of handmade. The soul of India. All rights reserved.</p>
          <div className="flex items-center gap-2 text-stone-400 bg-stone-900/80 px-3 py-1.5 rounded border border-stone-800 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-[#E8D9C5]" />
            <span>Ethical Artisan Commerce • Preserving Living Craft Legacies</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
