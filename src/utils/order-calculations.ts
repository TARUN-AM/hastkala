/**
 * Order calculation rules & validations
 */

export interface CartLineCalculation {
  price: number;
  quantity: number;
}

export interface OrderFinancials {
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  freeShippingEligible: boolean;
  amountNeededForFreeShipping: number;
}

export const FREE_SHIPPING_THRESHOLD = 150.0;
export const STANDARD_SHIPPING_FEE = 12.0;
export const CRAFT_TAX_RATE = 0.05; // 5%

export function calculateOrderFinancials(items: CartLineCalculation[]): OrderFinancials {
  const subtotal = items.reduce((sum, item) => {
    const p = Math.max(0, Number(item.price) || 0);
    const q = Math.max(0, Math.floor(Number(item.quantity) || 0));
    return sum + p * q;
  }, 0);

  const roundedSubtotal = Math.round(subtotal * 100) / 100;
  const freeShippingEligible = roundedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = items.length === 0 || freeShippingEligible ? 0 : STANDARD_SHIPPING_FEE;
  const taxAmount = Math.round(roundedSubtotal * CRAFT_TAX_RATE * 100) / 100;
  const total = Math.round((roundedSubtotal + shippingCost + taxAmount) * 100) / 100;

  const amountNeededForFreeShipping = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD - roundedSubtotal) * 100) / 100
  );

  return {
    subtotal: roundedSubtotal,
    shippingCost,
    taxAmount,
    total,
    freeShippingEligible,
    amountNeededForFreeShipping,
  };
}

export function validateStockAvailability(
  requestedQuantity: number,
  availableStock: number
): { valid: boolean; error?: string } {
  if (requestedQuantity <= 0) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }
  if (availableStock <= 0) {
    return { valid: false, error: 'Item is currently out of stock' };
  }
  if (requestedQuantity > availableStock) {
    return {
      valid: false,
      error: `Only ${availableStock} ${availableStock === 1 ? 'piece' : 'pieces'} remaining in artisan studio`,
    };
  }
  return { valid: true };
}
