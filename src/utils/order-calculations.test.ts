import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderFinancials,
  validateStockAvailability,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from './order-calculations';

test('order financials adds standard shipping under threshold', () => {
  const result = calculateOrderFinancials([
    { price: 50, quantity: 2 }, // 100
  ]);

  assert.equal(result.subtotal, 100);
  assert.equal(result.freeShippingEligible, false);
  assert.equal(result.shippingCost, STANDARD_SHIPPING_FEE);
  assert.equal(result.amountNeededForFreeShipping, 50);
  // Tax 5% of 100 = 5.00
  assert.equal(result.taxAmount, 5);
  // Total: 100 + 12 + 5 = 117
  assert.equal(result.total, 117);
});

test('order financials applies complimentary shipping over $150', () => {
  const result = calculateOrderFinancials([
    { price: 100, quantity: 2 }, // 200
  ]);

  assert.equal(result.subtotal, 200);
  assert.equal(result.freeShippingEligible, true);
  assert.equal(result.shippingCost, 0);
  assert.equal(result.amountNeededForFreeShipping, 0);
  // Tax 5% of 200 = 10.00
  assert.equal(result.taxAmount, 10);
  assert.equal(result.total, 210);
});

test('stock validation accurately permits or rejects requested quantities', () => {
  assert.deepEqual(validateStockAvailability(2, 5), { valid: true });
  assert.deepEqual(validateStockAvailability(5, 5), { valid: true });

  const overStock = validateStockAvailability(6, 5);
  assert.equal(overStock.valid, false);
  assert.match(overStock.error || '', /Only 5 pieces remaining/);

  const outOfStock = validateStockAvailability(1, 0);
  assert.equal(outOfStock.valid, false);
  assert.match(outOfStock.error || '', /out of stock/);

  const zeroQty = validateStockAvailability(0, 5);
  assert.equal(zeroQty.valid, false);
});
