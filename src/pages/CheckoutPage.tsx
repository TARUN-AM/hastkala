import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle, Sparkles, Building, ArrowLeft } from 'lucide-react';
import { Link, useRouter } from '../lib/router';
import { useAuth } from '../lib/auth-context';
import { useCart } from '../lib/cart-context';
import { db } from '../lib/db';

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  const { items, financials, clearCart } = useCart();
  const { navigate } = useRouter();

  // Form State
  const [fullName, setFullName] = useState(user?.full_name || 'Sarah Patel');
  const [email, setEmail] = useState(user?.email || 'sarah.patel@hastkala.dev');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [streetAddress, setStreetAddress] = useState('42 Craftsman Way');
  const [apartment, setApartment] = useState('Studio 4B');
  const [city, setCity] = useState('Portland');
  const [stateProvince, setStateProvince] = useState('OR');
  const [postalCode, setPostalCode] = useState('97201');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'mock_card' | 'mock_wire' | 'mock_upi'>('mock_card');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Generate unique idempotency token once per checkout form mount
  const [idempotencyKey] = useState(() => `idemp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-[#29251F] mb-3">No Items to Checkout</h1>
        <p className="text-xs text-stone-600 mb-6">Your shopping cart is currently empty.</p>
        <Link to="/shop" className="px-5 py-2.5 bg-[#8A4935] text-white text-xs font-semibold rounded">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !streetAddress || !city || !postalCode) {
      setErrorMessage('Please fill in all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate asynchronous payment authorization latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      const order = db.createOrder({
        user_id: user?.id,
        customer_name: fullName,
        customer_email: email,
        shipping_address: {
          full_name: fullName,
          street_address: streetAddress,
          apartment,
          city,
          state_province: stateProvince,
          postal_code: postalCode,
          country,
          phone,
        },
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        payment_method: paymentMethod,
        idempotency_key: idempotencyKey,
        notes,
      });

      // Clear shopping cart upon successful creation
      clearCart();

      // Navigate to order confirmation
      navigate(`/checkout/success?orderId=${order.id}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'Payment processing failed. Please review stock or contact artisan support.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6">
        <Link to="/cart" className="text-xs font-semibold text-[#8A4935] hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#29251F] mt-2">Artisan Checkout</h1>
      </div>

      {/* Direct Artisan Studio Guarantee Banner */}
      <div className="bg-[#FFFDF9] border-l-4 border-[#8A4935] p-4 rounded-r-lg border border-[#E8D9C5] mb-8 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#8A4935] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-stone-700">
          <strong className="block text-[#29251F] font-semibold mb-0.5">
            Direct Studio Fulfillment & Provenance Protection
          </strong>
          Every piece in your order is packed and dispatched directly by the craft artisan with documented regional provenance certificates.
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 mb-6 bg-rose-50 border border-rose-300 rounded-md text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact & Delivery Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="bg-[#FFFDF9] rounded-lg p-6 border border-[#E8D9C5] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#29251F] pb-2 border-b border-[#E8D9C5]">
                1. Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Phone Number (for courier dispatch)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-[#FFFDF9] rounded-lg p-6 border border-[#E8D9C5] space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#29251F] pb-2 border-b border-[#E8D9C5]">
                2. Artisan Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 42 Craftsman Way"
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Apartment / Studio / Suite</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={stateProvince}
                    onChange={(e) => setStateProvince(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Special Delivery / Artisan Note</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instructions for handmade packaging or delivery gate..."
                    className="w-full bg-[#F7F0E5] border border-[#E8D9C5] rounded p-2 text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* 3. Mock Payment Abstraction */}
            <div className="bg-[#FFFDF9] rounded-lg p-6 border border-[#E8D9C5] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E8D9C5]">
                <h2 className="font-serif text-lg font-bold text-[#29251F]">
                  3. Payment Method (Demonstration)
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sandbox Active</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'mock_card' ? 'border-[#8A4935] bg-[#F6ECE6]' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="mock_card"
                    checked={paymentMethod === 'mock_card'}
                    onChange={() => setPaymentMethod('mock_card')}
                    className="mt-1 text-[#8A4935] focus:ring-[#8A4935]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#8A4935]" />
                      <strong className="text-xs text-[#29251F]">Instant Mock Credit Card</strong>
                      <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded font-mono">TEST-SIM</span>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Simulates instantaneous bank authorization without prompting for real CVV or card numbers.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                  paymentMethod === 'mock_upi' ? 'border-[#8A4935] bg-[#F6ECE6]' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="mock_upi"
                    checked={paymentMethod === 'mock_upi'}
                    onChange={() => setPaymentMethod('mock_upi')}
                    className="mt-1 text-[#8A4935] focus:ring-[#8A4935]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#34483A]" />
                      <strong className="text-xs text-[#29251F]">Mock Direct Artisan Wire / UPI</strong>
                    </div>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Direct cooperative guild settlement simulation.
                    </p>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: Order Review & Submission */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFDF9] rounded-lg border border-[#E8D9C5] p-6 space-y-5 shadow-xs sticky top-28">
              <h2 className="font-serif text-xl font-bold text-[#29251F]">Order Breakdown</h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 divide-y divide-[#E8D9C5]/60 pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={product.images?.[0]?.image_url}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover flex-shrink-0 border border-[#E8D9C5]"
                      />
                      <div className="truncate">
                        <div className="font-semibold text-[#29251F] truncate">{product.title}</div>
                        <div className="text-[11px] text-stone-500">Qty: {quantity} × ${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="font-serif font-bold text-[#29251F] flex-shrink-0">
                      ${(product.price * quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="pt-3 border-t border-[#E8D9C5] space-y-2 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#29251F]">${financials.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisan Shipping</span>
                  <span>{financials.shippingCost === 0 ? <strong className="text-emerald-700">Complimentary</strong> : `$${financials.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Craft Tax (5%)</span>
                  <span>${financials.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8D9C5] text-sm items-baseline">
                  <span className="font-serif font-bold text-[#29251F]">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-[#8A4935]">${financials.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-4 rounded text-sm font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'bg-stone-400 cursor-wait' : 'bg-[#8A4935] hover:bg-[#753C2B]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Confirming with Artisan Studio...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order — ${financials.total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-stone-500 space-y-1">
                <p>Protected by end-to-end encryption & verified guild custody.</p>
                <p className="text-stone-400">Inventory reserved directly in artisan studio.</p>
              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
};
