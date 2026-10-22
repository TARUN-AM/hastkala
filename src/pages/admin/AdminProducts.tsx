import React, { useState } from 'react';
import { Eye, Check, X, ShieldAlert, Award } from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { Product, ProductStatus, VerificationStatus } from '../../types/database';
import { AdminLayout } from './AdminLayout';
import { ProvenanceBadge } from '../../components/common/ProvenanceBadge';

export const AdminProducts: React.FC = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const { products } = db.getProducts({ status: 'all', limit: 100 });

  const handleUpdateStatus = (prod: Product, newStatus: ProductStatus) => {
    if (user) {
      db.updateProduct(prod.id, { status: newStatus }, user);
      setRefreshKey((k) => k + 1);
    }
  };

  const handleUpdateVerification = (prod: Product, newStatus: VerificationStatus) => {
    if (user) {
      db.updateProduct(prod.id, { verification_status: newStatus }, user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#29251F]">Platform Product Curation</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit artisan listings, assign verification badges, and approve pieces for the public marketplace.
          </p>
        </div>

        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#F7F0E5] border-b border-[#E8D9C5] text-[11px] uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Listing</th>
                  <th className="py-3.5 px-4 font-semibold">Artisan Studio</th>
                  <th className="py-3.5 px-4 font-semibold">Price</th>
                  <th className="py-3.5 px-4 font-semibold">Stock</th>
                  <th className="py-3.5 px-4 font-semibold">Provenance Evidence</th>
                  <th className="py-3.5 px-4 font-semibold">Marketplace Visibility</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D9C5]">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#F7F0E5]/50 transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images?.[0]?.image_url}
                          alt={prod.title}
                          className="w-12 h-12 rounded object-cover border border-[#E8D9C5]"
                        />
                        <div>
                          <div className="font-semibold text-[#29251F] line-clamp-1">{prod.title}</div>
                          <span className="text-[11px] text-stone-500">{prod.craft_type}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-stone-800">
                      {prod.artisan?.business_name || 'Independent Artisan'}
                    </td>

                    <td className="py-3 px-4 font-serif font-bold text-[#29251F]">
                      ${prod.price.toFixed(2)}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold">{prod.stock_quantity} units</span>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={prod.verification_status}
                        onChange={(e) => handleUpdateVerification(prod, e.target.value as VerificationStatus)}
                        className="bg-white border border-[#E8D9C5] rounded px-2 py-1 text-[11px] font-medium"
                      >
                        <option value="guild_verified">Guild Verified</option>
                        <option value="admin_verified">Studio Inspected</option>
                        <option value="submitted">Evidence Submitted</option>
                        <option value="unverified">Unverified</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={prod.status}
                        onChange={(e) => handleUpdateStatus(prod, e.target.value as ProductStatus)}
                        className="bg-white border border-[#E8D9C5] rounded px-2 py-1 text-[11px] font-semibold"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/products/${prod.slug}`}
                        className="p-1.5 text-stone-600 hover:text-black inline-block"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
