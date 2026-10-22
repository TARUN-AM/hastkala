import React from 'react';
import { Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, Plus, Minus } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { useCart } from '../lib/cart-context';
import { FREE_SHIPPING_THRESHOLD } from '../utils/order-calculations';
import { formatPrice } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const { items, itemCount, financials, updateQuantity, removeItem } = useCart();
  const { navigate } = useRouter();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-[#F4ECE2] text-[#8A4935] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#29251F] mb-2">Your Cart is Empty</h1>
        <p className="text-stone-600 text-sm max-w-md mx-auto mb-6">
          You haven’t selected any handcrafted pieces yet. Explore our curated collections to discover objects with stories.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#8A4935] hover:bg-[#753C2B] text-white text-sm font-semibold rounded shadow-md transition-colors"
        >
          <span>Explore Artisan Collections</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const shippingProgressPct = Math.min(100, Math.round((financials.subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="font-serif text-3xl font-bold text-[#29251F] mb-6">Shopping Cart ({itemCount})</h1>

      {/* Free Shipping Incentive Bar */}
      <div className="bg-[#FFFDF9] border border-[#E8D9C5] rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#8A4935]" />
            {financials.freeShippingEligible ? (
              <span className="text-emerald-800 font-bold">You qualify for complimentary artisan shipping!</span>
            ) : (
              <span>Add ${financials.amountNeededForFreeShipping.toFixed(2)} more for complimentary shipping</span>
            )}
          </div>
          <span>${financials.subtotal.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}</span>
        </div>
        <div className="w-full h-2 bg-[#F7F0E5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#8A4935] transition-all duration-300"
            style={{ width: `${shippingProgressPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] divide-y divide-[#E8D9C5]">
            {items.map(({ product, quantity }) => {
              const itemTotal = Number((product.price * quantity).toFixed(2));
              const primaryImg = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80';

              return (
                <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <Link to={`/products/${product.slug}`} className="w-20 h-20 rounded bg-[#F7F0E5] overflow-hidden flex-shrink-0 border border-[#E8D9C5]">
                      <img src={primaryImg} alt={product.title} className="w-full h-full object-cover" />
                    </Link>

                    <div>
                      <div className="text-[11px] font-semibold text-[#8A4935] uppercase tracking-wider">
                        {product.craft_type}
                      </div>
                      <Link to={`/products/${product.slug}`} className="font-serif font-semibold text-base text-[#29251F] hover:text-[#8A4935] transition-colors line-clamp-1">
                        {product.title}
                      </Link>
                      {product.artisan && (
                        <div className="text-xs text-stone-500">
                          By {product.artisan.business_name}
                        </div>
                      )}
                      <div className="text-xs font-semibold text-stone-800 mt-1 sm:hidden">
                        {formatPrice(product.price, product.currency)} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#E8D9C5] rounded bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-stone-600 hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-semibold w-8 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        disabled={quantity >= product.stock_quantity}
                        className="p-1.5 text-stone-600 hover:text-black disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="w-20 text-right font-serif font-bold text-base text-[#29251F]">
                      {formatPrice(itemTotal, product.currency)}
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                      aria-label={`Remove ${product.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link to="/shop" className="text-xs font-semibold text-[#8A4935] hover:underline">
              ← Continue browsing pieces
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 space-y-4 shadow-xs sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#29251F]">Order Summary</h2>

            <div className="space-y-2.5 text-xs text-stone-700 pb-4 border-b border-[#E8D9C5]">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-[#29251F]">${financials.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Packaging & Delivery</span>
                <span>
                  {financials.shippingCost === 0 ? (
                    <span className="text-emerald-700 font-semibold">Complimentary</span>
                  ) : (
                    `$${financials.shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Craft Tax (5%)</span>
                <span>${financials.taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-serif text-lg font-bold text-[#29251F]">Total</span>
              <span className="font-serif text-2xl font-bold text-[#8A4935]">
                ${financials.total.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#8A4935] hover:bg-[#753C2B] text-white text-sm font-semibold rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct artisan payment & verified provenance guarantee</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
