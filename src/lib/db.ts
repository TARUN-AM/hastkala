import {
  ArtisanProfile,
  BulkEnquiry,
  Category,
  CraftStory,
  EnquiryStatus,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  ProductStatus,
  Profile,
  ProvenanceEvidence,
  UserRole,
  VerificationStatus,
} from '../types/database';
import {
  SEED_ARTISANS,
  SEED_CATEGORIES,
  SEED_PRODUCTS,
  SEED_PROFILES,
  SEED_STORIES,
} from './seed-data';

const STORAGE_KEYS = {
  PRODUCTS: 'hastkala_products_v1',
  ARTISANS: 'hastkala_artisans_v1',
  CATEGORIES: 'hastkala_categories_v1',
  PROFILES: 'hastkala_profiles_v1',
  ORDERS: 'hastkala_orders_v1',
  PROVENANCE: 'hastkala_provenance_v1',
  SUBSCRIBERS: 'hastkala_subscribers_v1',
  PROCESSED_IDEMPOTENCY: 'hastkala_idempotency_v1',
  STORIES: 'hastkala_stories_v1',
  ENQUIRIES: 'hastkala_enquiries_v1',
};

// Initial provenance evidence for seed products
const INITIAL_PROVENANCE: ProvenanceEvidence[] = [
  {
    id: 'prov-1',
    product_id: 'prod-1',
    artisan_id: 'artisan-1',
    document_type: 'guild_certificate',
    document_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    notes: 'Karnataka State Handloom Weavers Cooperative Guild Certificate #KA-DHW-2024-88',
    status: 'guild_verified',
    created_at: '2026-01-20T11:00:00Z',
  },
  {
    id: 'prov-2',
    product_id: 'prod-2',
    artisan_id: 'artisan-2',
    document_type: 'workshop_photo',
    document_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    notes: 'Auroville Anagama Wood-Fire Kiln 72h Continuous Firing Log and Kiln Inspection',
    status: 'admin_verified',
    created_at: '2026-02-01T15:20:00Z',
  },
  {
    id: 'prov-3',
    product_id: 'prod-3',
    artisan_id: 'artisan-3',
    document_type: 'master_lineage',
    document_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    notes: 'Heritage Lost-Wax Guild Documentation, Tripolia Metal Artisans Union',
    status: 'guild_verified',
    created_at: '2026-02-10T10:00:00Z',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-initial-1',
    order_number: 'HK-2026-10842',
    user_id: 'user-customer-1',
    customer_email: 'sarah.patel@hastkala.dev',
    customer_name: 'Sarah Patel',
    shipping_address: {
      full_name: 'Sarah Patel',
      street_address: '42 Craftsman Way',
      apartment: 'Studio 4B',
      city: 'Portland',
      state_province: 'OR',
      postal_code: '97201',
      country: 'United States',
      phone: '+1 (555) 234-5678',
    },
    subtotal: 135.0,
    shipping_cost: 12.0,
    tax_amount: 6.75,
    total_amount: 153.75,
    currency: 'USD',
    order_status: 'processing',
    payment_status: 'captured',
    payment_method: 'mock_card',
    payment_idempotency_key: 'seed-idemp-key-1',
    notes: 'Please pack in natural kraft paper for gifting.',
    items: [
      {
        id: 'oi-seed-1',
        order_id: 'ord-initial-1',
        product_id: 'prod-1',
        artisan_id: 'artisan-1',
        product_title_snapshot: 'Dharwad Kasuti Embroidered Khadi Shawl',
        unit_price_snapshot: 135.0,
        quantity: 1,
        total_price_snapshot: 135.0,
        artisan_fulfillment_status: 'processing',
        product_image_snapshot: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
        artisan_name_snapshot: 'Meera Devi Handlooms',
      },
    ],
    created_at: '2026-10-21T10:00:00Z',
  },
];

// Helper to safely access localStorage (SSR-safe if run in node)
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key) || window.localStorage.getItem(key.replace('hastkala_', 'craft_here_'));
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

