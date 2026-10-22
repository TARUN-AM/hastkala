import React, { useState } from 'react';
import { PlusCircle, Edit3, Trash2, Eye, ExternalLink } from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { Product, ProductStatus } from '../../types/database';
import { StudioLayout } from './StudioLayout';
import { ProvenanceBadge } from '../../components/common/ProvenanceBadge';

export const StudioProducts: React.FC = () => {
  const { user } = useAuth();
  const artisan = user ? db.getArtisanByUserId(user.id) : null;
  const artisanId = artisan?.id || 'artisan-1';

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const { products } = db.getProducts({
    artisanId,
    status: 'all',
    limit: 50,
  });

  const filtered = filterStatus === 'all'
    ? products
    : products.filter((p) => p.status === filterStatus);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      if (user) {
        db.deleteProduct(id, user);
        setRefreshKey((k) => k + 1);
      }
    }
  };

  const handleStatusChange = (product: Product, newStatus: ProductStatus) => {
    if (user) {
      db.updateProduct(product.id, { status: newStatus }, user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <StudioLayout>
      <div className="space-y-6">
        
        {/* Subhead & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#29251F]">Workshop Listings</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage inventory, pricing, and publication status for your handmade pieces.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#FFFDF9] border border-[#E8D9C5] rounded px-3 py-2 text-xs font-medium text-stone-800"
            >
              <option value="all">All Statuses ({products.length})</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="pending_review">Pending Review</option>
            </select>

            <Link
              to="/studio/products/new"
              className="px-4 py-2 bg-[#8A4935] hover:bg-[#753C2B] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Piece</span>
            </Link>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] overflow-hidden shadow-xs">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No listings match your selected filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#F7F0E5] border-b border-[#E8D9C5] text-[11px] uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Craft Piece</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold">Stock</th>
                    <th className="py-3.5 px-4 font-semibold">Provenance</th>
                    <th className="py-3.5 px-4 font-semibold">Publication Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D9C5]">
                  {filtered.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#F7F0E5]/50 transition-colors">
                      
                      {/* Product Name & Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images?.[0]?.image_url}
                            alt={prod.title}
                            className="w-12 h-12 rounded object-cover border border-[#E8D9C5]"
                          />
                          <div>
                            <Link to={`/products/${prod.slug}`} className="font-semibold text-[#29251F] hover:text-[#8A4935] line-clamp-1">
                              {prod.title}
                            </Link>
                            <span className="text-[11px] text-stone-500">{prod.craft_type}</span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-serif font-bold text-stone-900">
                        ${prod.price.toFixed(2)}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${prod.stock_quantity <= 2 ? 'text-amber-700' : 'text-stone-800'}`}>
                          {prod.stock_quantity} in studio
                        </span>
                      </td>

                      {/* Provenance */}
                      <td className="py-3 px-4">
                        <ProvenanceBadge status={prod.verification_status} />
                      </td>

                      {/* Status Selector */}
                      <td className="py-3 px-4">
                        <select
                          value={prod.status}
                          onChange={(e) => handleStatusChange(prod, e.target.value as ProductStatus)}
                          className="bg-white border border-[#E8D9C5] rounded px-2 py-1 text-[11px] font-medium"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="pending_review">Pending Review</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/studio/products/${prod.id}/edit`}
                            className="p-1.5 text-stone-600 hover:text-[#8A4935] rounded hover:bg-stone-100"
                            title="Edit Piece"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/products/${prod.slug}`}
                            className="p-1.5 text-stone-600 hover:text-black rounded hover:bg-stone-100"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(prod.id, prod.title)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded hover:bg-stone-100"
                            title="Delete Piece"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </StudioLayout>
  );
};
