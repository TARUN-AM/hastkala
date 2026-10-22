export type UserRole = 'customer' | 'artisan' | 'admin';

export type ProductStatus = 'draft' | 'pending_review' | 'published' | 'rejected';

export type OrderStatus = 'pending' | 'processing' | 'in_production' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentStatus = 'unpaid' | 'authorized' | 'captured' | 'refunded' | 'failed';

export type VerificationStatus = 'unverified' | 'submitted' | 'guild_verified' | 'admin_verified' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface ArtisanProfile {
  id: string;
  user_id: string;
  slug: string;
  business_name: string;
  craft_specialty: string;
  region: string;
  country: string;
  bio: string;
  story?: string;
  workshop_location?: string;
  years_of_experience: number;
  avatar_url?: string;
  cover_image_url?: string;
  is_approved: boolean;
  verification_status: VerificationStatus;
  created_at: string;
  verified_at?: string;
  rating?: number | string;
  completed_orders_count?: number;
  city?: string;
  materials?: string[];
  techniques?: string[];
  cultural_context?: string;
  workshop_photos?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string;
  display_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
}

export interface ProvenanceEvidence {
  id: string;
  product_id?: string;
  artisan_id?: string;
  document_type: 'guild_certificate' | 'workshop_photo' | 'material_receipt' | 'gi_tag' | 'master_lineage';
  document_url: string;
  notes: string;
  status: VerificationStatus;
  created_at: string;
}

export interface Product {
  id: string;
  artisan_id: string;
  category_id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  compare_at_price?: number;
  cost_price?: number;
  currency: string;
  stock_quantity: number;
  craft_type: string;
  region_of_origin: string;
  materials: string[];
  dimensions?: string;
  care_instructions?: string;
  lead_time_days?: number;
  status: ProductStatus;
  is_featured: boolean;
  tags: string[];
  verification_status: VerificationStatus;
  images: ProductImage[];
  artisan?: ArtisanProfile;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  street_address: string;
  apartment?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  artisan_id: string;
  product_title_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  total_price_snapshot: number;
  artisan_fulfillment_status: OrderStatus;
  product_image_snapshot?: string;
  artisan_name_snapshot?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_email: string;
  customer_name: string;
  shipping_address: {
    full_name: string;
    street_address: string;
    apartment?: string;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total_amount: number;
  currency: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: string;
  payment_idempotency_key?: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type StoryCategory = 'Craft Heritage' | 'Artisan Stories';

export interface CraftStorySection {
  heading: string;
  body: string;
  quote?: string;
  quoteAuthor?: string;
  image?: string;
  imageCaption?: string;
}

export interface CraftStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: StoryCategory;
  cover_image: string;
  author_name: string;
  author_role: string;
  published_at: string;
  read_time_minutes: number;
  artisan_slug?: string;
  region?: string;
  tags?: string[];
  content: {
    leadParagraph: string;
    sections: CraftStorySection[];
    provenanceNote?: string;
  };
}

export type EnquiryStatus = 'open' | 'in_progress' | 'responded' | 'closed';

export interface BulkEnquiry {
  id: string;
  product_id?: string;
  artisan_id?: string;
  product_title?: string;
  artisan_name?: string;
  buyer_name: string;
  organization_name?: string;
  buyer_email: string;
  buyer_phone?: string;
  craft_interest?: string;
  requested_quantity: number;
  target_delivery_date?: string;
  destination_region?: string;
  budget_range?: string;
  message: string;
  status: EnquiryStatus;
  response_notes?: string;
  created_at: string;
  updated_at: string;
}
