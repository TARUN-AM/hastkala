# Hastkala — User Guide for Customers and Artisans

Welcome to **Hastkala** (*The Art of Handmade, The Soul of India*), an artisan e-commerce marketplace connecting independent Indian master craftspeople directly with conscious buyers worldwide.

This guide provides step-by-step instructions for customers browsing and purchasing handmade crafts, as well as artisans using the **AI Artisan Studio** to catalog products and manage orders.

---

## Table of Contents
1. [Getting Started](#1-getting-started)
2. [Customer User Guide](#2-customer-user-guide)
   - [Browsing & Discovering Crafts](#browsing--discovering-crafts)
   - [Searching & Filtering](#searching--filtering)
   - [Product Details & Provenance](#product-details--provenance)
   - [Wishlist & Shopping Cart](#wishlist--shopping-cart)
   - [Checkout & Order Tracking](#checkout--order-tracking)
3. [Artisan User Guide](#3-artisan-user-guide)
   - [Accessing the Artisan Studio](#accessing-the-artisan-studio)
   - [Managing Your Artisan Profile](#managing-your-artisan-profile)
   - [Creating & Editing Product Listings](#creating--editing-product-listings)
   - [Using the AI Product Studio](#using-the-ai-product-studio)
   - [Fulfilling Customer Orders](#fulfilling-customer-orders)
   - [Bulk Buyer Enquiries](#bulk-buyer-enquiries)
4. [Craft Stories & Artisan Directory](#4-craft-stories--artisan-directory)
5. [Troubleshooting & FAQs](#5-troubleshooting--faqs)

---

## 1. Getting Started

### Accessing the Website
Open your browser and navigate to the live deployment:
**https://ais-dev-f7yq5r5efixbnqcw3kzem2-98099549395.asia-southeast1.run.app/**

### Navigation Header
The Hastkala header remains fixed at the top of every page and contains:
- **Top Announcement Bar**: Displays news on direct artisan earnings and complimentary shipping on orders over $150.
- **Hastkala Wordmark & Logo**: Clicking the centered logo returns you to the Homepage (`/`).
- **Navigation Menu**:
  - `SHOP`: Complete filterable product catalog (`/shop`).
  - `OUR ARTISANS`: Directory of verified master artisans and guilds (`/artisans`).
  - `CRAFT STORIES`: Editorial features on living heritage and traditional techniques (`/craft-stories`).
  - `OUR IMPACT`: Measured social and economic contributions (`/our-impact`).
- **Utility Icons**:
  - **Search** (`/search`): Instant search drawer with keyword suggestions.
  - **Account / Auth** (`/auth`): Sign in, register, or switch user personas.
  - **Wishlist**: Saved items drawer.
  - **Shopping Bag** (`/cart`): Interactive cart drawer displaying line items and subtotal.

### User Account & Persona Switcher
Hastkala includes a **1-Click Persona Switcher** on the Sign In page (`/auth`) to easily test all user roles:
1. Click the **Account** icon in the header or navigate to `/auth`.
2. To test customer workflows, select **"Customer Persona"** (Sarah Patel).
3. To test artisan workflows, select **"Artisan Persona"** (Meera Devi - Meera Devi Handlooms).
4. To test administrative features, select **"Admin Persona"** (Lead Curator Elena Vance).
5. Alternatively, register a new account by filling in your Name, Email, Role (Customer or Artisan), and Password.

---

## 2. Customer User Guide

### Browsing & Discovering Crafts
Customers can discover products through multiple curated pathways:
- **Homepage Showcase (`/`)**: Features seasonal collections, top craft disciplines (Textiles, Pottery & Ceramics, Jewellery, Home Decor, Handmade Accessories, Artisan Gifts), Curator's Choice items, and the Tholu Bommalata shadow art spotlight.
- **Shop Catalog (`/shop`)**: Access the complete collection of authentic handcrafted pieces.

### Searching & Filtering
On the Shop page (`/shop`), narrow down products using multi-faceted filters:
1. **Craft Category**: Select specific disciplines such as *Textiles*, *Pottery & Ceramics*, *Jewellery*, *Home Decor*, or *Tholu Bommalata*.
2. **Region of Origin**: Filter by geographic craft clusters (e.g., *Jaipur, Rajasthan*, *Srikalahasti, Andhra Pradesh*, *Dharwad, Karnataka*, *Auroville, Tamil Nadu*).
3. **Price Range Slider**: Filter by budget bounds.
4. **Stock Availability**: Toggle "In-Stock Only" to view items ready for immediate dispatch.
5. **Sort Dropdown**: Sort by *Featured*, *Price: Low to High*, *Price: High to Low*, or *Newest Arrivals*.
6. **Search Bar (`/search`)**: Search across product titles, craft techniques, materials (e.g. *Nardi wood*, *terracotta*, *indigo*, *goat parchment*), and artisan names.

### Product Details & Provenance
Clicking any product card opens the **Product Detail Page** (`/products/:slug`):
- **Image Gallery**: View high-resolution photographs showcasing textures, details, and dimensions.
- **Artisan Provenance Card**: Displays the maker's photo, name, workshop location, and "Guild Verified" or "Admin Inspected" status seal.
- **Specifications**: Materials used, dimensions, care instructions, lead time to dispatch, and available stock.
- **Living Heritage Story**: Detailed narrative explaining the traditional making process, cultural heritage, and regional history.

### Wishlist & Shopping Cart
1. **Adding to Wishlist**: Click the **Heart Icon** on any product card or detail page. Access your saved items anytime from the header heart icon.
2. **Adding to Cart**: Select quantity and click **"Add to Shopping Bag"**.
3. **Managing Cart Items (`/cart`)**:
   - Adjust quantities using `+` and `-` buttons (bounded by real available inventory).
   - View progress towards **Complimentary Shipping** ($150 threshold).
   - Remove items using the trash bin icon.
   - Enter optional gift packaging notes.

### Checkout & Order Tracking
1. **Proceeding to Checkout (`/checkout`)**: Click "Proceed to Checkout" from the cart drawer or `/cart` page.
2. **Shipping Address**: Enter Recipient Name, Street Address, City, State/Province, Postal Code, and Phone Number.
3. **Payment Method**: Select Payment Method (Credit/Debit Card, UPI / NetBanking, or Direct Bank Transfer). Payment processing operates under a secure simulated payment gateway with idempotency protection.
4. **Order Confirmation (`/checkout/success`)**: Upon placing the order:
   - Real-time stock levels are atomically decremented.
   - An order receipt (`HK-2026-XXXXX`) is generated with price snapshots.
5. **Order History (`/orders`)**: View your active and past orders, fulfillment tracking (`Processing` → `In Production` → `Shipped` → `Delivered`), and line item breakdowns.

---

## 3. Artisan User Guide

### Accessing the Artisan Studio
1. Log in with an **Artisan account** (or switch to the Artisan persona at `/auth`).
2. The **Artisan Navigation Bar** appears at the top, providing direct access to:
   - **Studio Overview (`/studio`)**: Summary of total listings, sales GMV, pending orders, and inventory alerts.
   - **My Listings (`/studio/products`)**: Manage all catalog items, filter by status (`Published`, `Draft`, `Pending Review`), and edit listings.
   - **Add New Craft (`/studio/products/new`)**: Launch the **AI Artisan Product Studio**.
   - **Customer Orders (`/studio/orders`)**: View orders placed for your craft pieces and update fulfillment status.
   - **Studio Profile (`/studio/profile`)**: Update workshop address, biography, craft lineage, and imagery.

### Managing Your Artisan Profile
On the **Studio Profile** page (`/studio/profile`):
1. Update your **Studio Name** (e.g. *Meera Devi Handlooms*).
2. Enter your **Craft Specialty** and **Years of Experience**.
3. Specify your **Workshop Address** (e.g. *Heritage Loom Shed, Kelger Road, Dharwad*).
4. Edit your **Bio** and **Lineage Story** describing how you learned your craft.
5. List primary **Materials** and **Techniques** used in your workshop.
6. Click **"Save Studio Profile"** to update your public profile on `/artisans/:slug`.

### Creating & Editing Product Listings
Navigate to `/studio/products/new` (or click "Edit" on any existing item in `/studio/products`):

The form is organized into three major sections:
1. **Product Photography & Image Studio**
2. **Multilingual Voice-First AI Cataloguer**
3. **Fair & Transparent AI Pricing Assistant**

### Using the AI Product Studio

#### Feature 1: AI Product Photography Studio
- Upload a smartphone photograph or paste an image URL.
- Select an **Enhancement Preset**: *Studio Lighting*, *Warm Sunlight*, or *Earthen Contrast*.
- Click **"Enhance Image with AI"**.
- The AI optimizes white balance, background contrast, and product framing while preserving authentic handmade textures.
- Click **"Use Enhanced Image"** to apply it to your listing.

#### Feature 2: Multilingual Voice-First AI Cataloguer
- Select your preferred speaking/writing language (*Hindi, Kannada, Telugu, Tamil, English, Bengali, Marathi, Gujarati*).
- Click **"Start Voice Recording"** and speak into your device microphone (or type notes into the text box).
- Example spoken input: *"This is a hand-carved Nardi wood boat platter made in Udayagiri. Fired with cold-pressed walnut oil polish for food safety."*
- Click **"Generate Full Product Listing"**.
- Gemini 2.5 Flash processes your notes and populates:
  - Evocative Product Title
  - Short Summary
  - Detailed Editorial Story & Cultural Context
  - Recommended Materials & Care Instructions
  - English & Hindi descriptions
  - High-intent search tags & category selection
- Review and refine any field as needed before saving.

#### Feature 3: Fair & Transparent AI Pricing Assistant
- Click **"Open Production Cost & Pricing Formula"**.
- Enter your costs:
  - **Materials Cost** (e.g., ₹650 for raw silk, wood, or dyes)
  - **Labor Hours Spent** (e.g., 4 hours)
  - **Fair Hourly Labor Rate** (e.g., ₹250/hour)
  - **Packaging & Transport Cost** (e.g., ₹120)
  - **Target Profit Margin** (e.g., 30%)
- Click **"Calculate & Apply Price"**.
- The formula calculates:
  - Direct Cost of Production: $\text{Materials} + (\text{Hours} \times \text{Hourly Rate}) + \text{Packaging} = ₹1,770$
  - Suggested Retail Price: $\frac{\text{Direct Cost}}{1 - \text{Margin}} = ₹2,528.57$
  - Guaranteed Profit per piece: $₹758.57$
- Click **"Apply Suggested Price"** to automatically populate your listing price.

#### Saving & Publishing
- Choose **Listing Visibility**: *Published (Live in Shop)*, *Draft (Private)*, or *Pending Review*.
- Click **"Publish to Marketplace"**.

### Fulfilling Customer Orders
1. Open **Customer Orders (`/studio/orders`)**.
2. View incoming customer orders containing your products.
3. Update line item fulfillment status as work progresses:
   - `Processing` → Order received at workshop.
   - `In Production` → Handcrafting in progress.
   - `Shipped` → Dispatched via courier (tracking details logged).
   - `Delivered` → Successfully received by buyer.

### Bulk Buyer Enquiries
Artisans can view wholesale/bulk enquiry requests from boutiques, architects, and corporate buyers:
1. Check the **Bulk Enquiries** panel on your studio dashboard (`/studio`).
2. Review requested quantities, target delivery dates, destination region, and custom notes.
3. Update enquiry status (`Open` → `In Progress` → `Quotation Sent` → `Fulfilled`).

---

## 4. Craft Stories & Artisan Directory

### Craft Stories (`/craft-stories`)
Hastkala features rich editorial essays celebrating traditional Indian craftsmanship:
- Browse essays by category (*Craft Heritage*, *Artisan Stories*, *Techniques*).
- Read detailed accounts of temple traditions, natural dyeing, wood carving, and lost-wax metalwork.
- Click **"Explore Artisan's Shop"** inside any story to view products created by the featured maker.

### Artisan Directory (`/artisans`)
- View all 11 master artisans in a clean 4-column profile card layout.
- Search artisans by name, city, or craft discipline.
- Filter by region (*Rajasthan*, *Andhra Pradesh*, *Karnataka*, *Tamil Nadu*).
- Click any card to open the **Artisan Profile Page** (`/artisans/:slug`), displaying their studio location, bio, verified credentials, and active catalog items.

---

## 5. Troubleshooting & FAQs

### Q1: I tried using Voice Recording, but nothing happened.
- **Cause**: Speech recognition requires microphone permission in your web browser.
- **Solution**: When prompted by your browser, click **"Allow Microphone Access"**. If speech recognition is unsupported by your browser version, you can type or paste your spoken notes directly into the text box.

### Q2: Why is the AI-generated description different from my exact words?
- **Cause**: The Gemini AI assistant polishes rough spoken notes into structured, customer-facing editorial prose.
- **Solution**: You have complete control over the generated text. Simply edit any paragraph directly in the form before clicking "Publish to Marketplace".

### Q3: My order failed at checkout due to stock limits.
- **Cause**: Hastkala enforces atomic stock checking to prevent double-selling one-of-a-kind handmade items.
- **Solution**: If another buyer completes checkout for a limited stock item simultaneously, the system updates inventory automatically. Lower the requested quantity or browse alternative pieces from the artisan's shop.

### Q4: Can I test the platform without setting up API keys or credit cards?
- **Yes!** Hastkala runs with pre-seeded demonstration data out-of-the-box. Simulated card checkout works instantly, and AI features automatically use graceful rule-based fallbacks if no API key is present.

---

*Hastkala User Guide v1.0 — Empowering Indian Artisans through Digital Innovation.*
