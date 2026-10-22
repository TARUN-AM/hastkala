# Hastkala — Hackathon Presentation & Demonstration Guide

Detailed documentation is also available in `docs/HACKATHON_DEMO_GUIDE.md`.

## Elevator Pitch

> **"Hastkala bridges traditional Indian artisans directly with global conscious patrons. Through voice-first AI cataloguing in regional languages, AI product photography enhancement, transparent fair-pricing calculations, and evidence-based provenance, Hastkala empowers master craftspeople to digitize their heritage crafts in minutes and earn 100% of their true value."**

---

## 1. Problem Statement & Target Audience

### The Problem
- **Digital Literacy Barrier**: Traditional artisans in rural clusters often speak regional languages (*Kannada, Telugu, Hindi, Tamil*) and struggle with complex English e-commerce cataloguing interfaces.
- **Unfair Margins**: Intermediaries take up to 70–80% of retail margins, leaving master craftspeople underpaid.
- **Counterfeit Crafts & Loss of Lineage**: Mass-produced machine imitations dilute genuine GI-tagged and UNESCO-recognized handicraft traditions.
- **Unprofessional Presentation**: Smartphone camera captures by artisans often lack commercial lighting and white balance, reducing buyer conversion.

---

## 2. 3-Minute Live Demonstration Script for Judges

Follow this exact sequence for a flawless, high-impact demonstration:

### [0:00 - 0:45] Minute 1: The Customer Discovery Experience
1. **Open the Live App**: Navigate to `https://ais-dev-f7yq5r5efixbnqcw3kzem2-98099549395.asia-southeast1.run.app/`
2. **Explore Homepage**: Show the editorial hero banner, 8-product showcase featuring live store products, and the **Tholu Bommalata** spotlight.
3. **Product Detail & Provenance**: Click on **"Pushpa Tholu Bommalata Lamp"**. Show the **Artisan Provenance Card** (*Kanday Anjanappa, Nimmalakunta, Andhra Pradesh*), verified guild badge, materials, and living heritage narrative.
4. **Cart & Atomic Stock Check**: Click **"Add to Shopping Bag"**, open the cart drawer, and point out the **Complimentary Shipping Bar** ($150 threshold).

### [0:45 - 2:00] Minute 2: The AI Artisan Studio Workflow
1. **Switch Persona**: Click the **Account icon** in the header (`/auth`) and click **"Artisan Persona"** (*Meera Devi*).
2. **Open AI Studio**: Click **"Add New Craft"** (`/studio/products/new`) in the top artisan bar.
3. **Step 1 — AI Photography**: Upload a product photo, select preset **"Studio Lighting"**, and click **"Enhance Image with AI"**. Point out the white-balance correction and texture preservation.
4. **Step 2 — Voice AI Cataloguer**:
   - Select Language: **Hindi (हिन्दी)** or **English**.
   - Click **"Start Voice Recording"** and speak into microphone: *"This is a hand-carved Nardi wood boat platter made in Udayagiri. Fired with cold-pressed walnut oil polish for food safety."*
   - Click **"Generate Full Product Listing"**.
   - Show how Gemini 2.5 Flash automatically generates the title, short summary, detailed narrative, care instructions, tags, and bilingual English + Hindi descriptions!
5. **Step 3 — Fair Pricing Assistant**:
   - Click **"Open Production Cost & Pricing Formula"**.
   - Point out the math: Materials (₹650) + 4 hours labor @ ₹250/hr + Packaging (₹120) = ₹1,770 cost $\rightarrow$ **₹2,528.57 suggested price** with $30\%$ guaranteed margin.
   - Click **"Apply Suggested Price"** and **"Publish to Marketplace"**.

### [2:00 - 3:00] Minute 3: Order Fulfillment, Admin Panel & Impact
1. **Check Real-Time Catalog**: Navigate to `/shop` and show the newly published craft piece live in the shop!
2. **Simulated Checkout**: Click on the item, proceed to `/checkout`, enter shipping address, and click **"Place Order"**.
3. **Show Atomic Decrement**: Point out the order confirmation (`HK-2026-XXXXX`) and verify inventory has been reduced automatically.
4. **Switch to Admin Persona**: Click `/auth`, switch to **"Admin Persona"** (*Lead Curator Elena Vance*), and open `/admin`.
5. **Conclude**: Highlight the platform GMV oversight, order list, provenance review queue, and final impact metrics on `/our-impact`.

---

*Hastkala Hackathon Demonstration Guide v1.0.*
