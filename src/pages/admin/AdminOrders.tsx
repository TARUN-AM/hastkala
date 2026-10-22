import React, { useState } from 'react';
import { ShoppingBag, Eye, Calendar, MapPin } from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { Order, OrderStatus } from '../../types/database';
import { AdminLayout } from './AdminLayout';

export const AdminOrders: React.FC = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const orders = user ? db.getAllOrders(user) : [];

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    if (user) {
      db.updateOrderStatus(orderId, status, user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#29251F]">Platform Order Oversight</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor patron transactions, atomic stock decrements, and courier fulfillment pipelines.
          </p>
        </div>

        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] overflow-hidden shadow-xs">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No orders placed in this session yet. Complete a checkout in the shop to test platform order tracking.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#F7F0E5] border-b border-[#E8D9C5] text-[11px] uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Order #</th>
                    <th className="py-3.5 px-4 font-semibold">Patron Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Items</th>
                    <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Payment Status</th>
                    <th className="py-3.5 px-4 font-semibold">Platform Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D9C5]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F7F0E5]/50 transition-colors">
                      
                      <td className="py-3 px-4 font-serif font-bold text-[#8A4935]">
                        {o.order_number}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#29251F]">{o.customer_name}</div>
                        <span className="text-[11px] text-stone-500">{o.customer_email}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold">{o.items.length} artisan pieces</span>
                      </td>

                      <td className="py-3 px-4 font-serif font-bold text-[#29251F]">
                        ${o.total_amount.toFixed(2)} USD
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          {o.payment_status}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={o.order_status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-white border border-[#E8D9C5] rounded px-2 py-1 text-[11px] font-medium"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="in_production">In Production</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/orders/${o.id}`}
                          className="p-1.5 text-stone-600 hover:text-[#8A4935] inline-block"
                          title="View Invoice Snapshot"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};
