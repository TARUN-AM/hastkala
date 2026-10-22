# Hastkala — The Art of Handmade. The Soul of India.

An artisan e-commerce marketplace dedicated to traditional and contemporary Indian craftspeople. Built with React 19, TypeScript, Express, Tailwind CSS, and Supabase PostgreSQL architecture.

---

## 📚 Complete Platform Documentation & Guides

The repository includes a comprehensive 15-chapter handbook and documentation suite:

1. **[User Guide (`USER_GUIDE.md`)](docs/USER_GUIDE.md)**: Customer shopping guide, artisan onboarding, studio walkthrough, AI cataloguing instructions, and FAQs.
2. **[Platform Overview (`PLATFORM_OVERVIEW.md`)](docs/PLATFORM_OVERVIEW.md)**: Executive summary, navigation map, core modules, impact indicators, and B2B bulk enquiry workflows.
3. **[Technical Documentation (`TECHNICAL_DOCUMENTATION.md`)](docs/TECHNICAL_DOCUMENTATION.md)**: Tech stack, Express API endpoints, database schema, entity relationships, sequence diagrams, and security controls.
4. **[Hackathon Demo Guide (`HACKATHON_DEMO_GUIDE.md`)](docs/HACKATHON_DEMO_GUIDE.md)**: Elevator pitch, problem statement, key innovations, and a 3-minute live demonstration script for evaluators.
5. **[Known Limitations & Roadmap (`KNOWN_LIMITATIONS.md`)](docs/KNOWN_LIMITATIONS.md)**: Simulated components, external dependencies, browser compatibility, and prioritized strategic roadmap.

---

## 1. Vision & Provenance Mission

**Hastkala** bridges independent artisans directly with conscious patrons. Rather than impersonal industrial warehouses, every piece is made in verified workshops and guilds.
- **Evidence-Based Provenance:** Guild certifications, workshop photographs, and material receipts are verified before authenticity badges are issued.
- **Fair Economics:** Transparent studio pricing calculator ensures skilled labor, studio overhead, and materials are fairly rewarded.
- **Natural Materials:** Botanical dyes, handspun deshi cotton, riverbed terracotta, reclaimed teak, and lost-wax brass.
- **Signature Palette:**
  - Deep burgundy: `#7E1726` (Primary brand mark & accents)
  - Warm ivory: `#F8F3EB` (Canvas & surface)
  - Terracotta: `#8A4935` (Earth & craft actions)
  - Forest green: `#34483A` (Guild & provenance seals)

---

## 2. Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React, Motion.
- **Backend & AI Server:** Express (`server.ts`) with Gemini 2.5 Flash for:
  - Turning artisan rough notes into evocative product descriptions.
  - Faithful translations between Kannada (ಕನ್ನಡ) and English.
  - Auto-suggesting e-commerce search tags and disciplines.
  - Mathematical & AI-advisory selling price calculation.
- **Database & Persistence:**
  - Full PostgreSQL / Supabase migration schema in `supabase/migrations/20261021000000_create_craft_here_schema.sql` with Row Level Security (RLS) policies, foreign keys, indexes, and constraints.
  - Zero-config client store (`src/lib/db.ts`) with atomic transactions, stock checks, and idempotency guarantees that works out-of-the-box in development and connects to Supabase when environment variables are supplied.

---

## 3. Routes & Roles

### Public Patron Routes
- `/`: Editorial Homepage with cinematic hero, craft discovery strip, craft disciplines, curator's choice, artisan spotlight, regional clusters, and provenance narrative.
- `/shop`: Filterable catalogue by discipline, price, region, artisan, stock, and sort.
- `/categories/:slug`: Curated discipline page.
- `/products/:slug`: Multi-image gallery, materials, care instructions, origin story, quantity selector, and live stock checking.
- `/artisans`: Directory of master artisans and guilds.
- `/artisans/:slug`: Maker biography, workshop address, and active listings.
- `/our-story`: Provenance philosophy and ethics.
- `/search`: Instant keyword search with suggested craft queries.
- `/cart`: Line items, quantity steppers with inventory bounds, free shipping incentive bar ($150 threshold), and subtotal breakdown.
- `/checkout`: Address validation, mock payment provider abstraction, idempotency keys, and atomic inventory reduction.
- `/checkout/success`: Order receipt with immutable line item snapshots.
- `/orders` & `/orders/:id`: Customer order history and fulfillment tracking.
- `/auth`: Sign in, register, and 1-click persona switching (Customer, Artisan, Admin).

### Artisan Studio Routes
- `/studio`: Dashboard overview with GMV, listings count, pending orders, and inventory alerts.
- `/studio/products`: Listing management with draft, pending, published, and rejected states.
- `/studio/products/new`: Listing creation with built-in Gemini AI Assistant for descriptions, translations, tags, and pricing calculator.
- `/studio/orders`: Order line item fulfillment state transitions (`processing` → `in_production` → `shipped` → `delivered`).
- `/studio/profile`: Workshop location, bio, lineage story, and imagery editor.

### Administrator & Curator Routes
- `/admin`: Platform GMV oversight, total orders, active artisans, and documentary provenance review queue.
- `/admin/products`: Review and approve artisan listings.
- `/admin/artisans`: Grant or revoke "Guild Verified" and "Studio Inspected" credentials.
- `/admin/orders`: Platform-wide transaction oversight.

---

## 4. Setup & Running Locally

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Runs the Express backend and mounts the Vite frontend on `http://localhost:3000`.

### Unit Tests
Pure calculations and stock bounds tests:
```bash
npx tsx --test src/utils/pricing.test.ts src/utils/order-calculations.test.ts
```

### Supabase Setup (Optional for Production)
1. Execute the SQL migration in `supabase/migrations/20261021000000_create_craft_here_schema.sql` in your Supabase SQL Editor.
2. Configure `.env`:
```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
GEMINI_API_KEY="your-gemini-key"
```
Hastkala runs out-of-the-box with pre-seeded demonstration data even without external credentials.
