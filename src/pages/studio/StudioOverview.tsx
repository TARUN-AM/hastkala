import React, { useState } from 'react';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  PlusCircle,
  FileSpreadsheet,
  Building2,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Send,
} from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { StudioLayout } from './StudioLayout';
import { BulkEnquiry, EnquiryStatus } from '../../types/database';
import { formatPrice } from '../../utils/formatters';

export const StudioOverview: React.FC = () => {
  const { user } = useAuth();
  const artisan = user ? db.getArtisanByUserId(user.id) : null;
  const artisanId = artisan?.id || 'artisan-kanday-anjanappa';

  const { products } = db.getProducts({ artisanId, status: 'all', limit: 50 });
  const artisanOrders = db.getOrdersForArtisan(artisanId);
  const artisanEnquiries = db.getEnquiries({ artisanId });

  const totalRevenue = artisanOrders.reduce((sum, o) => sum + o.item.total_price_snapshot, 0);
  const lowStockProducts = products.filter((p) => p.stock_quantity <= 3);

  const [selectedEnquiry, setSelectedEnquiry] = useState<BulkEnquiry | null>(null);
  const [responseNotes, setResponseNotes] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  // CSV Catalogue Exporter
  const handleExportCatalogueCSV = () => {
    const published = products.filter((p) => p.status === 'published');
    if (published.length === 0) {
      alert('No published products found in catalogue to export.');
      return;
    }

    const headers = [
      'Product ID',
      'Title',
      'Craft Specialty',
      'Region',
      'Materials',
      'Price',
      'Currency',
      'Stock Quantity',
      'Status',
      'Product URL',
    ];

    const rows = published.map((p) => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.craft_type.replace(/"/g, '""')}"`,
      `"${p.region_of_origin.replace(/"/g, '""')}"`,
      `"${p.materials.join(', ').replace(/"/g, '""')}"`,
      p.price,
      p.currency,
      p.stock_quantity,
      p.status,
      `https://hastkala.dev/products/${p.slug}`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hastkala_catalogue_${artisan?.slug || 'artisan'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateEnquiryStatus = (id: string, status: EnquiryStatus) => {
    db.updateEnquiryStatus(id, status, responseNotes);
    setUpdateMsg(`Enquiry status updated to "${status}"`);
    setTimeout(() => setUpdateMsg(''), 3000);
    setSelectedEnquiry(null);
    setResponseNotes('');
  };

  return (
    <StudioLayout>
      <div className="space-y-8 pb-12">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Catalog Pieces</span>
              <Package className="w-4 h-4 text-[#7E1726]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{products.length}</div>
            <div className="text-[11px] text-emerald-700 mt-1">
              {products.filter((p) => p.status === 'published').length} active in public shop
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Studio Orders</span>
              <Clock className="w-4 h-4 text-[#34483A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{artisanOrders.length}</div>
            <div className="text-[11px] text-stone-500 mt-1">
              {artisanOrders.filter((o) => o.item.artisan_fulfillment_status === 'processing').length} awaiting fulfillment
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Bulk Buyer Enquiries</span>
              <Building2 className="w-4 h-4 text-[#8B6B4A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#7E1726]">{artisanEnquiries.length}</div>
            <div className="text-[11px] text-stone-500 mt-1">
              {artisanEnquiries.filter((e) => e.status === 'open').length} open wholesale requests
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Inventory Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{lowStockProducts.length}</div>
            <div className="text-[11px] text-amber-700 mt-1">Pieces with low studio stock</div>
          </div>

          {/* New Performance Insight Card */}
          <div className="bg-[#FFFDF9] p-5 rounded-xl border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Top Product Trend</span>
              <TrendingUp className="w-4 h-4 text-[#34483A]" />
            </div>
            <div className="font-serif text-lg font-bold text-[#29251F] truncate">
              {products.sort((a, b) => b.stock_quantity - a.stock_quantity)[0]?.title || 'N/A'}
            </div>
            <div className="text-[11px] text-stone-600 mt-1">
              Highest inventory demand tracked
            </div>
          </div>
        </div>

        {/* Studio Actions & Catalogue Export Bar */}
        <div className="bg-[#FAF5EE] rounded-xl border border-[#E8D9C5] p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#29251F]">Artisan Studio & AI Tools</h2>
            <p className="text-xs text-stone-600">
              Create listings with AI voice input, enhance smartphone product photos, and export CSV catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCatalogueCSV}
              className="px-4 py-2 bg-white hover:bg-stone-50 text-[#29251F] border border-[#E8D9C5] text-xs font-semibold rounded inline-flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Export Catalogue (CSV)</span>
            </button>

            <Link
              to="/studio/products/new"
              className="px-5 py-2 bg-[#7E1726] hover:bg-[#67121F] text-white text-xs font-semibold rounded inline-flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch AI Product Studio</span>
            </Link>
          </div>
        </div>

        {/* Section: Bulk Wholesale Buyer Enquiries */}
        <div className="bg-[#FFFDF9] rounded-xl border border-[#E8D9C5] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5]">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#29251F]">
                Bulk Wholesale & Institutional Enquiries
              </h2>
              <p className="text-xs text-stone-500">
                Direct buyer requests from boutiques, heritage hotels, and cultural organizations
              </p>
            </div>
            <span className="text-xs font-bold bg-[#FAF5EE] text-[#7E1726] border border-[#E8D9C5] px-2.5 py-1 rounded-full">
              {artisanEnquiries.length} Enquiries Recorded
            </span>
          </div>

          {updateMsg && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded">
              {updateMsg}
            </div>
          )}

          {artisanEnquiries.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No bulk buyer enquiries received yet. Wholesale requests submitted by buyers will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {artisanEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 bg-[#FAF5EE] rounded-lg border border-[#E8D9C5] space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8D9C5]/80 pb-2">
                    <div>
                      <span className="font-bold text-stone-900 text-sm">{enq.buyer_name}</span>
                      {enq.organization_name && (
                        <span className="text-stone-500 font-medium ml-2">• {enq.organization_name}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          enq.status === 'open'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : enq.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : enq.status === 'responded'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-700">
                    <div>
                      <strong className="text-stone-900">Craft Interest:</strong> {enq.craft_interest || enq.product_title || 'Craft Collection'}
                    </div>
                    <div>
                      <strong className="text-stone-900">Requested Quantity:</strong> {enq.requested_quantity} units
                    </div>
                    <div>
                      <strong className="text-stone-900">Target Delivery:</strong> {enq.target_delivery_date || 'Flexible'}
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E8D9C5] text-stone-800 italic">
                    "{enq.message}"
                  </div>

                  {enq.response_notes && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                      <strong>Artisan Response Note:</strong> {enq.response_notes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="text-[11px] text-stone-500">
                      Contact: <strong>{enq.buyer_email}</strong> {enq.buyer_phone ? `• ${enq.buyer_phone}` : ''}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'in_progress')}
                        className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-[#E8D9C5] text-stone-800 text-[11px] font-semibold rounded"
                      >
                        Mark In Progress
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'responded')}
                        className="px-2.5 py-1 bg-[#7E1726] hover:bg-[#67121F] text-white text-[11px] font-semibold rounded"
                      >
                        Mark Responded
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders for this Artisan */}
        <div className="bg-[#FFFDF9] rounded-xl border border-[#E8D9C5] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5]">
            <h2 className="font-serif text-lg font-bold text-[#29251F]">Recent Workshop Orders</h2>
            <Link to="/studio/orders" className="text-xs font-semibold text-[#7E1726] hover:underline">
              View all orders →
            </Link>
          </div>

          {artisanOrders.length === 0 ? (
            <div className="py-6 text-center text-xs text-stone-500">
              No orders placed for your craft items yet. When patrons checkout, fulfillment requests appear here.
            </div>
          ) : (
            <div className="divide-y divide-[#E8D9C5]/60 text-xs">
              {artisanOrders.slice(0, 4).map(({ order, item }) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.product_image_snapshot && (
                      <img
                        src={item.product_image_snapshot}
                        alt={item.product_title_snapshot}
                        className="w-10 h-10 rounded object-cover border border-[#E8D9C5]"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-[#29251F]">{item.product_title_snapshot}</div>
                      <div className="text-[11px] text-stone-500">
                        Order {order.order_number} • Qty {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#7E1726]">
                      {formatPrice(item.total_price_snapshot, order.currency)}
                    </div>
                    <span className="text-[10px] text-stone-500 capitalize">
                      {item.artisan_fulfillment_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </StudioLayout>
  );
};
