# Hastkala — Known Limitations & Strategic Roadmap

This document outlines the current limitations, simulated components, external dependencies, and prioritized future roadmap for the **Hastkala** platform.

---

## 1. Current Known Limitations & Simulated Components

### A. Payment Gateway Abstraction
- **Current State**: Checkout (`/checkout`) uses a simulated payment abstraction with idempotency key generation and atomic inventory deduction.
- **Limitation**: Real card processing via Razorpay, Stripe, or UPI intent flow is abstracted in the current demonstration environment.
- **Impact**: Orders complete successfully, update database state, decrement stock, and produce real order receipts without charging real monetary funds.

### B. Speech Recognition Browser Support
- **Current State**: The AI Cataloguer uses the native browser `Web Speech API` (`webkitSpeechRecognition`).
- **Limitation**: Web Speech API native recognition is fully supported in Google Chrome, Microsoft Edge, and Safari, but may require manual text typing in Firefox or older mobile browsers.
- **Mitigation**: The input box permits direct typing and pasting of spoken notes with full Gemini AI parsing.

### C. Cloud Storage vs. Local Data Persistence
- **Current State**: Out-of-the-box mode uses `DatabaseStore` (`src/lib/db.ts`) persisted to browser `localStorage`.
- **Limitation**: Changes made in a browser session persist locally on that device unless connected to a live Supabase PostgreSQL backend via environment variables.
- **Production Path**: Execute `supabase/migrations/20261021000000_create_craft_here_schema.sql` on a live Supabase instance and supply `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

---

## 2. External Service Dependencies

1. **Google Gemini 2.5 Flash API (`GEMINI_API_KEY`)**:
   - Required for live AI voice-first cataloguing, translation, and studio description polishing.
   - *Fallback*: Rule-based template fallback provided when API key is unconfigured.
2. **Browser Microphone Permissions**:
   - Required for voice-to-text recording.
3. **Unsplash High-Res Image Assets**:
   - Used for pre-seeded product, artisan avatar, and craft story photography.

---

## 3. Prioritized Strategic Roadmap

### Phase 1: Short-Term Enhancements (Q1 2027)
- **WhatsApp Business API Integration**: Allow rural artisans to receive new order alerts and bulk buyer enquiries directly as WhatsApp messages.
- **PWA & Offline First**: Implement Progressive Web App Service Workers to enable product draft creation without active internet access.
- **Razorpay & UPI Intent Integration**: Connect live Indian domestic payment gateways (UPI, NetBanking, Credit Cards) and international Stripe payments.

### Phase 2: Medium-Term Features (Q2 2027)
- **Augmented Reality (AR) Product Visualization**: Allow patrons to project 3D models of pottery, lamps, and sculptures into their living spaces before purchasing.
- **Automated Courier & Logistics API**: Direct integration with Shiprocket or India Post for automated shipping label creation and live tracking webhooks.
- **Artisan Voice Storytelling Podcasts**: Embed short audio clips recorded by artisans directly on product detail pages.

### Phase 3: Long-Term Vision (Q3-Q4 2027)
- **NFC & Blockchain Provenance Seals**: Embed tamper-evident NFC tags in premium craft shipments linked to immutable provenance records.
- **Direct Guild Cooperative Payouts**: Automated split-payment routing transferring 100% of craft revenues directly into artisan bank accounts.

---

*Hastkala Known Limitations & Strategic Roadmap v1.0.*
