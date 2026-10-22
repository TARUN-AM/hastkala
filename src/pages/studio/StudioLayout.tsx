import React from 'react';
import { Palette, Package, PlusCircle, UserCheck, ShieldAlert, Sparkles, Layers, ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';

export const StudioLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, switchPersona } = useAuth();
  const { path } = useRouter();

  // If not artisan or admin, provide guard with instant switch
  if (role !== 'artisan' && role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-[#8A4935] mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-[#29251F]">Artisan Studio Access Only</h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          The studio portal is reserved for registered craftspeople. You are currently viewing as a patron customer.
        </p>
        <button
          type="button"
          onClick={() => switchPersona('artisan')}
          className="px-6 py-3 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B] transition-colors"
        >
          Switch to Artisan Persona (Meera Devi)
        </button>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/studio', icon: Layers },
    { label: 'My Listings', href: '/studio/products', icon: Package },
    { label: 'New Craft Piece', href: '/studio/products/new', icon: PlusCircle },
    { label: 'Studio Orders', href: '/studio/orders', icon: UserCheck },
    { label: 'Studio Profile', href: '/studio/profile', icon: Palette },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8D9C5] gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="text-xs font-bold text-[#8A4935] uppercase tracking-wider">
              Artisan Maker Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#29251F]">
            {user?.full_name}'s Workshop Studio
          </h1>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="flex flex-wrap gap-1 bg-[#FFFDF9] border border-[#E8D9C5] p-1 rounded-md text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors ${
                  isActive ? 'bg-[#8A4935] text-white' : 'text-stone-700 hover:text-black hover:bg-[#F7F0E5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
};
