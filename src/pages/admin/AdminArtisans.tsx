import React, { useState } from 'react';
import { Award, ShieldCheck, MapPin, Eye, ExternalLink } from 'lucide-react';
import { Link } from '../../lib/router';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { ArtisanProfile, VerificationStatus } from '../../types/database';
import { AdminLayout } from './AdminLayout';
import { ProvenanceBadge } from '../../components/common/ProvenanceBadge';

export const AdminArtisans: React.FC = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const artisans = db.getArtisans();

  const handleUpdateStatus = (artisan: ArtisanProfile, status: VerificationStatus) => {
    if (user) {
      db.updateArtisanProfile(artisan.id, { verification_status: status }, user);
      setRefreshKey((k) => k + 1);
    }
  };

  const handleToggleApproval = (artisan: ArtisanProfile, isApproved: boolean) => {
    if (user) {
      db.updateArtisanProfile(artisan.id, { is_approved: isApproved }, user);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#29251F]">Artisan Guilds & Studio Directory</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Audit maker identities, verify guild memberships, and award provenance credentials.
          </p>
        </div>

        <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700">
              <thead className="bg-[#F7F0E5] border-b border-[#E8D9C5] text-[11px] uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Artisan & Studio</th>
                  <th className="py-3.5 px-4 font-semibold">Craft Specialty</th>
                  <th className="py-3.5 px-4 font-semibold">Region</th>
                  <th className="py-3.5 px-4 font-semibold">Experience</th>
                  <th className="py-3.5 px-4 font-semibold">Verification Credential</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8D9C5]">
                {artisans.map((artisan) => (
                  <tr key={artisan.id} className="hover:bg-[#F7F0E5]/50 transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={artisan.avatar_url}
                          alt={artisan.business_name}
                          className="w-10 h-10 rounded-full object-cover border border-[#E8D9C5]"
                        />
                        <div>
                          <div className="font-semibold text-[#29251F]">{artisan.business_name}</div>
                          <span className="text-[11px] text-stone-500">{artisan.workshop_location || artisan.region}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-medium text-stone-800">
                      {artisan.craft_specialty}
                    </td>

                    <td className="py-3 px-4 text-stone-600">
                      {artisan.region}
                    </td>

                    <td className="py-3 px-4">
                      {artisan.years_of_experience} years
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={artisan.verification_status}
                        onChange={(e) => handleUpdateStatus(artisan, e.target.value as VerificationStatus)}
                        className="bg-white border border-[#E8D9C5] rounded px-2 py-1 text-[11px] font-semibold text-[#8A4935]"
                      >
                        <option value="guild_verified">Guild Verified</option>
                        <option value="admin_verified">Studio Inspected</option>
                        <option value="submitted">Submitted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleApproval(artisan, !artisan.is_approved)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                          artisan.is_approved
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {artisan.is_approved ? 'Approved' : 'Pending'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/artisans/${artisan.slug}`}
                        className="p-1.5 text-stone-600 hover:text-black inline-block"
                        title="View Public Profile"
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
