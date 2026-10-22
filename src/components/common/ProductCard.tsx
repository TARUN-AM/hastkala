import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, MapPin, Check } from 'lucide-react';
import { Product } from '../../types/database';
import { Link } from '../../lib/router';
import { useCart } from '../../lib/cart-context';
import { useWishlist } from '../../lib/wishlist-context';
import { ProvenanceBadge } from './ProvenanceBadge';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [wishlistPopped, setWishlistPopped] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images?.[1]?.image_url;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = addItem(product, 1);
    if (res.success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    setWishlistPopped(true);
    setTimeout(() => setWishlistPopped(false), 300);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const isMadeToOrder =
    product.stock_quantity <= 0 &&
    ((product.lead_time_days ?? 0) > 0 ||
      product.tags?.some((t) => t.toLowerCase().includes('made-to-order')));

  return (
    <article
      className="group relative bg-[#FFFDF9] rounded-md border border-[#E6E0DB] overflow-hidden shadow-xs hover:border-[#D4CDC5] hover:shadow-md transition-all duration-300 ease-out flex flex-col"
    >
      {/* Visual Image Container with Dual-Layer Crossfade & Restrained Zoom */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#FBF9F4]">
        <Link to={`/products/${product.slug}`} className="block w-full h-full relative" tabIndex={-1}>
          {/* Base Primary Image */}
          <img
            src={primaryImage}
            alt={product.images?.[0]?.alt_text || product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Secondary Alternate Image (if real asset exists) with Pure CSS Crossfade */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={product.images?.[1]?.alt_text || `${product.title} alternative view`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <ProvenanceBadge status={product.verification_status} />
          </div>
          {product.stock_quantity <= 3 && product.stock_quantity > 0 && (
            <span className="text-[10px] font-semibold bg-amber-100/95 text-amber-900 px-2 py-0.5 rounded backdrop-blur-xs border border-amber-300/40 shadow-2xs">
              Only {product.stock_quantity} left
            </span>
          )}
          {isMadeToOrder && (
            <span className="text-[10px] font-semibold bg-[#FAF5EE]/95 text-[#7E1726] px-2 py-0.5 rounded backdrop-blur-xs border border-[#E8D9C5] shadow-2xs">
              Made to Order
            </span>
          )}
        </div>

        {/* Wishlist Heart Action with Micro-Spring Feedback */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full z-10 transition-all duration-200 cursor-pointer ${
            wishlistPopped ? 'scale-115' : 'hover:scale-105 active:scale-95'
          } ${
            isFavorited
              ? 'bg-white text-rose-600 shadow-md ring-1 ring-rose-200'
              : 'bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-xs'
          }`}
          aria-label={isFavorited ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-current scale-105' : 'stroke-[1.75]'
            }`}
          />
        </button>

        {/* Action Bar: Always accessible on touch/mobile, hover slide-up on desktop */}
        <div className="absolute bottom-2.5 inset-x-2.5 flex items-center gap-2 opacity-100 translate-y-0 pointer-events-auto md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:pointer-events-none md:group-hover:pointer-events-auto transition-all duration-240 ease-out focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto z-10">
          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#2E1E15] text-xs font-semibold rounded shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-all duration-180 border border-[#E6E0DB] hover:border-[#D4CDC5] active:scale-98 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={product.stock_quantity <= 0 && !isMadeToOrder}
            className={`py-2 px-3 rounded shadow-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-180 active:scale-98 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : product.stock_quantity <= 0 && !isMadeToOrder
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-[#7E1726] hover:bg-[#67121F] text-white hover:shadow-lg'
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {justAdded ? (
              <Check className="w-3.5 h-3.5 animate-in zoom-in-75 duration-150" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {justAdded
                ? 'Added'
                : product.stock_quantity <= 0 && !isMadeToOrder
                ? 'Sold Out'
                : 'Add'}
            </span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#FFFDF9]">
        <div>
          {/* Craft Origin */}
          <div className="flex items-center justify-between text-[11px] text-[#877E78] mb-1">
            <span className="font-semibold text-[#7E1726] uppercase tracking-wider">
              {product.craft_type.split('&')[0]}
            </span>
            <span className="flex items-center gap-0.5 truncate max-w-[120px]">
              <MapPin className="w-3 h-3 text-[#877E78] flex-shrink-0" />
              <span className="truncate">{product.region_of_origin.split(',')[0]}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-[#2E1E15] group-hover:text-[#7E1726] transition-colors duration-200 line-clamp-2 leading-snug mb-1">
            <Link to={`/products/${product.slug}`} className="focus:outline-hidden focus:underline">
              {product.title}
            </Link>
          </h3>

          {/* Artisan Name */}
          {product.artisan && (
            <div className="text-xs text-[#877E78] mb-2 truncate">
              By{' '}
              <Link
                to={`/artisans/${product.artisan.slug}`}
                className="text-[#2E1E15]/85 hover:text-[#7E1726] hover:underline transition-colors"
              >
                {product.artisan.business_name}
              </Link>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-[#E6E0DB] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-lg text-[#2E1E15]">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.compare_at_price, product.currency)}
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#877E78] font-medium">
            {product.currency}
          </span>
        </div>
      </div>
    </article>
  );
};
