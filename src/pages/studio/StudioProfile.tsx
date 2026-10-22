import React, { useState } from 'react';
import { User, MapPin, Award, Check } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { db } from '../../lib/db';
import { StudioLayout } from './StudioLayout';

export const StudioProfile: React.FC = () => {
  const { user } = useAuth();
  const artisan = user ? db.getArtisanByUserId(user.id) : null;
  const initialArtisan = artisan || db.getArtisans()[0];

  const [businessName, setBusinessName] = useState(initialArtisan.business_name);
  const [craftSpecialty, setCraftSpecialty] = useState(initialArtisan.craft_specialty);
  const [region, setRegion] = useState(initialArtisan.region);
  const [workshopLocation, setWorkshopLocation] = useState(initialArtisan.workshop_location || '');
  const [yearsExperience, setYearsExperience] = useState(initialArtisan.years_of_experience);
  const [bio, setBio] = useState(initialArtisan.bio);
  const [story, setStory] = useState(initialArtisan.story || '');
  const [avatarUrl, setAvatarUrl] = useState(initialArtisan.avatar_url || '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialArtisan.cover_image_url || '');

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    db.updateArtisanProfile(
      initialArtisan.id,
      {
        business_name: businessName,
        craft_specialty: craftSpecialty,
        region,
        workshop_location: workshopLocation,
        years_of_experience: Number(yearsExperience),
        bio,
        story,
        avatar_url: avatarUrl,
        cover_image_url: coverImageUrl,
      },
      user
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <StudioLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#29251F]">Artisan Studio Profile</h2>
          <p className="text-xs text-stone-500 mt-0.5">
            This public profile introduces patrons to your craftsmanship heritage, workshop location, and making philosophy.
          </p>
        </div>

        {saved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Studio profile changes saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 space-y-5 text-xs shadow-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-semibold mb-1">Studio / Brand Name *</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800 font-semibold"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Craft Discipline Specialty *</label>
              <input
                type="text"
                required
                value={craftSpecialty}
                onChange={(e) => setCraftSpecialty(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Craft Region & State *</label>
              <input
                type="text"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Years of Dedicated Practice</label>
              <input
                type="number"
                min="0"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-700 font-semibold mb-1">Physical Workshop Address / Shed</label>
              <input
                type="text"
                value={workshopLocation}
                onChange={(e) => setWorkshopLocation(e.target.value)}
                placeholder="e.g. Heritage Loom Shed, Kelger Road, Dharwad"
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-700 font-semibold mb-1">Studio Short Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800 leading-relaxed"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-700 font-semibold mb-1">Artisan Heritage Story & Lineage</label>
              <textarea
                rows={4}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800 leading-relaxed font-light"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Artisan Portrait URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">Studio Cover / Workshop Photo URL</label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E8D9C5]">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#8A4935] hover:bg-[#753C2B] text-white font-semibold rounded shadow-xs cursor-pointer"
            >
              Save Profile Updates
            </button>
          </div>

        </form>
      </div>
    </StudioLayout>
  );
};