const INITIAL_ENQUIRIES: BulkEnquiry[] = [
  {
    id: 'enq-101',
    product_id: 'prod-pushpa-lamp',
    artisan_id: 'artisan-kanday-anjanappa',
    product_title: 'Pushpa Tholu Bommalata Lamp',
    artisan_name: 'Kanday Anjanappa',
    buyer_name: 'Aarav Mehta',
    organization_name: 'Crafts & Living Boutique, Mumbai',
    buyer_email: 'aarav.m@craftsliving.in',
    buyer_phone: '+91 98200 45678',
    craft_interest: 'Tholu Bommalata Shadow Lighting',
    requested_quantity: 15,
    target_delivery_date: '2026-11-15',
    destination_region: 'Mumbai, Maharashtra',
    budget_range: '₹30,000 - ₹40,000',
    message: 'We are curating illuminated leather parchment lamps for an upcoming heritage hotel launch in South Mumbai.',
    status: 'open',
    created_at: '2026-10-21T14:30:00Z',
    updated_at: '2026-10-21T14:30:00Z',
  },
  {
    id: 'enq-102',
    product_id: 'prod-kalamkari-pink',
    artisan_id: 'artisan-padma',
    product_title: 'Pen Kalamkari Dupatta – Floral Garden Pink',
    artisan_name: 'Padma',
    buyer_name: 'Dr. Sunita Rao',
    organization_name: 'Sanskriti Handlooms Collective',
    buyer_email: 'sunita.rao@sanskritihandlooms.org',
    buyer_phone: '+91 94480 12345',
    craft_interest: 'Pen Kalamkari Natural Botanical Textiles',
    requested_quantity: 25,
    target_delivery_date: '2026-12-01',
    destination_region: 'Bengaluru, Karnataka',
    budget_range: '₹60,000 - ₹75,000',
    message: 'Looking to order 25 authentic freehand pen Kalamkari dupattas for our annual artisan exhibition.',
    status: 'in_progress',
    response_notes: 'Artisan Padma confirmed capability for 25 units within 4 weeks.',
    created_at: '2026-10-20T11:00:00Z',
    updated_at: '2026-10-21T09:15:00Z',
  },
];

