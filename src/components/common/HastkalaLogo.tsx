import React from 'react';
import { Link } from '../../lib/router';

interface HastkalaLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

const LOGO_ASSET_SRC = '/assets/aistudio/HASTKALA_Heritage_Artisan_Logo_84d9e939.png';

/**
 * HastkalaLogoMark - Compact authentic ornamental emblem.
 * Uses the approved heritage medallion from the Hastkala brand identity.
 */
export const HastkalaLogoMark: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}> = ({ size = 'md', variant = 'light', className = '' }) => {
  const dimensions = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
  }[size];

  const isDark = variant === 'dark';

  return (
    <div
      className={`relative ${dimensions} rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs ${
        isDark ? 'bg-[#F8F3EB] ring-1 ring-[#E8D9C5]/80' : 'bg-[#FFFDF9]'
      } ${className}`}
      aria-label="Hastkala Heritage Emblem"
    >
      {/* Precision crop focused exclusively on the authentic top ornamental kalash/lotus medallion */}
      <img
        src={LOGO_ASSET_SRC}
        alt="Hastkala Emblem"
        className="absolute w-[290%] max-w-none left-1/2 -translate-x-1/2 -translate-y-[14%] mix-blend-multiply pointer-events-none select-none"
        loading="eager"
      />
    </div>
  );
};

/**
 * HastkalaLogo - Primary customer-facing brand mark.
 * Integrates the complete ornamental Indian heritage burgundy logo with medallion,
 * wordmark, and tagline, centered and scaled for premium editorial presentation.
 */
export const HastkalaLogo: React.FC<HastkalaLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isDark = variant === 'dark';

  // Responsive heights calibrated for two-row header and feature placements
  const heightClasses = {
    sm: 'h-11 sm:h-12',
    md: 'h-16 sm:h-[70px] md:h-[74px]',
    lg: 'h-20 sm:h-24 md:h-28',
  }[size];

  return (
    <Link
      to="/"
      className={`group inline-flex flex-col items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#8A4935] rounded-sm transition-transform duration-200 active:scale-98 select-none ${className}`}
      aria-label="Hastkala — The art of handmade. The soul of India."
    >
      {isDark ? (
        // Dark variant: Elegant warm ivory cartouche badge housing the authentic burgundy logo
        <div className="bg-[#F8F3EB] px-4 py-1.5 rounded-lg border border-[#E8D9C5] shadow-md transition-shadow group-hover:shadow-lg">
          <img
            src={LOGO_ASSET_SRC}
            alt="Hastkala — The art of handmade. The soul of India."
            className={`${heightClasses} w-auto object-contain mix-blend-multiply transition-opacity duration-200 group-hover:opacity-95`}
            loading="eager"
          />
        </div>
      ) : (
        // Light variant: Seamlessly blended burgundy heritage mark on light/white header
        <img
          src={LOGO_ASSET_SRC}
          alt="Hastkala — The art of handmade. The soul of India."
          className={`${heightClasses} w-auto object-contain mix-blend-multiply transition-opacity duration-200 group-hover:opacity-90`}
          loading="eager"
        />
      )}
    </Link>
  );
};
