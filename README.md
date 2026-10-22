# Hastkala — The Art of Handmade. The Soul of India.

**Hastkala** is an artisan-focused e-commerce marketplace designed to connect India's traditional and contemporary craftspeople with customers who value handmade products, cultural heritage, and responsible craftsmanship.

The platform combines craft discovery, artisan storefronts, product management, AI-assisted cataloguing, order workflows, and provenance-focused storytelling in a unified digital experience.

## Documentation

Hastkala includes a structured documentation suite covering platform usage, architecture, demonstrations, and future development.

| Document | Description |
|---|---|
| [User Guide](docs/USER_GUIDE.md) | Customer shopping, artisan onboarding, product listing workflows, AI-assisted cataloguing, and FAQs. |
| [Platform Overview](docs/PLATFORM_OVERVIEW.md) | Platform vision, navigation, core modules, impact indicators, and business-to-business (B2B) enquiry workflows. |
| [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md) | Technology stack, API endpoints, database schema, entity relationships, sequence diagrams, and security controls. |
| [Hackathon Demo Guide](docs/HACKATHON_DEMO_GUIDE.md) | Project pitch, problem statement, key innovations, and a three-minute demonstration walkthrough. |
| [Known Limitations & Roadmap](docs/KNOWN_LIMITATIONS.md) | Current limitations, simulated components, external dependencies, compatibility considerations, and planned improvements. |

## 1. Vision and Mission

Hastkala aims to bridge the gap between independent artisans and customers by creating a digital marketplace where handcrafted products are supported by maker stories, craft traditions, and transparent product information.

### Core Principles

- **Craft Provenance:** Support traceability through artisan profiles, workshop documentation, and relevant provenance records. Verification credentials should be issued only when the associated evidence has been reviewed.
- **Fair Pricing:** Help artisans understand product costs through pricing calculations that account for materials, skilled labour, packaging, and applicable overheads.
- **Cultural Preservation:** Make traditional craft techniques, regional identities, and artisan knowledge more discoverable through digital storytelling.
- **Responsible Craftsmanship:** Highlight material sourcing and production practices when supported by reliable product or artisan information.
- **Artisan Empowerment:** Provide digital tools that help craftspeople present products professionally and manage their online business.

### Brand Identity

| Element | Value | Purpose |
|---|---|---|
| Deep Burgundy | `#7E1726` | Primary brand colour and key accents |
| Warm Ivory | `#F8F3EB` | Backgrounds and content surfaces |
| Terracotta | `#8A4935` | Craft-inspired accents and actions |
| Forest Green | `#34483A` | Nature-inspired accents and provenance-related elements |

The visual identity combines an editorial aesthetic with earthy colours to reflect the heritage, material richness, and individuality of Indian craftsmanship.

## 2. Technology Stack and Architecture

Hastkala uses a modern web technology stack designed to support a responsive storefront, artisan workflows, AI-assisted features, and persistent application data.

### Frontend
- **React 19** — Component-based user interface development.
- **TypeScript** — Static typing and improved maintainability.
- **Tailwind CSS** — Utility-first styling and responsive layouts.
- **Lucide React** — Consistent interface icons.
- **Motion** — Interface transitions and animation.

### Backend and AI
- **Node.js and Express** — Backend application and API services, including the Express server implemented in `server.ts`.
- **Gemini 2.5 Flash** — AI-assisted product catalogue workflows, where configured.

The AI-assisted workflows are designed to support:
- Generating product descriptions from artisan-provided notes.
- Translating product content between Kannada and English.
- Suggesting relevant search keywords and craft categories.
- Supporting selling-price decisions through calculations and AI-generated recommendations.

AI-generated descriptions, translations, and pricing suggestions should be reviewed by the artisan before publication.

### Database and Persistence
- **PostgreSQL / Supabase** — Relational data architecture and optional hosted persistence.
- **Database migration** — `supabase/migrations/20261021000000_create_craft_here_schema.sql`
- **Database client/store** — `src/lib/db.ts`

The project includes a migration defining database structures and associated constraints, indexes, relationships, and Row Level Security (RLS) policies. Its local demonstration mode is designed to work with pre-seeded data, while Supabase connectivity depends on the relevant environment configuration.

> **Architecture note:** The exact persistence behaviour, transaction guarantees, and security policies depend on the implementation and configuration of the current codebase. Review the relevant modules and migration before treating these capabilities as production guarantees.

## 3. Platform Features and Routes

### 3.1 Customer Experience

| Route | Functionality |
|---|---|
| `/` | Homepage featuring craft discovery, selected products, artisan highlights, regional collections, and platform storytelling. |
| `/shop` | Product catalogue with available filtering and sorting options. |
| `/categories/:slug` | Category-specific product discovery. |
| `/products/:slug` | Product details, image gallery, materials, care information, origin story, quantity selection, and stock information. |
| `/artisans` | Directory of artisans and craft practitioners. |
| `/artisans/:slug` | Artisan profile, biography, workshop information, and associated products. |
| `/our-story` | Platform mission, craft heritage, and provenance principles. |
| `/search` | Product discovery through keyword search and suggested queries. |
| `/cart` | Cart management, quantity adjustments, subtotal calculation, and shipping incentive information. |
| `/checkout` | Address collection, payment-provider abstraction, and order submission workflow. |
| `/checkout/success` | Order confirmation and receipt information. |
| `/orders` | Customer order history. |
| `/orders/:id` | Details and fulfillment status for an individual order. |
| `/auth` | Authentication and account-access interface, including any configured demonstration personas. |