// In-memory runtime state with lazy initialization
class DatabaseStore {
  private products: Product[] = [];
  private artisans: ArtisanProfile[] = [];
  private categories: Category[] = [];
  private profiles: Profile[] = [];
  private orders: Order[] = [];
  private provenance: ProvenanceEvidence[] = [];
  private subscribers: string[] = [];
  private idempotencyKeys: Record<string, string> = {}; // key -> order_id
  private stories: CraftStory[] = [];
  private enquiries: BulkEnquiry[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;
    const storedProducts = getStored<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
    const seedProdMap = new Map(SEED_PRODUCTS.map((p) => [p.id, p]));
    const mergedProducts = storedProducts.map((stored) => {
      const seed = seedProdMap.get(stored.id);
      return seed ? { ...stored, ...seed } : stored;
    });
    // Add missing seeds at beginning or end as appropriate
    for (const seed of SEED_PRODUCTS) {
      if (!mergedProducts.some((p) => p.id === seed.id)) {
        mergedProducts.unshift(seed);
      }
    }
    // Re-sort so newest seed products appear at the top
    mergedProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    this.products = mergedProducts;
    setStored(STORAGE_KEYS.PRODUCTS, mergedProducts);

    const storedArtisans = getStored<ArtisanProfile[]>(STORAGE_KEYS.ARTISANS, SEED_ARTISANS);
    const seedArtisanMap = new Map(SEED_ARTISANS.map((a) => [a.id, a]));
    const mergedArtisans = storedArtisans.map((stored) => {
      const seed = seedArtisanMap.get(stored.id);
      return seed ? { ...stored, ...seed } : stored;
    });
    for (const seed of SEED_ARTISANS) {
      if (!mergedArtisans.some((a) => a.id === seed.id)) {
        mergedArtisans.push(seed);
      }
    }
    this.artisans = mergedArtisans;
    setStored(STORAGE_KEYS.ARTISANS, mergedArtisans);

    this.categories = getStored<Category[]>(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
    this.profiles = getStored<Profile[]>(STORAGE_KEYS.PROFILES, SEED_PROFILES);
    this.orders = getStored<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.provenance = getStored<ProvenanceEvidence[]>(STORAGE_KEYS.PROVENANCE, INITIAL_PROVENANCE);
    this.subscribers = getStored<string[]>(STORAGE_KEYS.SUBSCRIBERS, ['welcome@hastkala.dev']);
    this.idempotencyKeys = getStored<Record<string, string>>(STORAGE_KEYS.PROCESSED_IDEMPOTENCY, {});
    this.enquiries = getStored<BulkEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    
    this.stories = SEED_STORIES;
    setStored(STORAGE_KEYS.STORIES, SEED_STORIES);

    // Sanitize any existing localStorage data from previous sessions
    this.profiles = this.profiles.map((p) => ({
      ...p,
      email: p.email ? p.email.replace('@craft-here.dev', '@hastkala.dev') : p.email,
    }));
    this.orders = this.orders.map((o) => ({
      ...o,
      order_number: o.order_number ? o.order_number.replace(/^CH-/, 'HK-') : o.order_number,
      customer_email: o.customer_email ? o.customer_email.replace('@craft-here.dev', '@hastkala.dev') : o.customer_email,
    }));
    this.subscribers = this.subscribers.map((s) => s.replace('@craft-here.dev', '@hastkala.dev'));

    this.initialized = true;
  }

  private persist(keys: (keyof typeof STORAGE_KEYS)[]) {
    keys.forEach((k) => {
      switch (k) {
        case 'PRODUCTS':
          setStored(STORAGE_KEYS.PRODUCTS, this.products);
          break;
        case 'ARTISANS':
          setStored(STORAGE_KEYS.ARTISANS, this.artisans);
          break;
        case 'CATEGORIES':
          setStored(STORAGE_KEYS.CATEGORIES, this.categories);
          break;
        case 'PROFILES':
          setStored(STORAGE_KEYS.PROFILES, this.profiles);
          break;
        case 'ORDERS':
          setStored(STORAGE_KEYS.ORDERS, this.orders);
          break;
        case 'PROVENANCE':
          setStored(STORAGE_KEYS.PROVENANCE, this.provenance);
          break;
        case 'SUBSCRIBERS':
          setStored(STORAGE_KEYS.SUBSCRIBERS, this.subscribers);
          break;
        case 'PROCESSED_IDEMPOTENCY':
          setStored(STORAGE_KEYS.PROCESSED_IDEMPOTENCY, this.idempotencyKeys);
          break;
        case 'STORIES':
          setStored(STORAGE_KEYS.STORIES, this.stories);
          break;
        case 'ENQUIRIES':
          setStored(STORAGE_KEYS.ENQUIRIES, this.enquiries);
          break;
      }
    });
  }

  // --- Products ---
  public getProducts(filters?: {
    categorySlug?: string;
    craftType?: string;
    region?: string;
    artisanId?: string;
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    query?: string;
    sort?: 'newest' | 'price_asc' | 'price_desc' | 'featured';
    status?: ProductStatus | 'all';
    limit?: number;
    offset?: number;
  }): { products: Product[]; total: number } {
    this.init();
    let result = [...this.products];

    // Filter by status (public view only sees published)
    if (filters?.status && filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    } else if (!filters?.status) {
      result = result.filter((p) => p.status === 'published');
    }

    if (filters?.categorySlug) {
      if (filters.categorySlug === 'tholu-bommalata') {
        result = result.filter(
          (p) =>
            p.category_id === 'cat-tholu-bommalata' ||
            p.craft_type.toLowerCase().includes('tholu') ||
            p.tags.some((t) => t.toLowerCase().includes('tholu')) ||
            p.title.toLowerCase().includes('tholu')
        );
      } else {
        const category = this.categories.find((c) => c.slug === filters.categorySlug);
        if (category) {
          result = result.filter((p) => p.category_id === category.id);
        } else {
          return { products: [], total: 0 };
        }
      }
    }

    if (filters?.artisanId) {
      result = result.filter((p) => p.artisan_id === filters.artisanId);
    }

    if (filters?.region) {
      const reg = filters.region.toLowerCase();
      result = result.filter((p) => p.region_of_origin.toLowerCase().includes(reg));
    }

    if (filters?.craftType) {
      const craft = filters.craftType.toLowerCase();
      result = result.filter((p) => p.craft_type.toLowerCase().includes(craft));
    }

    if (typeof filters?.minPrice === 'number') {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }

    if (typeof filters?.maxPrice === 'number') {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters?.inStockOnly) {
      result = result.filter((p) => p.stock_quantity > 0);
    }

    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.craft_type.toLowerCase().includes(q) ||
          p.region_of_origin.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (filters?.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    // Hydrate artisan and category
    const hydrated = result.map((p) => this.hydrateProduct(p));
    const total = hydrated.length;

    const offset = filters?.offset || 0;
    const limit = filters?.limit || 50;
    const paginated = hydrated.slice(offset, offset + limit);

    return { products: paginated, total };
  }

  private hydrateProduct(p: Product): Product {
    const artisan = this.artisans.find((a) => a.id === p.artisan_id);
    const category = this.categories.find((c) => c.id === p.category_id);
    return {
      ...p,
      artisan,
      category,
    };
  }

  public getProductBySlug(slug: string): Product | null {
    this.init();
    const prod = this.products.find((p) => p.slug === slug);
    return prod ? this.hydrateProduct(prod) : null;
  }

  public getProductById(id: string): Product | null {
    this.init();
    const prod = this.products.find((p) => p.id === id);
    return prod ? this.hydrateProduct(prod) : null;
  }

  public createProduct(
    data: Omit<Product, 'id' | 'created_at' | 'updated_at'>,
    authorProfile: Profile
  ): Product {
    this.init();
    const artisan = this.artisans.find((a) => a.user_id === authorProfile.id);
    if (!artisan && authorProfile.role !== 'admin') {
      throw new Error('Unauthorized: You must have an approved artisan profile to publish listings.');
    }

    // Check slug uniqueness
    let slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let counter = 1;
    while (this.products.some((p) => p.slug === slug)) {
      slug = `${data.slug || 'product'}-${counter++}`;
    }

    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      artisan_id: artisan ? artisan.id : data.artisan_id,
      slug,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.products.unshift(newProduct);
    this.persist(['PRODUCTS']);
    return this.hydrateProduct(newProduct);
  }

  public updateProduct(
    id: string,
    updates: Partial<Product>,
    actingUser: Profile
  ): Product {
    this.init();
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');

    const existing = this.products[index];
    const artisan = this.artisans.find((a) => a.id === existing.artisan_id);

    // Permission enforcement: only owner artisan or admin
    const isOwner = artisan && artisan.user_id === actingUser.id;
    const isAdmin = actingUser.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new Error('Forbidden: You can only modify your own products');
    }

    const updated: Product = {
      ...existing,
      ...updates,
      id: existing.id, // Immutable ID
      updated_at: new Date().toISOString(),
    };

    this.products[index] = updated;
    this.persist(['PRODUCTS']);
    return this.hydrateProduct(updated);
  }

  public deleteProduct(id: string, actingUser: Profile): void {
    this.init();
    const prod = this.products.find((p) => p.id === id);
    if (!prod) return;

    const artisan = this.artisans.find((a) => a.id === prod.artisan_id);
    const isOwner = artisan && artisan.user_id === actingUser.id;
    const isAdmin = actingUser.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new Error('Forbidden: You do not have permission to delete this product');
    }

    this.products = this.products.filter((p) => p.id !== id);
    this.persist(['PRODUCTS']);
  }

