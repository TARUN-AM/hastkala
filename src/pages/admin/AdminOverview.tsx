import React, { useState } from 'react';
import { ShieldCheck, Award, FileCheck2, Users, Package, ShoppingBag, ArrowRight, Check, X } from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { AdminLayout } from './AdminLayout';
import { VerificationStatus } from '../../types/database';

export const AdminOverview: React.FC = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const { products } = db.getProducts({ status: 'all', limit: 100 });
  const artisans = db.getArtisans();
  const orders = user ? db.getAllOrders(user) : [];
  const provenanceRecords = db.getProvenanceRecords();

  const totalGMV = orders.reduce((sum, o) => sum + o.total_amount, 0);

  const handleReviewProvenance = (id: string, status: VerificationStatus) => {
    if (user) {
      db.reviewProvenance(id, status, 'Inspected by lead curator', user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFDF9] p-5 rounded-lg border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Platform GMV</span>
              <ShoppingBag className="w-4 h-4 text-[#34483A]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#34483A]">${totalGMV.toFixed(2)}</div>
            <div className="text-[11px] text-stone-500 mt-1">{orders.length} total patron orders</div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-lg border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Active Artisans</span>
              <Users className="w-4 h-4 text-[#8A4935]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{artisans.length}</div>
            <div className="text-[11px] text-emerald-700 mt-1">100% verified guilds & workshops</div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-lg border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Catalog Pieces</span>
              <Package className="w-4 h-4 text-stone-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{products.length}</div>
            <div className="text-[11px] text-stone-500 mt-1">
              {products.filter((p) => p.status === 'published').length} published listings
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-lg border border-[#E8D9C5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Provenance Records</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#29251F]">{provenanceRecords.length}</div>
            <div className="text-[11px] text-stone-500 mt-1">Documentary certificates verified</div>
          </div>
        </div>

        {/* Provenance Evidence Review Queue */}
        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#34483A]" />
              <h2 className="font-serif text-xl font-bold text-[#29251F]">
                Provenance Documentary Review Queue
              </h2>
            </div>
            <span className="text-xs text-stone-500">Evidence-based authentication</span>
          </div>

          <div className="divide-y divide-[#E8D9C5] text-xs">
            {provenanceRecords.map((rec) => (
              <div key={rec.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 uppercase text-[10px] bg-[#F7F0E5] px-2 py-0.5 rounded border border-[#E8D9C5]">
                      {rec.document_type.replace('_', ' ')}
                    </span>
                    <span className="font-semibold text-emerald-800 capitalize">{rec.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-stone-700 font-medium">{rec.notes}</p>
                  <a
                    href={rec.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8A4935] hover:underline text-[11px]"
                  >
                    View submitted documentary photograph / certificate →
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleReviewProvenance(rec.id, 'guild_verified')}
                    className="px-3 py-1.5 bg-[#34483A] text-white rounded font-medium flex items-center gap-1 hover:bg-[#253329]"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Guild</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewProvenance(rec.id, 'admin_verified')}
                    className="px-3 py-1.5 bg-[#8A4935] text-white rounded font-medium flex items-center gap-1 hover:bg-[#753C2B]"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Studio Inspected</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};
