import React from 'react';
import { ArrowLeft, Package, MapPin, ShieldCheck, Printer, Calendar, Truck } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { db } from '../lib/db';

interface OrderDetailPageProps {
  id: string;
}

export const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ id }) => {
  const order = db.getOrderById(id);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#29251F] mb-3">Order Record Not Found</h1>
        <p className="text-xs text-stone-600 mb-6">
          Could not locate order ID #{id}.
        </p>
        <Link to="/orders" className="px-5 py-2.5 bg-[#8A4935] text-white text-xs font-semibold rounded">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <Link to="/orders" className="text-xs font-semibold text-[#8A4935] hover:underline inline-flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#29251F]">Order {order.order_number}</h1>
            <p className="text-xs text-stone-500 mt-1">
              Placed on {new Date(order.created_at).toLocaleString()} • {order.payment_method}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8D9C5] bg-[#FFFDF9] hover:bg-[#F4ECE2] text-xs font-semibold text-stone-800 rounded shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 sm:p-8 space-y-8 shadow-xs">
        
        {/* Fulfillment Pipeline */}
        <div className="bg-[#F7F0E5] p-4 rounded-lg border border-[#E8D9C5] text-xs">
          <div className="font-semibold text-[#8A4935] uppercase tracking-wider mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Studio Production & Dispatch Timeline</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-stone-700">
            <div className="p-2 bg-white rounded border border-stone-200">
              <strong className="block text-emerald-800">1. Order Confirmed</strong>
              <span className="text-[10px] text-stone-500">Atomic inventory verified</span>
            </div>
            <div className="p-2 bg-white rounded border border-stone-200">
              <strong className="block text-stone-800">2. Artisan Preparation</strong>
              <span className="text-[10px] text-stone-500">Careful inspect & pack</span>
            </div>
            <div className="p-2 bg-white rounded border border-stone-200">
              <strong className="block text-stone-800">3. Carbon-Neutral Transit</strong>
              <span className="text-[10px] text-stone-500">Direct courier handover</span>
            </div>
            <div className="p-2 bg-white rounded border border-stone-200">
              <strong className="block text-stone-800">4. Delivery Completed</strong>
              <span className="text-[10px] text-stone-500">To your address</span>
            </div>
          </div>
        </div>

        {/* Address & Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700 pb-6 border-b border-[#E8D9C5]">
          <div>
            <strong className="block text-[#29251F] uppercase font-bold tracking-wider mb-1">
              Recipient & Destination
            </strong>
            <div className="leading-relaxed">
              <p className="font-semibold">{order.shipping_address.full_name}</p>
              <p>{order.shipping_address.street_address} {order.shipping_address.apartment}</p>
              <p>{order.shipping_address.city}, {order.shipping_address.state_province} {order.shipping_address.postal_code}</p>
              <p>{order.shipping_address.country}</p>
              {order.shipping_address.phone && <p>Tel: {order.shipping_address.phone}</p>}
            </div>
          </div>

          <div>
            <strong className="block text-[#29251F] uppercase font-bold tracking-wider mb-1">
              Payment & Security Details
            </strong>
            <div className="space-y-1">
              <p>Method: <strong className="text-stone-900">{order.payment_method}</strong></p>
              <p>Payment Status: <span className="text-emerald-700 font-semibold">{order.payment_status}</span></p>
              <p>Idempotency Token: <code className="bg-stone-100 p-0.5 rounded text-[10px]">{order.payment_idempotency_key?.slice(0, 16)}...</code></p>
              {order.notes && <p className="italic text-stone-500 pt-1">Note: "{order.notes}"</p>}
            </div>
          </div>
        </div>

        {/* Order Items Snapshot */}
        <div>
          <h2 className="font-serif text-lg font-bold text-[#29251F] mb-4">Immutable Line Items</h2>
          <div className="space-y-4 divide-y divide-[#E8D9C5]">
            {order.items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  {item.product_image_snapshot && (
                    <img
                      src={item.product_image_snapshot}
                      alt={item.product_title_snapshot}
                      className="w-16 h-16 rounded object-cover border border-[#E8D9C5]"
                    />
                  )}
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#29251F]">{item.product_title_snapshot}</h3>
                    <p className="text-stone-500 text-xs">
                      Artisan Studio: <strong>{item.artisan_name_snapshot}</strong>
                    </p>
                    <p className="text-stone-500 text-xs mt-0.5">
                      Qty: {item.quantity} × ${item.unit_price_snapshot.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-serif font-bold text-base text-[#29251F]">
                    ${item.total_price_snapshot.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Fulfillment: <strong className="text-stone-700 capitalize">{item.artisan_fulfillment_status}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="pt-6 border-t border-[#E8D9C5] max-w-xs ml-auto space-y-2 text-xs text-stone-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>{order.shipping_cost === 0 ? 'Complimentary' : `$${order.shipping_cost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Craft Tax:</span>
            <span>${order.tax_amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-serif text-lg font-bold text-[#8A4935] pt-2 border-t border-[#E8D9C5]">
            <span>Total Paid:</span>
            <span>${order.total_amount.toFixed(2)} USD</span>
          </div>
        </div>

      </div>
    </div>
  );
};