  // --- Categories ---
  public getCategories(): Category[] {
    this.init();
    return [...this.categories].sort((a, b) => a.display_order - b.display_order);
  }

  public getCategoryBySlug(slug: string): Category | null {
    this.init();
    return this.categories.find((c) => c.slug === slug) || null;
  }

  // --- Craft Stories ---
  private static readonly EXCLUDED_STORY_SLUGS = [
    'sacred-geometry-of-dharwad-kasuti-embroidery',
    'listening-to-the-fire-meera-devi-handloom',
  ];

  public getStories(filters?: { category?: string; artisanSlug?: string; tag?: string }): CraftStory[] {
    this.init();
    let result = this.stories.filter((s) => !DatabaseStore.EXCLUDED_STORY_SLUGS.includes(s.slug));
    if (filters?.category && filters.category !== 'All' && filters.category !== 'All Stories') {
      result = result.filter((s) => s.category === filters.category);
    }
    if (filters?.artisanSlug) {
      result = result.filter((s) => s.artisan_slug === filters.artisanSlug);
    }
    if (filters?.tag) {
      const tagLower = filters.tag.toLowerCase();
      result = result.filter((s) => s.tags?.some((t) => t.toLowerCase() === tagLower));
    }
    return result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }

  public getStoryBySlug(slug: string): CraftStory | null {
    this.init();
    return this.stories.find((s) => s.slug === slug) || null;
  }

