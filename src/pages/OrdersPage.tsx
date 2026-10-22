import React, { useState } from 'react';
import { Package, Heart, ExternalLink, Calendar, MapPin, Truck, ChevronRight } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { useAuth } from '../lib/auth-context';
import { useWishlist } from '../lib/wishlist-context';
import { db } from '../lib/db';
import { ProductCard } from '../components/common/ProductCard';

export const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { wishlistIds } = useWishlist();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist'>('orders');

  // Load customer orders from store
  const allOrders = db.getOrdersForUser(user?.id || 'user-customer-1');

  // Load wishlist products
  const wishlistProducts = wishlistIds
    .map((id) => db.getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== null);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded text-xs font-semibold">Delivered</span>;
      case 'shipped':
        return <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded text-xs font-semibold">In Transit</span>;
      case 'in_production':
        return <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded text-xs font-semibold">In Studio Production</span>;
      case 'processing':
      default:
        return <span className="bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded text-xs font-semibold">Received by Artisan</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8D9C5] gap-4 mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A4935] block mb-1">
            Customer Account
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#29251F]">
            {user ? `${user.full_name}'s Craft Studio Hub` : 'My Orders & Saved Pieces'}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Track handmade creations from loom and kiln to your doorstep.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#FFFDF9] border border-[#E8D9C5] rounded p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-[#8A4935] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({allOrders.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded transition-colors flex items-center gap-1.5 ${
              activeTab === 'wishlist' ? 'bg-[#8A4935] text-white' : 'text-stone-700 hover:text-black'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Pieces ({wishlistProducts.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        allOrders.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-12 text-center space-y-4">
            <Package className="w-12 h-12 text-stone-400 mx-auto" />
            <h2 className="font-serif text-xl font-bold text-[#29251F]">No Orders Placed Yet</h2>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              When you patronize our artisan studios, your order snapshots, provenance records and tracking appear here.
            </p>
            <Link
              to="/shop"
              className="inline-block px-5 py-2.5 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B]"
            >
              Browse Handcrafted Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {allOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] overflow-hidden shadow-xs hover:border-[#8A4935] transition-colors"
              >
                {/* Header Strip */}
                <div className="bg-[#F7F0E5] px-6 py-4 border-b border-[#E8D9C5] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Order Number</span>
                      <span className="font-serif font-bold text-sm text-[#29251F]">{order.order_number}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Date Placed</span>
                      <span className="font-medium text-stone-800">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Total Amount</span>
                      <span className="font-bold text-[#8A4935]">${order.total_amount.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {statusBadge(order.order_status)}
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8A4935] hover:underline"
                    >
                      <span>View Full Invoice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-6 divide-y divide-[#E8D9C5]/50">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        {item.product_image_snapshot && (
                          <img
                            src={item.product_image_snapshot}
                            alt={item.product_title_snapshot}
                            className="w-14 h-14 rounded object-cover border border-[#E8D9C5]"
                          />
                        )}
                        <div>
                          <div className="font-serif font-bold text-sm text-[#29251F]">{item.product_title_snapshot}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            Crafted by <strong className="text-stone-700">{item.artisan_name_snapshot}</strong>
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Qty: {item.quantity} × ${item.unit_price_snapshot.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-serif font-bold text-sm text-[#29251F]">
                          ${item.total_price_snapshot.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-stone-500 font-medium">
                          Status: {item.artisan_fulfillment_status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-12 text-center space-y-4">
              <Heart className="w-12 h-12 text-stone-400 mx-auto" />
              <h2 className="font-serif text-xl font-bold text-[#29251F]">Your Wishlist is Empty</h2>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Save pieces you love while browsing to revisit them later or inspect workshop details.
              </p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2.5 bg-[#8A4935] text-white text-xs font-semibold rounded hover:bg-[#753C2B]"
              >
                Explore Catalogue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
