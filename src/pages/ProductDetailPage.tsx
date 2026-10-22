import React, { useState } from 'react';
import {
  MapPin,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  Award,
  Building2,
} from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { db } from '../lib/db';
import { useCart } from '../lib/cart-context';
import { useWishlist } from '../lib/wishlist-context';
import { ProvenanceBadge } from '../components/common/ProvenanceBadge';
import { ProductCard } from '../components/common/ProductCard';
import { formatPrice } from '../utils/formatters';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const product = db.getProductBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Bulk Wholesale Enquiry State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [requestedQty, setRequestedQty] = useState(10);
  const [targetDate, setTargetDate] = useState('');
  const [destinationRegion, setDestinationRegion] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#29251F] mb-3">Craft Piece Not Found</h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested listing may have been moved or is currently in draft.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#8A4935] text-white text-sm font-semibold rounded hover:bg-[#753C2B]"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const images = product.images?.length > 0 ? product.images : [
    {
      id: 'default',
      product_id: product.id,
      image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
      alt_text: product.title,
      sort_order: 0,
      is_primary: true,
    },
  ];

  const handleAddToCart = () => {
    const res = addItem(product, quantity);
    if (res.success) {
      setAdded(true);
      setErrorMsg('');
      setTimeout(() => setAdded(false), 2400);
    } else {
      setErrorMsg(res.message || 'Unable to add to cart');
    }
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      alert('Please supply contact name and email address');
      return;
    }

    db.createEnquiry({
      product_id: product.id,
      artisan_id: product.artisan_id,
      product_title: product.title,
      artisan_name: product.artisan?.business_name,
      buyer_name: buyerName,
      organization_name: organizationName,
      buyer_email: buyerEmail,
      buyer_phone: buyerPhone,
      craft_interest: product.craft_type,
      requested_quantity: Number(requestedQty),
      target_delivery_date: targetDate,
      destination_region: destinationRegion,
      budget_range: budgetRange,
      message: bulkMessage || `Wholesale request for ${requestedQty} units of ${product.title}.`,
    });

    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquirySuccess(false);
      setShowBulkModal(false);
    }, 2500);
  };

  // Related products from same category or artisan
  const { products: related } = db.getProducts({
    categorySlug: product.category?.slug,
    limit: 4,
  });
  const filteredRelated = related.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-stone-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#8A4935]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#8A4935]">Shop</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link to={`/categories/${product.category.slug}`} className="hover:text-[#8A4935]">
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[#29251F] font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Multi-Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/5 rounded-lg overflow-hidden bg-[#F7F0E5] border border-[#E8D9C5] shadow-xs">
            <img
              src={images[activeImageIndex]?.image_url}
              alt={images[activeImageIndex]?.alt_text || product.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4">
              <ProvenanceBadge status={product.verification_status} showDetails />
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 aspect-square rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-[#8A4935] shadow-sm' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt={img.alt_text} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Provenance & Craft Story Accordion / Section */}
          <div className="mt-8 pt-8 border-t border-[#E8D9C5] space-y-6">
            <div className="bg-[#FFFDF9] rounded-lg p-6 border border-[#E8D9C5]">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#8A4935] uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#8A4935]" />
                <span>Craft Process & Cultural Origin</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#29251F] mb-3">
                How this piece is created
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line mb-4 font-light">
                {product.description}
              </p>

              {product.artisan?.story && (
                <div className="p-4 bg-[#F7F0E5] rounded border border-[#E8D9C5]/80 text-xs text-stone-700">
                  <strong className="block text-[#29251F] font-serif mb-1">
                    Direct from {product.artisan.business_name}:
                  </strong>
                  <p className="italic">"{product.artisan.story}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Purchasing Actions & Metadata */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Craft & Region Meta */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A4935] mb-2">
              <span>{product.craft_type}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5" />
                {product.region_of_origin}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#29251F] leading-tight mb-3">
              {product.title}
            </h1>

            {/* Artisan Attribution Card */}
            {product.artisan && (
              <div className="flex items-center gap-3 p-3 bg-[#FFFDF9] rounded border border-[#E8D9C5] mb-4">
                <img
                  src={product.artisan.avatar_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
                  alt={product.artisan.business_name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E8D9C5]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-stone-500">Shaped by</div>
                  <Link
                    to={`/artisans/${product.artisan.slug}`}
                    className="font-serif font-bold text-sm text-[#29251F] hover:text-[#8A4935] hover:underline block truncate"
                  >
                    {product.artisan.business_name}
                  </Link>
                  <div className="text-[11px] text-stone-500 truncate">
                    {product.artisan.years_of_experience} years practicing in {product.artisan.region}
                  </div>
                </div>
                <Link
                  to={`/artisans/${product.artisan.slug}`}
                  className="text-xs text-[#8A4935] font-semibold hover:underline flex-shrink-0"
                >
                  Visit Studio →
                </Link>
              </div>
            )}

            {/* Price & Stock Display */}
            <div className="flex items-baseline gap-4 py-3 border-y border-[#E8D9C5]">
              <span className="font-serif text-3xl font-bold text-[#29251F]">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.compare_at_price && (
                <span className="text-base text-stone-400 line-through">
                  {formatPrice(product.compare_at_price, product.currency)}
                </span>
              )}
              <span className="text-xs font-medium text-stone-500">{product.currency}</span>

              <div className="ml-auto">
                {product.stock_quantity > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {product.stock_quantity} available in studio
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-200 px-2.5 py-1 rounded">
                    Made to Order (Lead time: {product.lead_time_days || 7} days)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-stone-700 text-sm leading-relaxed">
            {product.short_description}
          </p>

          {/* Materials & Specs */}
          <div className="space-y-3 bg-[#FFFDF9] p-4 rounded border border-[#E8D9C5] text-xs">
            {product.materials && product.materials.length > 0 && (
              <div>
                <span className="font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  Natural Materials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.materials.map((m, i) => (
                    <span key={i} className="bg-[#F7F0E5] px-2 py-0.5 rounded border border-[#E8D9C5] text-stone-800">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.dimensions && (
              <div className="pt-2 border-t border-[#E8D9C5]/60">
                <span className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Dimensions:
                </span>
                <span className="text-stone-800">{product.dimensions}</span>
              </div>
            )}

            {product.care_instructions && (
              <div className="pt-2 border-t border-[#E8D9C5]/60">
                <span className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Care Instructions:
                </span>
                <span className="text-stone-800">{product.care_instructions}</span>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
              {errorMsg}
            </div>
          )}

          {/* Purchasing Form */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#E8D9C5] rounded bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-stone-700 hover:text-black font-bold text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold w-10 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                  className="px-3.5 py-2.5 text-stone-700 hover:text-black font-bold text-sm disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
                className={`flex-1 py-3 px-6 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : product.stock_quantity <= 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-[#8A4935] hover:bg-[#753C2B] text-white shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to your Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded border transition-colors ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-[#E8D9C5] bg-[#FFFDF9] hover:border-stone-400 text-stone-700'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Direct Checkout Button */}
            {product.stock_quantity > 0 && (
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  navigate('/checkout');
                }}
                className="w-full py-3 bg-[#29251F] hover:bg-[#34483A] text-white text-xs font-semibold rounded uppercase tracking-wider transition-colors cursor-pointer"
              >
                Proceed directly to mock checkout
              </button>
            )}

            {/* Bulk Wholesale Enquiry Option */}
            <div className="pt-2 border-t border-[#E8D9C5]/80">
              <button
                type="button"
                onClick={() => setShowBulkModal(true)}
                className="w-full py-2.5 px-4 bg-[#FAF5EE] hover:bg-[#F4ECE2] text-[#7E1726] border border-[#E8D9C5] text-xs font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Request Wholesale / Bulk Quote from Artisan</span>
              </button>
            </div>
          </div>

          {/* Delivery & Ethics Guarantees */}
          <div className="border-t border-[#E8D9C5] pt-4 space-y-3 text-xs text-stone-600">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#8A4935] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#29251F]">Carbon-neutral studio dispatch</strong>
                <p>Ships safely packed in biodegradable paper within {product.lead_time_days || 2} business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#8A4935] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#29251F]">14-Day Artisan Return Guarantee</strong>
                <p>If the handcrafted piece does not resonate with your space, return it undamaged in original packaging.</p>
              </div>
            </div>
            {product.verification_status === 'guild_verified' && (
              <div className="flex items-start gap-2.5 pt-2 border-t border-[#E8D9C5]/60">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#29251F]">Guild Verified Provenance</strong>
                  <p>
                    <button 
                      onClick={() => alert('Provenance certificate download initiated for: ' + product.title)}
                      className="text-[#7E1726] font-semibold hover:underline"
                    >
                      Download Authenticity Certificate (PDF)
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Related Creations */}
      {filteredRelated.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E8D9C5]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8A4935] block mb-1">
                More from this discipline
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#29251F]">
                You May Also Cherish
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-semibold text-[#8A4935] hover:underline">
              View all pieces →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {filteredRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Wholesale / Bulk Buyer Enquiry Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-xl max-w-lg w-full p-6 border border-[#E8D9C5] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#7E1726]" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#29251F]">
                    Wholesale & Bulk Buyer Enquiry
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Direct enquiry to {product.artisan?.business_name || 'Artisan Workshop'} for {product.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="text-stone-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {enquirySuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="font-serif font-bold text-base">Wholesale Enquiry Transmitted!</h4>
                <p className="text-xs text-emerald-700">
                  Your bulk request has been sent directly to {product.artisan?.business_name || 'the artisan'}. They will review and respond to your provided email address.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Organization / Brand</label>
                    <input
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="e.g. Heritage Hotels Collective"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="buyer@organization.com"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Requested Quantity *</label>
                    <input
                      type="number"
                      required
                      min="5"
                      value={requestedQty}
                      onChange={(e) => setRequestedQty(Number(e.target.value))}
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 font-bold text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Target Delivery Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Delivery Destination</label>
                    <input
                      type="text"
                      value={destinationRegion}
                      onChange={(e) => setDestinationRegion(e.target.value)}
                      placeholder="e.g. Mumbai, Delhi, Export"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Target Budget Range</label>
                    <input
                      type="text"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      placeholder="e.g. ₹25,000 - ₹35,000"
                      className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Enquiry Message & Custom Specifications</label>
                  <textarea
                    rows={3}
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    placeholder="Describe custom sizes, color palettes, institutional packaging, or exhibition timeline..."
                    className="w-full bg-[#FAF5EE] border border-[#E8D9C5] rounded p-2 text-stone-800 font-light"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#E8D9C5]">
                  <button
                    type="button"
                    onClick={() => setShowBulkModal(false)}
                    className="px-4 py-2 border border-[#E8D9C5] text-stone-700 rounded text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#7E1726] hover:bg-[#67121F] text-white font-semibold rounded text-xs shadow-2xs cursor-pointer"
                  >
                    Submit Wholesale Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