  public getRelatedStories(currentSlug: string, limit = 3): CraftStory[] {
    this.init();
    const current = this.getStoryBySlug(currentSlug);
    const available = this.stories.filter((s) => !DatabaseStore.EXCLUDED_STORY_SLUGS.includes(s.slug));
    if (!current) return available.filter((s) => s.slug !== currentSlug).slice(0, limit);
    return available
      .filter((s) => s.slug !== currentSlug)
      .sort((a, b) => {
        if (a.category === current.category && b.category !== current.category) return -1;
        if (b.category === current.category && a.category !== current.category) return 1;
        return 0;
      })
      .slice(0, limit);
  }

  // --- Artisans ---
  public getArtisans(): ArtisanProfile[] {
    this.init();
    return [...this.artisans];
  }

  public getArtisanBySlug(slug: string): ArtisanProfile | null {
    this.init();
    return this.artisans.find((a) => a.slug === slug) || null;
  }

  public getArtisanById(id: string): ArtisanProfile | null {
    this.init();
    return this.artisans.find((a) => a.id === id) || null;
  }

  public getArtisanByUserId(userId: string): ArtisanProfile | null {
    this.init();
    return this.artisans.find((a) => a.user_id === userId) || null;
  }

  public updateArtisanProfile(
    id: string,
    updates: Partial<ArtisanProfile>,
    actingUser: Profile
  ): ArtisanProfile {
    this.init();
    const index = this.artisans.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Artisan profile not found');

    const existing = this.artisans[index];
    if (existing.user_id !== actingUser.id && actingUser.role !== 'admin') {
      throw new Error('Forbidden: You can only edit your own artisan studio');
    }

    const updated: ArtisanProfile = {
      ...existing,
      ...updates,
      id: existing.id,
      user_id: existing.user_id,
    };

    this.artisans[index] = updated;
    this.persist(['ARTISANS']);
    return updated;
  }

