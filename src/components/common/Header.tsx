import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Palette,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { Link, useRouter } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { useCart } from '../../lib/cart-context';
import { useWishlist } from '../../lib/wishlist-context';
import { db } from '../../lib/db';
import { HastkalaLogo, HastkalaLogoMark } from './HastkalaLogo';

export const Header: React.FC = () => {
  const { path, navigate } = useRouter();
  const { user, role, switchPersona } = useAuth();
  const { itemCount, financials } = useCart();
  const { wishlistCount } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const shopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const personaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const categories = db.getCategories();

  // Scroll tracking for sticky header elevation without layout shift
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  // Keyboard accessibility: Escape key closes all open dropdowns/menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShopMenuOpen(false);
        setPersonaMenuOpen(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  // Safe dropdown hover bridges with grace timeout to prevent accidental closes
  const handleShopMouseEnter = () => {
    if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current);
    setShopMenuOpen(true);
  };

  const handleShopMouseLeave = () => {
    shopTimeoutRef.current = setTimeout(() => {
      setShopMenuOpen(false);
    }, 200);
  };

  const handlePersonaMouseEnter = () => {
    if (personaTimeoutRef.current) clearTimeout(personaTimeoutRef.current);
    setPersonaMenuOpen(true);
  };

  const handlePersonaMouseLeave = () => {
    personaTimeoutRef.current = setTimeout(() => {
      setPersonaMenuOpen(false);
    }, 200);
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white/98 backdrop-blur-md transition-shadow duration-300 border-b ${
        isScrolled ? 'border-[#D4CDC5] shadow-xs' : 'border-[#E6E0DB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROW 1: TOP HEADER (Strict 3-Column Grid Ensuring Brand Mark Is Mathematically Centered) */}
        <div className="grid grid-cols-3 items-center h-20 sm:h-22">
          
          {/* Left Column: Mobile Menu Toggle / Desktop Provenance Tag */}
          <div className="flex items-center justify-start">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#2E1E15] hover:text-[#7E1726] lg:hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7E1726] rounded transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.75]" /> : <Menu className="w-6 h-6 stroke-[1.75]" />}
            </button>

            {/* Desktop Left Provenance Accent */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#877E78] font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7E1726]"></span>
              <span>Independent Master Guilds</span>
            </div>
          </div>

          {/* Center Column: Ornamental Indian Heritage Logo & Wordmark (Centered Regardless of Side Widths) */}
          <div className="flex items-center justify-center text-center">
            <HastkalaLogo size="md" />
          </div>

          {/* Right Column: Utility Icons (Search, Persona/Account, Wishlist, Bag with Fixed Containers to Prevent Shift) */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            
            {/* 1. Search Icon Toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#2E1E15] hover:text-[#7E1726] transition-colors duration-200 rounded-full hover:bg-stone-100/70 cursor-pointer ${
                searchOpen ? 'text-[#7E1726] bg-stone-100' : ''
              }`}
              title="Search marketplace"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* 2. Persona Switcher / Account Dropdown */}
            <div
              className="hidden sm:block relative w-10 h-10"
              onMouseEnter={handlePersonaMouseEnter}
              onMouseLeave={handlePersonaMouseLeave}
            >
              <button
                type="button"
                onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-[#29251F] hover:text-[#8A4935] transition-colors duration-200 rounded-full hover:bg-stone-100/70 cursor-pointer relative"
                title={user ? `Signed in as ${user.full_name} (${role})` : 'Account & Persona'}
                aria-label="Account and persona"
                aria-expanded={personaMenuOpen}
              >
                <User className="w-5 h-5 stroke-[1.75]" />
                <span className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
              </button>

              {/* Persona Dropdown with Invisible Bridge */}
              <div
                className={`absolute right-0 top-full pt-1.5 w-64 z-50 transition-all duration-200 ${
                  personaMenuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-1 pointer-events-none invisible'
                }`}
              >
                <div className="bg-white rounded-md shadow-xl border border-[#E6E0DB] py-2 text-xs text-[#2E1E15]">
                  <div className="px-3 py-1.5 border-b border-[#E6E0DB] flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#877E78]">
                    <span>Role Switcher</span>
                    <span className="capitalize text-[#7E1726] font-bold">{role}</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      switchPersona('customer');
                      setPersonaMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#FBF9F4] transition-colors cursor-pointer ${
                      role === 'customer' ? 'font-semibold text-[#7E1726] bg-[#FBF9F4]' : ''
                    }`}
                  >
                    <div>
                      <div className="text-sm">Customer: Sarah Patel</div>
                      <div className="text-[10px] text-[#877E78]">Shop, cart, wishlist, orders</div>
                    </div>
                    {role === 'customer' && <span className="text-xs font-bold text-[#7E1726]">✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchPersona('artisan');
                      setPersonaMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#FBF9F4] transition-colors cursor-pointer ${
                      role === 'artisan' ? 'font-semibold text-[#7E1726] bg-[#FBF9F4]' : ''
                    }`}
                  >
                    <div>
                      <div className="text-sm">Artisan: Meera Devi</div>
                      <div className="text-[10px] text-[#877E78]">Studio dashboard & craft listings</div>
                    </div>
                    {role === 'artisan' && <span className="text-xs font-bold text-[#7E1726]">✓</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switchPersona('admin');
                      setPersonaMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#FBF9F4] transition-colors cursor-pointer ${
                      role === 'admin' ? 'font-semibold text-[#7E1726] bg-[#FBF9F4]' : ''
                    }`}
                  >
                    <div>
                      <div className="text-sm">Admin: Lead Curator</div>
                      <div className="text-[10px] text-[#877E78]">Provenance & product oversight</div>
                    </div>
                    {role === 'admin' && <span className="text-xs font-bold text-[#7E1726]">✓</span>}
                  </button>

                  {/* Direct Shortcuts for Artisan / Admin */}
                  {(role === 'artisan' || role === 'admin') && (
                    <div className="pt-1.5 mt-1 border-t border-[#E6E0DB] px-2 flex gap-1.5">
                      <Link
                        to="/studio"
                        onClick={() => setPersonaMenuOpen(false)}
                        className="flex-1 py-1.5 px-2 bg-[#F9EBEF] text-[#7E1726] hover:bg-[#7E1726] hover:text-white rounded text-[11px] font-semibold text-center transition-colors"
                      >
                        Open Studio
                      </Link>
                      {role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setPersonaMenuOpen(false)}
                          className="flex-1 py-1.5 px-2 bg-[#EBF0EC] text-[#34483A] hover:bg-[#34483A] hover:text-white rounded text-[11px] font-semibold text-center transition-colors"
                        >
                          Curator Admin
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Wishlist Icon with Fixed Dimension Container (Immune to Layout Shifts) */}
            <div className="hidden sm:flex w-10 h-10 items-center justify-center relative">
              <Link
                to="/orders"
                className="w-10 h-10 text-[#2E1E15] hover:text-[#7E1726] transition-colors duration-200 rounded-full hover:bg-stone-100/70 flex items-center justify-center relative"
                title="Saved Pieces & Orders"
                aria-label="Wishlist and saved pieces"
              >
                <Heart className="w-5 h-5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#7E1726] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            {/* 4. Shopping Bag Icon with Fixed Dimension Container (Immune to Layout Shifts) */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center relative">
              <Link
                to="/cart"
                className="w-9 h-9 sm:w-10 sm:h-10 text-[#2E1E15] hover:text-[#7E1726] transition-colors duration-200 rounded-full hover:bg-stone-100/70 flex items-center justify-center relative"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-[#2E1E15] text-[#FBF9F4] text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>

        {/* SEARCH EXPANDABLE BAR (Smooth Dropdown Under Top Row) */}
        {searchOpen && (
          <div className="py-3 border-t border-[#E6E0DB] animate-in fade-in slide-in-from-top-1 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by craft, natural material, artisan, or region..."
                className="w-full bg-[#FFFDF9] border border-[#E6E0DB] rounded-full pl-11 pr-24 py-2 text-sm text-[#2E1E15] placeholder-[#877E78] focus:outline-hidden focus:border-[#7E1726] focus:ring-2 focus:ring-[#7E1726]/20 transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-[#877E78] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#7E1726] hover:bg-[#67121F] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* ROW 2: CENTERED SECONDARY NAVIGATION ROW */}
        <nav
          className="hidden lg:flex items-center justify-center py-3 border-t border-[#E6E0DB] relative"
          aria-label="Main Navigation"
        >
          <div className="flex items-center space-x-12">
            
            {/* SHOP WITH DROPDOWN TRIGGER */}
            <div
              className="relative inline-block"
              onMouseEnter={handleShopMouseEnter}
              onMouseLeave={handleShopMouseLeave}
              onFocus={handleShopMouseEnter}
            >
              <div className="flex items-center gap-1">
                <Link
                  to="/shop"
                  className={`nav-link-indicator inline-flex items-center py-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#2E1E15]/75 hover:text-[#7E1726] transition-colors duration-200 ${
                    path.startsWith('/shop') || path.startsWith('/categories') ? 'active text-[#7E1726]' : ''
                  }`}
                >
                  <span>SHOP</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShopMenuOpen((prev) => !prev);
                  }}
                  className="p-1 -ml-0.5 text-[#877E78] hover:text-[#7E1726] transition-colors cursor-pointer focus:outline-hidden"
                  aria-expanded={shopMenuOpen}
                  aria-label="Toggle Shop categories mega menu"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 stroke-[2] transition-transform duration-200 ${
                      shopMenuOpen ? 'rotate-180 text-[#7E1726]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* OUR ARTISANS */}
            <Link
              to="/artisans"
              className={`nav-link-indicator py-1 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                path.startsWith('/artisans')
                  ? 'active text-[#7E1726]'
                  : 'text-[#2E1E15]/75 hover:text-[#7E1726]'
              }`}
            >
              OUR ARTISANS
            </Link>

            {/* CRAFT STORIES */}
            <Link
              to="/craft-stories"
              className={`nav-link-indicator py-1 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                path === '/craft-stories' || path.startsWith('/craft-stories/')
                  ? 'active text-[#7E1726]'
                  : 'text-[#2E1E15]/75 hover:text-[#7E1726]'
              }`}
            >
              CRAFT STORIES
            </Link>

            {/* OUR IMPACT */}
            <Link
              to="/our-impact"
              className={`nav-link-indicator py-1 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${
                path === '/our-impact' || path === '/impact'
                  ? 'active text-[#7E1726]'
                  : 'text-[#2E1E15]/75 hover:text-[#7E1726]'
              }`}
            >
              OUR IMPACT
            </Link>

          </div>

          {/* ELEGANT CENTERED MEGA-MENU / CATEGORY DROPDOWN */}
          <div
            onMouseEnter={handleShopMouseEnter}
            onMouseLeave={handleShopMouseLeave}
            className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[860px] max-w-[95vw] z-50 transition-all duration-200 ${
              shopMenuOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                : 'opacity-0 -translate-y-2 pointer-events-none invisible'
            }`}
          >
            <div className="bg-white rounded-md shadow-2xl border border-[#E6E0DB] p-6 text-[#2E1E15] grid grid-cols-12 gap-6">
              
              {/* Col 1: Disciplines */}
              <div className="col-span-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7E1726] block border-b border-[#E6E0DB] pb-1.5">
                  Craft Disciplines
                </span>
                <ul className="space-y-2 text-xs">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/categories/${cat.slug}`}
                        onClick={() => setShopMenuOpen(false)}
                        className="text-[#2E1E15]/80 hover:text-[#7E1726] hover:translate-x-1 transition-all duration-150 block py-0.5"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-1">
                    <Link
                      to="/shop"
                      onClick={() => setShopMenuOpen(false)}
                      className="text-[#7E1726] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Explore All Collections</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 2: Featured Heritage Traditions */}
              <div className="col-span-4 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7E1726] block border-b border-[#E6E0DB] pb-1.5">
                  Living Traditions
                </span>
                <ul className="space-y-2.5 text-xs">
                  <li>
                    <Link
                      to="/shop?region=Karnataka"
                      onClick={() => setShopMenuOpen(false)}
                      className="group block"
                    >
                      <div className="font-serif font-bold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors">
                        Kasuti Needlework
                      </div>
                      <div className="text-[11px] text-[#877E78]">Count-thread geometric motifs • Dharwad</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop?q=kalamkari"
                      onClick={() => setShopMenuOpen(false)}
                      className="group block"
                    >
                      <div className="font-serif font-bold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors">
                        Kalamkari Heritage Art
                      </div>
                      <div className="text-[11px] text-[#877E78]">Botanical dyes & organic cotton • Srikalahasti</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop?region=Tamil"
                      onClick={() => setShopMenuOpen(false)}
                      className="group block"
                    >
                      <div className="font-serif font-bold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors">
                        Anagama Wood-Fired Ceramics
                      </div>
                      <div className="text-[11px] text-[#877E78]">72-hour continuous wood-firing • Auroville</div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop?region=Rajasthan"
                      onClick={() => setShopMenuOpen(false)}
                      className="group block"
                    >
                      <div className="font-serif font-bold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors">
                        Lost-Wax Brass & Teak
                      </div>
                      <div className="text-[11px] text-[#877E78]">Cire-perdue casting • Jaipur Guilds</div>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Editorial Showcase Card */}
              <div className="col-span-4 bg-[#FBF9F4] rounded-md p-4 border border-[#E6E0DB] flex flex-col justify-between">
                <div>
                  <div className="aspect-4/3 rounded overflow-hidden mb-3 bg-[#E6E0DB]">
                    <img
                      src="https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=80"
                      alt="Handloom weaving"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#7E1726] block mb-1">
                    Master Spotlight
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#2E1E15] leading-snug">
                    Meera Devi Handlooms
                  </h4>
                  <p className="text-[11px] text-[#877E78] mt-1 line-clamp-2">
                    Preserving 400 years of North Karnataka Kasuti counted-thread embroidery.
                  </p>
                </div>

                <Link
                  to="/artisans/meera-devi-textiles"
                  onClick={() => setShopMenuOpen(false)}
                  className="mt-3 text-xs font-semibold text-[#7E1726] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Master Studio</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>
        </nav>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-10 w-4/5 max-w-sm bg-[#FFFDF9] h-screen h-[100dvh] shadow-2xl flex flex-col justify-between overflow-y-auto p-6 border-r border-[#E6E0DB] animate-in slide-in-from-left duration-250">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E6E0DB]">
                <HastkalaLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#2E1E15] hover:text-[#7E1726]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-5 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search crafts, artisans..."
                  className="w-full bg-[#FBF9F4] border border-[#E6E0DB] rounded-full pl-9 pr-3 py-2 text-xs text-[#2E1E15] placeholder-[#877E78] focus:outline-hidden focus:border-[#7E1726]"
                />
                <Search className="w-4 h-4 text-[#877E78] absolute left-3 top-1/2 -translate-y-1/2" />
              </form>

              {/* Navigation Links */}
              <div className="mt-6 space-y-4">
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#8A4935]"
                >
                  Shop All Crafts
                </Link>

                <div className="pl-3 border-l-2 border-[#E8D9C5] space-y-2 py-1">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/categories/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-stone-600 hover:text-[#8A4935]"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/artisans"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#8A4935]"
                >
                  Our Artisans
                </Link>

                <Link
                  to="/craft-stories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#8A4935]"
                >
                  Craft Stories
                </Link>

                <Link
                  to="/our-impact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-wider text-[#29251F] hover:text-[#8A4935]"
                >
                  Our Impact
                </Link>
              </div>

              {/* Role Switcher in Mobile Drawer */}
              <div className="mt-8 pt-4 border-t border-[#E8D9C5]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                  Test Persona ({role})
                </span>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => switchPersona('customer')}
                    className={`py-1.5 px-2 rounded text-center border cursor-pointer ${
                      role === 'customer'
                        ? 'bg-[#8A4935] text-white border-[#8A4935]'
                        : 'bg-[#F7F0E5] text-[#29251F] border-[#E8D9C5]'
                    }`}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => switchPersona('artisan')}
                    className={`py-1.5 px-2 rounded text-center border cursor-pointer ${
                      role === 'artisan'
                        ? 'bg-[#8A4935] text-white border-[#8A4935]'
                        : 'bg-[#F7F0E5] text-[#29251F] border-[#E8D9C5]'
                    }`}
                  >
                    Artisan
                  </button>
                  <button
                    type="button"
                    onClick={() => switchPersona('admin')}
                    className={`py-1.5 px-2 rounded text-center border cursor-pointer ${
                      role === 'admin'
                        ? 'bg-[#8A4935] text-white border-[#8A4935]'
                        : 'bg-[#F7F0E5] text-[#29251F] border-[#E8D9C5]'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8D9C5] space-y-2">
              {(role === 'artisan' || role === 'admin') && (
                <Link
                  to="/studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-3 bg-[#8A4935] text-white rounded text-xs font-semibold text-center block"
                >
                  Artisan Studio Dashboard
                </Link>
              )}
              {role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-3 bg-[#34483A] text-white rounded text-xs font-semibold text-center block"
                >
                  Curator Oversight Admin
                </Link>
              )}
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 px-3 bg-[#F4ECE2] text-[#29251F] rounded text-xs font-semibold text-center block"
              >
                Saved Pieces & Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
