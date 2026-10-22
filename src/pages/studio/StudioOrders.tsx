import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { OrderStatus } from '../../types/database';
import { StudioLayout } from './StudioLayout';

export const StudioOrders: React.FC = () => {
  const { user } = useAuth();
  const artisan = user ? db.getArtisanByUserId(user.id) : null;
  const artisanId = artisan?.id || 'artisan-1';

  const [refreshKey, setRefreshKey] = useState(0);
  const artisanOrders = db.getOrdersForArtisan(artisanId);

  const handleStatusUpdate = (orderId: string, itemId: string, newStatus: OrderStatus) => {
    if (user) {
      db.updateOrderItemFulfillment(orderId, itemId, newStatus, user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <StudioLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#29251F]">Artisan Studio Orders</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage production, careful packaging, and courier handover for orders containing your craft creations.
          </p>
        </div>

        {artisanOrders.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-12 text-center text-xs text-stone-500">
            No orders have been received for your workshop yet. When a patron places an order, it will appear here.
          </div>
        ) : (
          <div className="space-y-4">
            {artisanOrders.map(({ order, item }) => (
              <div
                key={item.id}
                className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-5 shadow-xs space-y-4 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E8D9C5] gap-2">
                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-sm text-[#29251F]">
                      Order #{order.order_number}
                    </span>
                    <span className="text-stone-500">
                      Placed: {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Fulfillment Status Selector */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-600">Your Item Status:</span>
                    <select
                      value={item.artisan_fulfillment_status}
                      onChange={(e) => handleStatusUpdate(order.id, item.id, e.target.value as OrderStatus)}
                      className="bg-[#F7F0E5] border border-[#E8D9C5] rounded px-3 py-1 text-xs font-semibold text-[#8A4935] cursor-pointer"
                    >
                      <option value="processing">Received / Queueing</option>
                      <option value="in_production">In Production</option>
                      <option value="shipped">Handed to Courier</option>
                      <option value="delivered">Delivered to Patron</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item Summary */}
                  <div className="flex items-center gap-3">
                    {item.product_image_snapshot && (
                      <img
                        src={item.product_image_snapshot}
                        alt={item.product_title_snapshot}
                        className="w-14 h-14 rounded object-cover border border-[#E8D9C5]"
                      />
                    )}
                    <div>
                      <div className="font-serif font-bold text-sm text-[#29251F]">
                        {item.product_title_snapshot}
                      </div>
                      <div className="text-stone-500">
                        Qty: <strong>{item.quantity}</strong> × ${item.unit_price_snapshot.toFixed(2)}
                      </div>
                      <div className="font-bold text-[#8A4935] mt-0.5">
                        Item Subtotal: ${item.total_price_snapshot.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-[#F7F0E5] p-3 rounded border border-[#E8D9C5]/80 text-stone-700">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#8A4935] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Ship To:</strong> {order.shipping_address.full_name} ({order.customer_email})
                        <div className="text-[11px] text-stone-600 mt-0.5">
                          {order.shipping_address.street_address}, {order.shipping_address.city}, {order.shipping_address.state_province} {order.shipping_address.postal_code}
                        </div>
                        {order.notes && (
                          <div className="italic text-[11px] text-stone-500 mt-1">
                            Note: "{order.notes}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </StudioLayout>
  );
};