### 3.2 Artisan Studio

| Route | Functionality |
|---|---|
| `/studio` | Artisan dashboard with relevant business and inventory indicators. |
| `/studio/products` | Product listing management and listing-status views. |
| `/studio/products/new` | Product creation workflow with AI-assisted descriptions, translations, keyword suggestions, and pricing support. |
| `/studio/orders` | Order management and supported fulfillment-status transitions. |
| `/studio/profile` | Artisan profile, workshop information, craft background, and imagery management. |

### 3.3 Administration and Curation

| Route | Functionality |
|---|---|
| `/admin` | Administrative overview and relevant platform-level indicators. |
| `/admin/products` | Product review and approval workflow. |
| `/admin/artisans` | Artisan verification and credential-management workflow. |
| `/admin/orders` | Platform-level order management and oversight. |

**Important:** The availability and enforcement of role permissions, administrative actions, and route protection should be verified against the running implementation before deployment.

## 4. Local Development Setup

### Prerequisites

- Node.js and npm versions compatible with the project's dependency configuration.
- Git, if cloning the repository.
- Optional Supabase and Gemini credentials for features that require external services.

### Installation

Clone the repository and install its dependencies:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
npm install
```

Replace the placeholders with the actual repository URL and project directory.

### Start the Development Server

```bash
npm run dev
```

The development script is configured to run the application locally, with the Express backend and Vite frontend available at:

```text
http://localhost:3000
```

Confirm the actual command and port in `package.json` before relying on this address.

### Run Unit Tests

Run the available pricing and order-calculation tests:

```bash
npx tsx --test src/utils/pricing.test.ts src/utils/order-calculations.test.ts
```

These tests cover the calculation logic represented by the specified test files. They should not be treated as proof of complete application, API, authentication, or end-to-end correctness.

## 5. Environment Configuration

Hastkala is designed to support local demonstration data without requiring every external service to be configured. Features that depend on hosted persistence or AI services may require additional setup.

Create a `.env` file in the project root, using the variable names expected by the application:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

### Supabase Setup

1. Create or select a Supabase project.
2. Review `supabase/migrations/20261021000000_create_craft_here_schema.sql`.
3. Apply the migration in the Supabase SQL Editor or through the project's migration workflow.
4. Configure the required environment variables.
5. Verify database connectivity, access policies, and the application's persistence behaviour.

### Gemini Setup

1. Obtain an API key through the appropriate Google AI developer service.
2. Configure `GEMINI_API_KEY` in the backend environment.
3. Confirm that the Express server reads the key securely and that AI requests are handled by the backend.

**Security requirements**
- Never commit `.env` files, private API keys, service-role credentials, or other secrets to source control.
- Keep privileged credentials on the server; do not expose them through frontend environment variables.
- Use appropriate access controls, input validation, rate limits, and error handling for production deployments.
- Verify Row Level Security policies and server-side authorization independently of frontend role selection.

## 6. Demonstration and Testing

For a concise project demonstration, use the [Hackathon Demo Guide](docs/HACKATHON_DEMO_GUIDE.md).

A suggested walkthrough is:

1. Introduce the challenge of making traditional Indian crafts more discoverable online.
2. Browse the storefront and explore a product or craft category.
3. Open an artisan profile to demonstrate maker-focused storytelling.
4. Show the artisan product-creation workflow and any working AI-assisted catalogue features.
5. Demonstrate the cart, checkout, and order workflow using the configured demonstration environment.
6. Explain the technical architecture, current limitations, and future development priorities.

Use demonstration accounts and sample data where appropriate. Clearly distinguish simulated payment processing and demonstration-only behaviour from real transactions or production services.

## 7. Limitations and Future Development

Hastkala is intended to evolve through iterative development. Its current capabilities should be distinguished from planned enhancements.

Potential areas for future development include:

- More comprehensive artisan onboarding and verification workflows.
- Improved multilingual support for artisan-facing tools.
- Stronger provenance documentation and product traceability.
- Expanded analytics for artisan sales, inventory, and customer engagement.
- Dedicated B2B enquiry and bulk-order workflows.
- Accessibility and low-bandwidth improvements.
- Broader automated testing, security reviews, and production-readiness checks.

For current implementation status and known constraints, refer to [Known Limitations & Roadmap](docs/KNOWN_LIMITATIONS.md).

## 8. Contributing

Contributions should preserve Hastkala's focus on artisan empowerment, cultural integrity, usability, and maintainable software.

When contributing:

1. Review the existing architecture before changing application behaviour.
2. Follow the established TypeScript, React, and styling conventions.
3. Avoid introducing duplicate routes, disconnected mockups, or unnecessary dependencies.
4. Test changes against existing customer and artisan workflows.
5. Document configuration requirements and any new limitations.
6. Never represent unverified artisans, certifications, impact figures, or product provenance as established facts.

## 9. Project Status

Hastkala brings together artisan-focused commerce, craft storytelling, and AI-assisted product cataloguing in a single platform concept.

Its demonstration mode supports development and evaluation, while integrations and production capabilities depend on the current implementation and environment configuration. Refer to the technical documentation and known limitations before deploying or presenting any feature as production-ready.

---

**Hastkala — Preserving Craft. Empowering Artisans. Connecting Stories.**
