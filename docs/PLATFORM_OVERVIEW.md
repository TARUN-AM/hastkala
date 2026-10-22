# Hastkala — Platform Overview & Architecture Guide

## Executive Summary for Evaluators

**Hastkala** (*The Art of Handmade, The Soul of India*) is an artisan e-commerce marketplace and digital empowerment platform designed specifically for traditional Indian craftspeople.

Traditional artisans often face barriers in reaching global markets, including digital literacy gaps, complex cataloguing requirements, unfair middleman margins, and loss of cultural provenance. Hastkala solves these challenges through an end-to-end web platform integrated with Google Gemini 2.5 Flash AI tools:

1. **AI Artisan Studio**: A multilingual, voice-first cataloguing assistant that turns spoken regional notes (*Hindi, Kannada, Telugu, Tamil, Bengali, Marathi, Gujarati*) into structured, customer-ready e-commerce listings with English and Hindi descriptions.
2. **AI Photography Enhancement**: Studio lighting and white-balance optimization that converts raw smartphone camera captures into commercial-grade product photography.
3. **Fair & Transparent Pricing Calculator**: A mathematical and AI-assisted pricing engine that guarantees skilled labor is valued fairly while calculating direct costs and studio margins.
4. **Evidence-Based Provenance**: Verified guild certifications, workshop photographs, and regional cluster badges protecting traditional knowledge and craft lineage.
5. **Full E-Commerce Capabilities**: Filterable catalog, real-time atomic inventory management, wishlist, cart, simulated checkout with idempotency protection, customer order history, and B2B bulk buyer enquiry workflows.

---

## 1. Application Map & Route Navigation

### Public Patron Routes
```
[ Homepage: / ]
  ├── [ Shop Catalog: /shop ]
  │     ├── [ Category View: /categories/:slug ]
  │     └── [ Product Detail Page: /products/:slug ]
  ├── [ Our Artisans Directory: /artisans ]
  │     └── [ Artisan Profile Page: /artisans/:slug ]
  ├── [ Craft Stories: /craft-stories ]
  │     └── [ Story Detail Page: /craft-stories/:slug ]
  ├── [ Our Impact: /our-impact ]
  ├── [ Search Drawer: /search ]
  ├── [ Shopping Cart: /cart ]
  ├── [ Checkout: /checkout ]
  │     └── [ Order Success: /checkout/success ]
  ├── [ Customer Orders: /orders ]
  │     └── [ Order Details: /orders/:id ]
  └── [ Authentication & Persona Switcher: /auth ]
```

### Artisan Studio Routes
```
[ Artisan Studio: /studio ]
  ├── [ Overview & GMV Analytics: /studio ]
  ├── [ Catalog Management: /studio/products ]
  │     ├── [ AI Product Studio (New): /studio/products/new ]
  │     └── [ Edit Craft Item: /studio/products/:id/edit ]
  ├── [ Order Fulfillment: /studio/orders ]
  └── [ Studio Profile & Lineage: /studio/profile ]
```

### Admin & Curator Routes
```
[ Curator Control Panel: /admin ]
  ├── [ Platform Overview & GMV: /admin ]
  ├── [ Product Approvals: /admin/products ]
  ├── [ Artisan Guild Verification: /admin/artisans ]
  └── [ Platform Order Oversight: /admin/orders ]
```

---

## 2. Core Modules & Platform Capabilities

### A. Homepage (`/`)
- **Cinematic Hero**: Immersive hero banner celebrating authentic handloom textiles and ceramic crafts.
- **Craft Discovery Strip**: Quick navigation across top disciplines (*Textiles, Pottery & Ceramics, Jewellery, Home Decor, Accessories, Gifts*).
- **8-Product Curated Showcase**: Highlights newly added, verified artisan listings with live store prices and provenance badges.
- **Tholu Bommalata Spotlight**: Dedicated spotlight on Andhra Pradesh's UNESCO-recognized shadow leather puppet craft.
- **Artisan Showcase**: Featured profiles linking directly to master craftspeople.
- **Our Impact Banner**: Live metric summary of artisan earnings and preserved heritage traditions.