  // --- Orders & Atomic Stock Handling ---
  public createOrder(payload: {
    user_id?: string;
    customer_email: string;
    customer_name: string;
    shipping_address: Order['shipping_address'];
    items: { productId: string; quantity: number }[];
    payment_method: string;
    idempotency_key: string;
    notes?: string;
  }): Order {
    this.init();

    // 1. Idempotency Check: prevent duplicate submissions
    if (payload.idempotency_key && this.idempotencyKeys[payload.idempotency_key]) {
      const existingOrderId = this.idempotencyKeys[payload.idempotency_key];
      const existingOrder = this.orders.find((o) => o.id === existingOrderId);
      if (existingOrder) {
        return existingOrder;
      }
    }

    if (!payload.items || payload.items.length === 0) {
      throw new Error('Cannot create an empty order');
    }

    // 2. Atomic Stock & Price Validation
    const orderItems: OrderItem[] = [];
    let subtotal = 0;

    // Verify all stock availability before making any decrements
    for (const item of payload.items) {
      const product = this.products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ID ${item.productId} is no longer available`);
      }
      if (product.status !== 'published') {
        throw new Error(`"${product.title}" is currently not available for purchase`);
      }
      if (product.stock_quantity < item.quantity) {
        throw new Error(
          `Insufficient stock for "${product.title}". Requested: ${item.quantity}, Available: ${product.stock_quantity}`
        );
      }
    }

    // 3. Perform atomic decrement and capture price snapshots
    for (const item of payload.items) {
      const productIndex = this.products.findIndex((p) => p.id === item.productId);
      const product = this.products[productIndex];
      const artisan = this.artisans.find((a) => a.id === product.artisan_id);

      // Decrement stock
      this.products[productIndex] = {
        ...product,
        stock_quantity: product.stock_quantity - item.quantity,
      };

      const lineTotal = Number((product.price * item.quantity).toFixed(2));
      subtotal += lineTotal;

      orderItems.push({
        id: `oi-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        order_id: '', // set below
        product_id: product.id,
        artisan_id: product.artisan_id,
        product_title_snapshot: product.title,
        unit_price_snapshot: product.price,
        quantity: item.quantity,
        total_price_snapshot: lineTotal,
        artisan_fulfillment_status: 'processing',
        product_image_snapshot: product.images[0]?.image_url,
        artisan_name_snapshot: artisan?.business_name || 'Independent Artisan',
      });
    }

    // Shipping cost rule: Orders over $150 get complimentary artisan shipping, else $12 flat
    const shipping_cost = subtotal >= 150 ? 0 : 12;
    const tax_amount = Number((subtotal * 0.05).toFixed(2)); // 5% craft tax
    const total_amount = Number((subtotal + shipping_cost + tax_amount).toFixed(2));

    const orderId = `ord-${Date.now()}`;
    const orderNumber = `HK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      user_id: payload.user_id,
      customer_email: payload.customer_email,
      customer_name: payload.customer_name,
      shipping_address: payload.shipping_address,
      subtotal: Number(subtotal.toFixed(2)),
      shipping_cost,
      tax_amount,
      total_amount,
      currency: 'USD',
      order_status: 'processing',
      payment_status: 'captured',
      payment_method: payload.payment_method,
      payment_idempotency_key: payload.idempotency_key,
      notes: payload.notes,
      items: orderItems.map((oi) => ({ ...oi, order_id: orderId })),
      created_at: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);

    // Save idempotency key mapping
    if (payload.idempotency_key) {
      this.idempotencyKeys[payload.idempotency_key] = orderId;
    }

    this.persist(['PRODUCTS', 'ORDERS', 'PROCESSED_IDEMPOTENCY']);
    return newOrder;
  }

  public getOrdersForUser(userId: string): Order[] {
    this.init();
    return this.orders.filter((o) => o.user_id === userId);
  }

  public getOrdersForArtisan(artisanId: string): { order: Order; item: OrderItem }[] {
    this.init();
    const result: { order: Order; item: OrderItem }[] = [];
    for (const order of this.orders) {
      for (const item of order.items) {
        if (item.artisan_id === artisanId) {
          result.push({ order, item });
        }
      }
    }
    return result;
  }

  public getAllOrders(actingUser: Profile): Order[] {
    this.init();
    if (actingUser.role !== 'admin') {
      throw new Error('Forbidden: Only administrators can view all orders');
    }
    return [...this.orders];
  }

  public getOrderById(orderId: string): Order | null {
    this.init();
    return this.orders.find((o) => o.id === orderId) || null;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus, actingUser: Profile): Order {
    this.init();
    if (actingUser.role !== 'admin') {
      throw new Error('Forbidden: Only administrators can change global order status');
    }
    const orderIndex = this.orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      order_status: status,
    };
    this.persist(['ORDERS']);
    return this.orders[orderIndex];
  }

  public updateOrderItemFulfillment(
    orderId: string,
    orderItemId: string,
    status: OrderStatus,
    actingUser: Profile
  ): Order {
    this.init();
    const orderIndex = this.orders.findIndex((o) => o.id === orderId);
    if (orderIndex === -1) throw new Error('Order not found');

    const order = this.orders[orderIndex];
    const itemIndex = order.items.findIndex((i) => i.id === orderItemId);
    if (itemIndex === -1) throw new Error('Order item not found');

    const item = order.items[itemIndex];
    const artisan = this.artisans.find((a) => a.id === item.artisan_id);

    // Permission: must be the item's artisan or admin
    if ((!artisan || artisan.user_id !== actingUser.id) && actingUser.role !== 'admin') {
      throw new Error('Forbidden: You can only update fulfillment on your own craft items');
    }

    const updatedItems = [...order.items];
    updatedItems[itemIndex] = {
      ...item,
      artisan_fulfillment_status: status,
    };

    this.orders[orderIndex] = {
      ...order,
      items: updatedItems,
    };
    this.persist(['ORDERS']);
    return this.orders[orderIndex];
  }

  // --- Provenance & Verifications ---
  public getProvenanceRecords(): ProvenanceEvidence[] {
    this.init();
    return [...this.provenance];
  }

  public reviewProvenance(
    id: string,
    status: VerificationStatus,
    notes: string,
    actingAdmin: Profile
  ): ProvenanceEvidence {
    this.init();
    if (actingAdmin.role !== 'admin') {
      throw new Error('Forbidden: Only curators can review provenance evidence');
    }
    const index = this.provenance.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Record not found');

    const updated: ProvenanceEvidence = {
      ...this.provenance[index],
      status,
      notes: notes || this.provenance[index].notes,
    };
    this.provenance[index] = updated;
    this.persist(['PROVENANCE']);
    return updated;
  }

  // --- Profiles & Auth ---
  public getProfiles(): Profile[] {
    this.init();
    return [...this.profiles];
  }

  public getProfileById(id: string): Profile | null {
    this.init();
    return this.profiles.find((p) => p.id === id) || null;
  }

  public getProfileByEmail(email: string): Profile | null {
    this.init();
    return this.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
  }

  public createProfile(data: { email: string; full_name: string; role: UserRole; phone?: string }): Profile {
    this.init();
    const existing = this.getProfileByEmail(data.email);
    if (existing) {
      return existing;
    }
    const newProfile: Profile = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
      phone: data.phone,
      created_at: new Date().toISOString(),
    };
    this.profiles.push(newProfile);

    // If new user registered as artisan, create initial pending artisan profile
    if (data.role === 'artisan') {
      const slug = data.full_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-studio';
      const newArtisan: ArtisanProfile = {
        id: `artisan-${Date.now()}`,
        user_id: newProfile.id,
        slug,
        business_name: `${data.full_name}'s Studio`,
        craft_specialty: 'Handcrafted Works',
        region: 'Independent Studio',
        country: 'India',
        bio: 'Artisan crafting handmade pieces with care and natural materials.',
        years_of_experience: 1,
        is_approved: true, // Auto-approved in demo for instant testing
        verification_status: 'submitted',
        created_at: new Date().toISOString(),
      };
      this.artisans.push(newArtisan);
      this.persist(['ARTISANS']);
    }

    this.persist(['PROFILES']);
    return newProfile;
  }

  // --- Newsletter ---
  public subscribeNewsletter(email: string): boolean {
    this.init();
    const trimmed = email.toLowerCase().trim();
    if (!this.subscribers.includes(trimmed)) {
      this.subscribers.push(trimmed);
      this.persist(['SUBSCRIBERS']);
    }
    return true;
  }

  // --- Bulk Enquiries ---
  public getEnquiries(filters?: { artisanId?: string; status?: EnquiryStatus }): BulkEnquiry[] {
    this.init();
    let result = [...this.enquiries];
    if (filters?.artisanId) {
      result = result.filter((e) => e.artisan_id === filters.artisanId);
    }
    if (filters?.status) {
      result = result.filter((e) => e.status === filters.status);
    }
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public createEnquiry(data: Omit<BulkEnquiry, 'id' | 'created_at' | 'updated_at' | 'status'>): BulkEnquiry {
    this.init();
    const newEnquiry: BulkEnquiry = {
      ...data,
      id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'open',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.enquiries.unshift(newEnquiry);
    this.persist(['ENQUIRIES']);
    return newEnquiry;
  }

  public updateEnquiryStatus(id: string, status: EnquiryStatus, responseNotes?: string): BulkEnquiry {
    this.init();
    const index = this.enquiries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enquiry record not found');

    const updated: BulkEnquiry = {
      ...this.enquiries[index],
      status,
      response_notes: responseNotes !== undefined ? responseNotes : this.enquiries[index].response_notes,
      updated_at: new Date().toISOString(),
    };
    this.enquiries[index] = updated;
    this.persist(['ENQUIRIES']);
    return updated;
  }


  // --- Reset to clean Seed State ---
  public resetToSeed(): void {
    this.products = [...SEED_PRODUCTS];
    this.artisans = [...SEED_ARTISANS];
    this.categories = [...SEED_CATEGORIES];
    this.profiles = [...SEED_PROFILES];
    this.orders = [];
    this.provenance = [...INITIAL_PROVENANCE];
    this.subscribers = ['welcome@hastkala.dev'];
    this.idempotencyKeys = {};
    this.stories = [...SEED_STORIES];
    this.persist([
      'PRODUCTS',
      'ARTISANS',
      'CATEGORIES',
      'PROFILES',
      'ORDERS',
      'PROVENANCE',
      'SUBSCRIBERS',
      'PROCESSED_IDEMPOTENCY',
      'STORIES',
    ]);
  }
}

export const db = new DatabaseStore();
