import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Check, Sparkles, MapPin, Feather } from 'lucide-react';
import { Product } from '../../types/database';
import { Link, useRouter } from '../../lib/router';
import { useCart } from '../../lib/cart-context';
import { useWishlist } from '../../lib/wishlist-context';
import { ProvenanceBadge } from './ProvenanceBadge';
import { formatPrice } from '../../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = () => {
    const res = addItem(product, quantity);
    if (res.success) {
      setAdded(true);
      setErrorMsg('');
      setTimeout(() => setAdded(false), 2200);
    } else {
      setErrorMsg(res.message || 'Could not add to cart');
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative bg-[#FFFDF9] rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8D9C5] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-black transition-all duration-180 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Gallery Preview */}
          <div className="relative aspect-square md:aspect-auto bg-[#F7F0E5] overflow-hidden flex items-center justify-center">
            <img
              src={primaryImage}
              alt={product.images?.[0]?.alt_text || product.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-103"
            />
            <div className="absolute top-3 left-3 pointer-events-none">
              <div className="pointer-events-auto">
                <ProvenanceBadge status={product.verification_status} />
              </div>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Craft & Region Meta */}
              <div className="flex items-center gap-2 text-xs text-[#8A4935] font-semibold tracking-wider uppercase mb-1">
                <span>{product.craft_type}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3 h-3" />
                  {product.region_of_origin}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-[#29251F] mb-2 leading-tight">
                {product.title}
              </h2>

              {/* Artisan Attribution */}
              {product.artisan && (
                <div className="mb-4 text-xs text-stone-600 flex items-center gap-2">
                  <span>Created by</span>
                  <Link
                    to={`/artisans/${product.artisan.slug}`}
                    onClick={onClose}
                    className="font-semibold text-[#29251F] hover:text-[#8A4935] underline underline-offset-2 transition-colors"
                  >
                    {product.artisan.business_name}
                  </Link>
                </div>
              )}

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl font-bold text-[#8A4935]">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.compare_at_price && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(product.compare_at_price, product.currency)}
                  </span>
                )}
                <span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-[#EBF0EC] text-[#34483A]">
                  {product.stock_quantity > 0
                    ? `${product.stock_quantity} available in studio`
                    : 'Crafted on order'}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-stone-700 leading-relaxed mb-4 font-light">
                {product.short_description}
              </p>

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="mb-4">
                  <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-1">
                    Natural Materials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#F7F0E5] text-stone-800 px-2 py-0.5 rounded border border-[#E8D9C5]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-2 mb-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Buying Controls */}
            <div className="pt-4 border-t border-[#E8D9C5] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8D9C5] rounded bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-black font-bold text-sm active:scale-95 transition-transform"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-semibold w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={quantity >= product.stock_quantity}
                    className="px-3 py-2 text-stone-600 hover:text-black font-bold text-sm disabled:opacity-30 active:scale-95 transition-transform"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                  className={`flex-1 py-3 px-4 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : product.stock_quantity <= 0
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-[#8A4935] hover:bg-[#753C2B] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 animate-in zoom-in-75 duration-150" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded border transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer ${
                    isFavorited
                      ? 'border-rose-300 bg-rose-50 text-rose-600 ring-1 ring-rose-200'
                      : 'border-[#E8D9C5] hover:border-stone-400 text-stone-600'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <div className="text-center">
                <Link
                  to={`/products/${product.slug}`}
                  onClick={onClose}
                  className="text-xs text-[#8A4935] font-semibold hover:underline transition-colors"
                >
                  View full provenance story, craft history & dimensions →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