### B. Shop Catalog (`/shop`)
- **Multi-Faceted Filters**: Category, Region of Origin, Price Slider, In-Stock Toggle.
- **Dynamic Sorting**: Featured, Price Ascending, Price Descending, Newest Arrivals.
- **Product Cards**: High-resolution cover photo, artisan name, craft type, region, price, live stock badge, and quick add-to-cart.

### C. Product Detail Page (`/products/:slug`)
- Multi-image gallery with zoom/view capabilities.
- Live price formatting in INR (₹) or USD ($).
- Stock status indicator with real-time inventory bounds.
- Artisan Provenance Card with studio location and verification seal.
- Comprehensive specifications: Materials, dimensions, care instructions, lead time.
- Living Heritage Narrative detailing regional history and making technique.

### D. Our Artisans (`/artisans` & `/artisans/:slug`)
- Directory of all 11 master artisans in a responsive 4-column profile grid.
- Individual profile pages showing workshop location, craft lineage, years of experience, bio, and active product listings.

### E. Craft Stories (`/craft-stories` & `/craft-stories/:slug`)
- Editorial blog essays celebrating traditional Indian techniques (*Kasuti Embroidery, Pen Kalamkari, Udayagiri Woodcraft, Anagama Ceramics, Lost-Wax Brass Casting*).
- Integrated cross-links connecting stories to related artisans and product collections.

### F. Our Impact (`/our-impact`)
- Editorial impact page showcasing the social and economic contribution of Hastkala.
- Key genuine impact indicators:
  - **100% Direct Revenues**: 0% middleman commission on direct artisan sales.
  - **11 Master Artisan Guilds**: 100% verified authentic craft studios.
  - **6 Major Craft Heritage Disciplines**: Preserving UNESCO and GI-tagged traditions.
  - **Fair Labor Guarantee**: Every listed item is priced using the Fair Pricing Formula to reward skilled artisan hours.

### G. Bulk Buyers & B2B Market Linkage (`/our-impact` & `/studio`)
- Wholesale enquiry workflow for boutique owners, interior architects, and corporate gifting managers.
- Enquiries capture: Requested quantity, target delivery date, budget range, destination region, and custom notes.
- Artisans receive enquiries directly on their Studio Dashboard (`/studio`).

---

## 3. Executive Matrix of Implemented Features

| Feature Module | Route / Endpoint | Implementation Status | Verification Notes |
| :--- | :--- | :--- | :--- |
| **Multilingual AI Cataloguer** | `/studio/products/new`, `/api/ai/cataloguer` | ✅ **Fully Operational** | Gemini 2.5 Flash + Web Speech API + 8 Regional Languages |
| **AI Photo Enhancement** | `/studio/products/new`, `/api/ai/enhance-image` | ✅ **Fully Operational** | White balance, contrast, & framing optimization presets |
| **AI Pricing Assistant** | `/studio/products/new`, `/api/ai/pricing-calc` | ✅ **Fully Operational** | Mathematical cost-plus formula + AI advisory |
| **Cart & Atomic Stock Check** | `/cart`, `/checkout` | ✅ **Fully Operational** | Bounded quantities, real-time inventory decrement |
| **Simulated Payment Gateway** | `/checkout`, `DatabaseStore.createOrder` | ✅ **Fully Operational** | Idempotency key protection against duplicate orders |
| **Artisan Order Fulfillment** | `/studio/orders` | ✅ **Fully Operational** | Line-item fulfillment status transitions |
| **Curator Admin Panel** | `/admin` | ✅ **Fully Operational** | GMV oversight, product approvals, provenance queue |
| **Bulk Enquiry Workflow** | `DatabaseStore.createEnquiry` | ✅ **Fully Operational** | Pre-seeded and live enquiry tracking |

---

*Hastkala Platform Overview v1.0 — Technical and Product Architecture.*
