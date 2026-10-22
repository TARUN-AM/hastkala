import React from 'react';
import { ShieldCheck, Package, Users, ShoppingBag, ShieldAlert, FileText, ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, switchPersona } = useAuth();
  const { path } = useRouter();

  if (role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-[#34483A] mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-[#29251F]">Curator & Administrator Access Only</h1>
        <p className="text-xs text-stone-600 max-w-md mx-auto">
          This portal allows platform curators to review provenance evidence, verify artisan guilds, and inspect listings.
        </p>
        <button
          type="button"
          onClick={() => switchPersona('admin')}
          className="px-6 py-3 bg-[#34483A] text-white text-xs font-semibold rounded hover:bg-[#253329] transition-colors"
        >
          Switch to Administrator Persona (Elena Vance)
        </button>
      </div>
    );
  }

  const navItems = [
    { label: 'Oversight', href: '/admin', icon: ShieldCheck },
    { label: 'Product Curation', href: '/admin/products', icon: Package },
    { label: 'Artisan Verification', href: '/admin/artisans', icon: Users },
    { label: 'All Platform Orders', href: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8D9C5] gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#34483A]"></span>
            <span className="text-xs font-bold text-[#34483A] uppercase tracking-wider">
              Platform Curation & Provenance Administration
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#29251F]">
            Curator Command Center
          </h1>
        </div>

        <div className="flex flex-wrap gap-1 bg-[#FFFDF9] border border-[#E8D9C5] p-1 rounded-md text-xs font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = path === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors ${
                  isActive ? 'bg-[#34483A] text-white' : 'text-stone-700 hover:text-black hover:bg-[#F7F0E5]'
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
