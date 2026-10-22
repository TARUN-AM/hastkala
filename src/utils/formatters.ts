export function formatPrice(price: number, currency: string = 'INR'): string {
  if (currency === 'INR' || currency === '₹') {
    return `₹${Math.round(price).toLocaleString('en-IN')}`;
  }
  return `$${price.toFixed(2)}`;
}
