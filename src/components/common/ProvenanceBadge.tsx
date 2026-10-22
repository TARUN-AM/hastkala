import React, { useState } from 'react';
import { ShieldCheck, Award, FileCheck2, Info } from 'lucide-react';
import { VerificationStatus } from '../../types/database';

interface ProvenanceBadgeProps {
  status: VerificationStatus;
  notes?: string;
  showDetails?: boolean;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ status, notes, showDetails = false }) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  if (status === 'unverified') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
        <Info className="w-3 h-3" />
        Unverified Listing
      </span>
    );
  }

  const config = {
    guild_verified: {
      label: 'Guild Verified',
      icon: Award,
      badgeClass: 'bg-[#EBF0EC] text-[#34483A] border-[#34483A]/20',
      description: 'Documented membership in a recognized artisan guild or cooperative with inspected hand-making standards.',
    },
    admin_verified: {
      label: 'Studio Inspected',
      icon: ShieldCheck,
      badgeClass: 'bg-[#F6ECE6] text-[#8A4935] border-[#8A4935]/25',
      description: 'Workshop, tools, and material provenance reviewed and documented by Hastkala curation team.',
    },
    submitted: {
      label: 'Evidence Submitted',
      icon: FileCheck2,
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'Provenance records submitted by artisan; pending curator validation.',
    },
    rejected: {
      label: 'Revision Required',
      icon: Info,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Additional documentation requested for authenticity verification.',
    },
  }[status] || {
    label: 'Craft Documented',
    icon: ShieldCheck,
    badgeClass: 'bg-stone-100 text-stone-700 border-stone-300',
    description: 'Documented studio craft piece.',
  };

  const Icon = config.icon;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpenTooltip(!openTooltip)}
        onMouseEnter={() => setOpenTooltip(true)}
        onMouseLeave={() => setOpenTooltip(false)}
        className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-sm border transition-colors cursor-help ${config.badgeClass}`}
        aria-label={`Authenticity: ${config.label}`}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{config.label}</span>
      </button>

      {(openTooltip || showDetails) && (
        <div className="absolute z-30 bottom-full left-0 mb-2 w-64 p-2.5 bg-[#29251F] text-[#F7F0E5] text-xs rounded shadow-xl pointer-events-none border border-stone-700">
          <p className="font-semibold text-[#E8D9C5] mb-1">{config.label}</p>
          <p className="leading-relaxed text-stone-300">{notes || config.description}</p>
          <div className="mt-1.5 pt-1 border-t border-stone-700 text-[10px] text-stone-400">
            Backed by physical inspection & documentary evidence
          </div>
        </div>
      )}
    </div>
  );
};
