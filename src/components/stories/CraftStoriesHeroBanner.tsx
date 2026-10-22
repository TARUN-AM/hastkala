import React from 'react';

/**
 * CraftStoriesHeroBanner
 *
 * Faithfully recreates the distinctive heritage banner from the reference screenshot:
 * - Deep burgundy background (#481522) with subtle warm textile texture
 * - Continuous horizontal Indian folk-art tapestry frieze in antique gold (#DFC17B / #D4AF37):
 *   - Symmetrical left/right vertical geometric columns with diamond trellis and cross-hatching
 *   - Radiating sunburst / mandala wheels with concentric rings and solid gold hubs
 *   - Stylized Indian folk gazelles / deer with arched horns
 *   - Folk trees with circular foliage crowns and branch stems
 *   - Stepped temple pavilions and artisan silhouettes in craft postures
 *   - Horizontal geometric baseline frieze with diamond lozenges and chevrons
 * - Pristine centered white serif heading: "Craft Stories"
 * - Centered supporting text: "Discover the artisans and traditions behind every craft."
 * - Lower-left antique-gold ornamental emblem watermark sitting directly on the canvas
 * - Generous vertical height (~480px on desktop)
 * - Restrained fade-and-up entrance with reduced-motion respect
 */
export const CraftStoriesHeroBanner: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#481522] overflow-hidden min-h-[400px] sm:min-h-[440px] md:h-[480px] flex items-center justify-center select-none"
      aria-label="Craft Stories Heritage Banner"
    >
      {/* Background Micro-Texture Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-95"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #4f1726 0%, #441320 60%, #340c17 100%)',
        }}
      />

      {/* Symmetrical Folk-Art Tapestry Frieze SVG Canvas */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="#DFC17B"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          {/* Antique gold gradient sheen for intricate linework */}
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#DFC17B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F5E4BE" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#DFC17B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.75" />
          </linearGradient>

          {/* Symmetrical Half-Frieze (Left Wing: 0 to 720) */}
          <g id="folkArtHalfFrieze">
            {/* 1. FAR-LEFT VERTICAL WOVEN COLUMN (Pillar from top to bottom) */}
            <g transform="translate(10, 30)" stroke="url(#goldStroke)" strokeWidth="1.1">
              {/* Outer boundary lines */}
              <line x1="0" y1="0" x2="0" y2="420" strokeWidth="1.3" />
              <line x1="120" y1="0" x2="120" y2="420" strokeWidth="1.3" />
              <line x1="60" y1="0" x2="60" y2="420" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Top and bottom column caps */}
              <line x1="0" y1="0" x2="120" y2="0" strokeWidth="1.5" />
              <line x1="0" y1="8" x2="120" y2="8" />
              <line x1="0" y1="412" x2="120" y2="412" />
              <line x1="0" y1="420" x2="120" y2="420" strokeWidth="1.5" />

              {/* Geometric Diamond Lozenge Panels */}
              {/* Panel 1 */}
              <rect x="10" y="20" width="100" height="90" strokeWidth="1" />
              <line x1="60" y1="20" x2="110" y2="65" />
              <line x1="110" y1="65" x2="60" y2="110" />
              <line x1="60" y1="110" x2="10" y2="65" />
              <line x1="10" y1="65" x2="60" y2="20" />
              {/* Inner diamond */}
              <line x1="60" y1="38" x2="90" y2="65" strokeWidth="0.8" />
              <line x1="90" y1="65" x2="60" y2="92" strokeWidth="0.8" />
              <line x1="60" y1="92" x2="30" y2="65" strokeWidth="0.8" />
              <line x1="30" y1="65" x2="60" y2="38" strokeWidth="0.8" />
              <circle cx="60" cy="65" r="3" fill="#DFC17B" fillOpacity="0.8" stroke="none" />

              {/* Panel 2: Crosshatch Chevron Band */}
              <rect x="10" y="125" width="100" height="40" strokeWidth="1" />
              <path d="M 10 145 L 35 125 L 60 145 L 85 125 L 110 145" strokeWidth="0.9" />
              <path d="M 10 145 L 35 165 L 60 145 L 85 165 L 110 145" strokeWidth="0.9" />

              {/* Panel 3: Central Diamond Trellis */}
              <rect x="10" y="180" width="100" height="110" strokeWidth="1" />
              <line x1="10" y1="180" x2="110" y2="290" strokeWidth="0.9" />
              <line x1="10" y1="290" x2="110" y2="180" strokeWidth="0.9" />
              <line x1="60" y1="180" x2="110" y2="235" strokeWidth="0.8" />
              <line x1="110" y1="235" x2="60" y2="290" strokeWidth="0.8" />
              <line x1="60" y1="290" x2="10" y2="235" strokeWidth="0.8" />
              <line x1="10" y1="235" x2="60" y2="180" strokeWidth="0.8" />
              <circle cx="60" cy="235" r="4" fill="#DFC17B" fillOpacity="0.8" stroke="none" />
              <circle cx="60" cy="180" r="2" fill="#DFC17B" stroke="none" />
              <circle cx="60" cy="290" r="2" fill="#DFC17B" stroke="none" />
              <circle cx="10" cy="235" r="2" fill="#DFC17B" stroke="none" />
              <circle cx="110" cy="235" r="2" fill="#DFC17B" stroke="none" />

              {/* Panel 4: Chevron Band */}
              <rect x="10" y="305" width="100" height="40" strokeWidth="1" />
              <path d="M 10 325 L 35 305 L 60 325 L 85 305 L 110 325" strokeWidth="0.9" />
              <path d="M 10 325 L 35 345 L 60 325 L 85 345 L 110 325" strokeWidth="0.9" />

              {/* Panel 5: Lower Diamond */}
              <rect x="10" y="360" width="100" height="45" strokeWidth="1" />
              <line x1="60" y1="360" x2="110" y2="382" strokeWidth="0.9" />
              <line x1="110" y1="382" x2="60" y2="405" strokeWidth="0.9" />
              <line x1="60" y1="405" x2="10" y2="382" strokeWidth="0.9" />
              <line x1="10" y1="382" x2="60" y2="360" strokeWidth="0.9" />
              <circle cx="60" cy="382" r="2.5" fill="#DFC17B" fillOpacity="0.75" stroke="none" />
            </g>

            {/* 2. LARGE RADIATING SUNBURST / MANDALA WHEEL */}
            <g transform="translate(250, 240)" stroke="url(#goldStroke)" strokeWidth="1.15">
              {/* Outer radiating rim */}
              <circle cx="0" cy="0" r="82" strokeWidth="1.2" strokeOpacity="0.85" />
              <circle cx="0" cy="0" r="74" strokeDasharray="3 3" strokeWidth="0.8" strokeOpacity="0.65" />
              <circle cx="0" cy="0" r="66" strokeWidth="1" strokeOpacity="0.8" />
              <circle cx="0" cy="0" r="50" strokeWidth="0.9" strokeOpacity="0.75" />
              <circle cx="0" cy="0" r="32" strokeWidth="1.1" strokeOpacity="0.85" />

              {/* Solid Warm Gold Hub at Center (Matches Reference!) */}
              <circle cx="0" cy="0" r="14" fill="#DFC17B" fillOpacity="0.95" stroke="#FFF2D6" strokeWidth="1.2" />

              {/* Radiating 16 Spokes & Petals */}
              <g strokeWidth="0.95" strokeOpacity="0.75">
                {/* 12 Cardinal and Intercardinal Spoke Rays */}
                <line x1="0" y1="-82" x2="0" y2="-14" />
                <line x1="0" y1="14" x2="0" y2="82" />
                <line x1="-82" y1="0" x2="-14" y2="0" />
                <line x1="14" y1="0" x2="82" y2="0" />
                <line x1="-58" y1="-58" x2="-10" y2="-10" />
                <line x1="10" y1="10" x2="58" y2="58" />
                <line x1="58" y1="-58" x2="10" y2="-10" />
                <line x1="-58" y1="58" x2="-10" y2="10" />

                {/* Additional 8 micro rays */}
                <line x1="0" y1="-74" x2="12" y2="-66" />
                <line x1="0" y1="-74" x2="-12" y2="-66" />
                <line x1="0" y1="74" x2="12" y2="66" />
                <line x1="0" y1="74" x2="-12" y2="66" />
                <line x1="-74" y1="0" x2="-66" y2="12" />
                <line x1="-74" y1="0" x2="-66" y2="-12" />
                <line x1="74" y1="0" x2="66" y2="12" />
                <line x1="74" y1="0" x2="66" y2="-12" />
              </g>

              {/* Petal arcs between r=50 and r=66 */}
              <circle cx="0" cy="-58" r="4" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="0" cy="58" r="4" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="-58" cy="0" r="4" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="58" cy="0" r="4" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="-41" cy="-41" r="3" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="41" cy="41" r="3" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="41" cy="-41" r="3" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
              <circle cx="-41" cy="41" r="3" fill="#DFC17B" fillOpacity="0.7" stroke="none" />
            </g>

            {/* 3. FOLK-ART TREES & BOTANICALS */}
            {/* Tree A (Near Mandala) */}
            <g transform="translate(390, 160)" stroke="url(#goldStroke)" strokeWidth="1.1">
              {/* Circular Folkart Crown */}
              <circle cx="0" cy="0" r="28" strokeWidth="1.1" />
              <circle cx="0" cy="0" r="20" strokeDasharray="2 3" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="10" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="3.5" fill="#DFC17B" fillOpacity="0.9" stroke="none" />
              {/* Radiating leaf rays */}
              <line x1="0" y1="-28" x2="0" y2="28" strokeWidth="0.75" />
              <line x1="-28" y1="0" x2="28" y2="0" strokeWidth="0.75" />
              {/* Trunk with side roots */}
              <line x1="0" y1="28" x2="0" y2="120" strokeWidth="1.4" />
              <line x1="0" y1="70" x2="-14" y2="55" strokeWidth="1" />
              <line x1="0" y1="85" x2="14" y2="70" strokeWidth="1" />
              <line x1="0" y1="100" x2="-12" y2="88" strokeWidth="1" />
            </g>

            {/* Tree B (Smaller Companion) */}
            <g transform="translate(435, 205)" stroke="url(#goldStroke)" strokeWidth="1.1">
              <circle cx="0" cy="0" r="18" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.5" fill="#DFC17B" fillOpacity="0.8" stroke="none" />
              <line x1="0" y1="18" x2="0" y2="75" strokeWidth="1.2" />
              <line x1="0" y1="45" x2="-9" y2="36" strokeWidth="0.9" />
              <line x1="0" y1="58" x2="9" y2="48" strokeWidth="0.9" />
            </g>

            {/* 4. UPPER ARCHITECTURAL STEPPED HAVELI / TEMPLE PAVILION */}
            <g transform="translate(350, 45)" stroke="url(#goldStroke)" strokeWidth="1.1">
              {/* Stepped Triangular Shikhara / Roof */}
              <polygon points="60,0 120,45 0,45" strokeWidth="1.2" />
              <line x1="60" y1="0" x2="60" y2="45" strokeWidth="0.8" strokeDasharray="2 2" />
              {/* Chevron roof tiles */}
              <line x1="45" y1="12" x2="75" y2="12" strokeWidth="0.8" />
              <line x1="30" y1="23" x2="90" y2="23" strokeWidth="0.8" />
              <line x1="15" y1="34" x2="105" y2="34" strokeWidth="0.8" />
              {/* Temple base structure */}
              <rect x="10" y="45" width="100" height="42" strokeWidth="1.1" />
              {/* Multi-arched colonnade */}
              <path d="M 20 87 L 20 62 Q 35 50 50 62 L 50 87" strokeWidth="0.95" />
              <path d="M 70 87 L 70 62 Q 85 50 100 62 L 100 87" strokeWidth="0.95" />
              <circle cx="60" cy="56" r="3" fill="#DFC17B" fillOpacity="0.75" stroke="none" />
              {/* Finial Kalash atop roof */}
              <circle cx="60" cy="-6" r="3" fill="#DFC17B" stroke="none" />
              <line x1="60" y1="-3" x2="60" y2="0" strokeWidth="1.2" />
            </g>

            {/* 5. STYLIZED INDIAN FOLK GAZELLE / DEER LEAPING TOWARD CENTER */}
            <g transform="translate(330, 285) scale(0.88)" stroke="url(#goldStroke)" strokeWidth="1.2">
              {/* Slender Arched Body */}
              <path
                d="M 10 35 C 20 20, 45 15, 65 25 C 75 30, 80 40, 82 50 C 80 58, 65 60, 45 58 C 25 56, 12 50, 10 35 Z"
                strokeWidth="1.2"
              />
              {/* Neck & Head gracefully turned */}
              <path d="M 65 25 C 72 10, 82 5, 92 8 C 96 10, 98 16, 92 20 C 85 24, 78 28, 75 30" strokeWidth="1.2" />
              {/* Arched Horns */}
              <path d="M 90 6 C 98 -6, 110 -10, 118 -5 M 92 6 C 102 -2, 114 -4, 122 2" strokeWidth="1" />
              {/* Slender Front Legs */}
              <path d="M 75 48 L 88 88 M 80 50 L 96 86" strokeWidth="1.1" />
              {/* Slender Hind Legs */}
              <path d="M 18 45 L 8 86 M 25 48 L 18 88" strokeWidth="1.1" />
              {/* Tiny Upturned Tail */}
              <path d="M 10 35 C 4 30, 0 32, 2 38" strokeWidth="1" />
              <circle cx="94" cy="11" r="1" fill="#DFC17B" stroke="none" />
            </g>

            {/* 6. SEATED ARTISANS IN CRAFT / YOGA POSTURE */}
            <g transform="translate(450, 302) scale(0.92)" stroke="url(#goldStroke)" strokeWidth="1.2">
              {/* Artisan 1: Round Head, triangular body, crossed legs */}
              <circle cx="20" cy="15" r="7" strokeWidth="1.1" />
              <circle cx="20" cy="15" r="2.5" fill="#DFC17B" stroke="none" />
              {/* Neck and torso */}
              <line x1="20" y1="22" x2="20" y2="48" strokeWidth="1.2" />
              {/* Arms extended working with tool / craft spindle */}
              <path d="M 20 28 L 36 40 L 48 34" strokeWidth="1.1" />
              <path d="M 20 28 L 6 38 L -4 34" strokeWidth="1.1" />
              {/* Crossed legs / Padmasana */}
              <path d="M 20 48 L 2 64 L 38 64 L 20 48" strokeWidth="1.1" />

              {/* Artisan 2 (Beside Artisan 1) */}
              <g transform="translate(42, 4)">
                <circle cx="20" cy="15" r="6.5" strokeWidth="1.1" />
                <circle cx="20" cy="15" r="2" fill="#DFC17B" stroke="none" />
                <line x1="20" y1="22" x2="20" y2="44" strokeWidth="1.2" />
                <path d="M 20 28 L 34 38 L 44 32" strokeWidth="1" />
                <path d="M 20 44 L 4 58 L 36 58 L 20 44" strokeWidth="1.1" />
              </g>
            </g>

            {/* 7. SECONDARY LOTUS MEDALLION (Mid-Sky Anchor) */}
            <g transform="translate(560, 150)" stroke="url(#goldStroke)" strokeWidth="1.1">
              <circle cx="0" cy="0" r="32" strokeWidth="1" />
              <circle cx="0" cy="0" r="24" strokeDasharray="2 2" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="8" fill="#DFC17B" fillOpacity="0.8" stroke="none" />
              {/* 8-Petal Rosette */}
              <path d="M 0 -24 C -6 -12, -6 -6, 0 0 C 6 -6, 6 -12, 0 -24 Z" strokeWidth="0.8" />
              <path d="M 0 24 C -6 12, -6 6, 0 0 C 6 6, 6 12, 0 24 Z" strokeWidth="0.8" />
              <path d="M -24 0 C -12 -6, -6 -6, 0 0 C -6 6, -12 6, -24 0 Z" strokeWidth="0.8" />
              <path d="M 24 0 C 12 -6, 6 -6, 0 0 C 6 6, 12 6, 24 0 Z" strokeWidth="0.8" />
            </g>

            {/* 8. HORIZONTAL BASELINE FRIEZE WITH SAPLINGS & DIAMOND RUNNER */}
            <g stroke="url(#goldStroke)" strokeWidth="1">
              {/* Continuous horizontal ground line at y=365 */}
              <line x1="120" y1="365" x2="720" y2="365" strokeWidth="1.3" />
              <line x1="120" y1="372" x2="720" y2="372" strokeDasharray="3 3" strokeWidth="0.75" />

              {/* Little growing saplings / sprouts along ground */}
              <g strokeWidth="0.9">
                <path d="M 180 365 L 180 350 M 180 355 L 174 348 M 180 355 L 186 348" />
                <path d="M 215 365 L 215 348 M 215 354 L 209 346 M 215 354 L 221 346" />
                <path d="M 465 365 L 465 350 M 465 355 L 459 348 M 465 355 L 471 348" />
                <path d="M 590 365 L 590 348 M 590 354 L 584 346 M 590 354 L 596 346" />
                <path d="M 640 365 L 640 352 M 640 357 L 634 350 M 640 357 L 646 350" />
                <path d="M 680 365 L 680 348 M 680 354 L 674 346 M 680 354 L 686 346" />
              </g>

              {/* Continuous Diamond Lozenge Border underneath ground line */}
              <path
                d="M 120 378 L 130 372 L 140 378 L 150 372 L 160 378 L 170 372 L 180 378 L 190 372 L 200 378 L 210 372 L 220 378 L 230 372 L 240 378 L 250 372 L 260 378 L 270 372 L 280 378 L 290 372 L 300 378 L 310 372 L 320 378 L 330 372 L 340 378 L 350 372 L 360 378 L 370 372 L 380 378 L 390 372 L 400 378 L 410 372 L 420 378 L 430 372 L 440 378 L 450 372 L 460 378 L 470 372 L 480 378 L 490 372 L 500 378 L 510 372 L 520 378 L 530 372 L 540 378 L 550 372 L 560 378 L 570 372 L 580 378 L 590 372 L 600 378 L 610 372 L 620 378 L 630 372 L 640 378 L 650 372 L 660 378 L 670 372 L 680 378 L 690 372 L 700 378 L 710 372 L 720 378"
                strokeWidth="0.8"
                strokeOpacity="0.75"
              />
            </g>

            {/* 9. TOP GEOMETRIC SKY FRIEZE */}
            <g stroke="url(#goldStroke)" strokeWidth="0.9" strokeOpacity="0.75">
              <line x1="120" y1="28" x2="720" y2="28" />
              <line x1="120" y1="36" x2="720" y2="36" strokeDasharray="3 3" />
              {/* Symmetrical chevron serrations */}
              <path
                d="M 120 28 L 130 36 L 140 28 L 150 36 L 160 28 L 170 36 L 180 28 L 190 36 L 200 28 L 210 36 L 220 28 L 230 36 L 240 28 L 250 36 L 260 28 L 270 36 L 280 28 L 290 36 L 300 28 L 310 36 L 320 28 L 330 36 L 340 28 L 350 36 L 360 28 L 370 36 L 380 28 L 390 36 L 400 28 L 410 36 L 420 28 L 430 36 L 440 28 L 450 36 L 460 28 L 470 36 L 480 28 L 490 36 L 500 28 L 510 36 L 520 28 L 530 36 L 540 28 L 550 36 L 560 28 L 570 36 L 580 28 L 590 36 L 600 28 L 610 36 L 620 28 L 630 36 L 640 28 L 650 36 L 660 28 L 670 36 L 680 28 L 690 36 L 700 28 L 710 36 L 720 28"
                strokeWidth="0.8"
              />
            </g>

            {/* Fine Constellation / Flora Dusting */}
            <g fill="#DFC17B" fillOpacity="0.7" stroke="none">
              <circle cx="160" cy="80" r="1.8" />
              <circle cx="210" cy="115" r="2.2" />
              <circle cx="310" cy="70" r="1.6" />
              <circle cx="490" cy="95" r="2" />
              <circle cx="620" cy="65" r="1.5" />
              <circle cx="670" cy="110" r="2" />
              <circle cx="530" cy="230" r="1.6" />
            </g>
          </g>
        </defs>

        {/* RENDER LEFT WING (0 to 720) */}
        <use href="#folkArtHalfFrieze" />

        {/* RENDER RIGHT WING (Mirrored around 720 center) */}
        <g transform="translate(1440, 0) scale(-1, 1)">
          <use href="#folkArtHalfFrieze" />
        </g>
      </svg>

      {/* LOWER-LEFT HASTKALA ORNAMENTAL WATERMARK EMBLEM (Directly on canvas like Reference Screenshot) */}
      <div
        className="hidden sm:flex absolute bottom-5 left-10 md:left-14 z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Authentic 8-way ornamental Indian motif in antique gold */}
          <g stroke="#DFC17B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="27" cy="27" r="24" strokeDasharray="2 3" strokeWidth="0.9" strokeOpacity="0.6" />
            <circle cx="27" cy="27" r="18" strokeWidth="1" strokeOpacity="0.85" />
            <circle cx="27" cy="27" r="4" fill="#DFC17B" fillOpacity="0.95" stroke="none" />
            {/* 4 Cardinal Lotus Pillars */}
            <path d="M 27 9 L 27 45" />
            <path d="M 9 27 L 45 27" />
            {/* Diagonals */}
            <path d="M 14 14 L 40 40" strokeWidth="0.9" />
            <path d="M 40 14 L 14 40" strokeWidth="0.9" />
            {/* Lotus Petal tips */}
            <path d="M 23 15 L 27 9 L 31 15" />
            <path d="M 23 39 L 27 45 L 31 39" />
            <path d="M 15 23 L 9 27 L 15 31" />
            <path d="M 39 23 L 45 27 L 39 31" />
          </g>
        </svg>
      </div>

      {/* CENTER EDITORIAL TYPOGRAPHY (Pristine, Pure & Centered per Reference) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* White Serif Heading: "Craft Stories" */}
        <h1
          className="font-serif text-5xl sm:text-6xl md:text-[68px] lg:text-[72px] font-normal tracking-tight text-white leading-tight mb-3 drop-shadow-sm animate-fade-in-up motion-reduce:animate-none"
        >
          Craft Stories
        </h1>

        {/* Centered Supporting Text: Clean Warm Ivory Sans-Serif */}
        <p
          className="text-base sm:text-lg md:text-[19px] text-[#F3E8DB]/95 font-light tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-2xs animate-fade-in-up motion-reduce:animate-none"
          style={{ animationDelay: '120ms' }}
        >
          Discover the artisans and traditions behind every craft.
        </p>
      </div>
    </section>
  );
};
