import React from 'react';
import { CheckCircle2, Package, ArrowRight, Home, Sparkles, MapPin } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { db } from '../lib/db';

export const CheckoutSuccessPage: React.FC = () => {
  const { searchParams } = useRouter();
  const orderId = searchParams.get('orderId');

  const order = orderId ? db.getOrderById(orderId) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
      {/* Celebratory Icon */}
      <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0EC] text-[#34483A] text-xs font-semibold uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Order Successfully Confirmed</span>
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29251F] mb-2">
        Thank You for Supporting Handcrafted Artistry
      </h1>

      <p className="text-sm text-stone-600 max-w-lg mx-auto mb-8 leading-relaxed">
        Your order has been recorded in the database. The artisan studios have received notification to begin crafting and preparing your package.
      </p>

      {order && (
        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 text-left mb-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E8D9C5] gap-2">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider">Order Reference</span>
              <div className="font-serif text-xl font-bold text-[#8A4935]">{order.order_number}</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500 uppercase tracking-wider">Placed On</span>
              <div className="text-xs font-medium text-stone-800">
                {new Date(order.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="text-xs text-stone-700 bg-[#F7F0E5] p-3.5 rounded border border-[#E8D9C5]/60 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#8A4935] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#29251F] font-semibold mb-0.5">Shipping Destination:</strong>
              <div>{order.shipping_address.full_name}</div>
              <div>{order.shipping_address.street_address} {order.shipping_address.apartment && `, ${order.shipping_address.apartment}`}</div>
              <div>{order.shipping_address.city}, {order.shipping_address.state_province} {order.shipping_address.postal_code}, {order.shipping_address.country}</div>
            </div>
          </div>

          {/* Purchased Items Snapshots */}
          <div>
            <h3 className="font-serif font-semibold text-sm text-[#29251F] mb-3">Purchased Items Snapshot</h3>
            <div className="space-y-3 divide-y divide-[#E8D9C5]/50">
              {order.items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    {item.product_image_snapshot && (
                      <img
                        src={item.product_image_snapshot}
                        alt={item.product_title_snapshot}
                        className="w-12 h-12 rounded object-cover border border-[#E8D9C5]"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-[#29251F]">{item.product_title_snapshot}</div>
                      <div className="text-[11px] text-stone-500">
                        {item.artisan_name_snapshot} • Qty: {item.quantity} × ${item.unit_price_snapshot.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="font-serif font-bold text-[#29251F]">
                    ${item.total_price_snapshot.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-4 border-t border-[#E8D9C5] space-y-1.5 text-xs text-stone-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{order.shipping_cost === 0 ? 'Complimentary' : `$${order.shipping_cost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Craft Tax:</span>
              <span>${order.tax_amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-serif text-base font-bold text-[#8A4935] pt-2 border-t border-[#E8D9C5]">
              <span>Total Paid (Simulated):</span>
              <span>${order.total_amount.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/orders"
          className="px-6 py-3 bg-[#8A4935] hover:bg-[#753C2B] text-white text-xs font-semibold rounded shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Package className="w-4 h-4" />
          <span>View All My Orders</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#FFFDF9] hover:bg-[#F4ECE2] text-[#29251F] border border-[#D9C9B4] text-xs font-semibold rounded transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Continue Discovering Crafts</span>
        </Link>
      </div>
    </div>
  );
};
