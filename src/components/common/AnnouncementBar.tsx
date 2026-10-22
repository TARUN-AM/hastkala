import React from 'react';
import { Sparkles, Truck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#7E1726] text-[#FBF9F4] px-4 py-2 text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-3">
      <div className="flex items-center gap-1.5">
        <Truck className="w-3.5 h-3.5 text-[#E6E0DB]" />
        <span>Complimentary carbon-neutral shipping on artisan orders over $150</span>
      </div>
      <span className="hidden md:inline text-[#E6E0DB]">•</span>
      <div className="hidden md:flex items-center gap-1.5 text-[#E6E0DB]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Direct from verified independent studios</span>
      </div>
    </div>
  );
};
