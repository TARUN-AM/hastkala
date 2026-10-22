import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSuggestedPrice } from './pricing';

test('pricing calculator computes direct costs and retail price with target margin', () => {
  const result = calculateSuggestedPrice({
    materialsCost: 20,
    laborHours: 2,
    hourlyRate: 15, // 30 labor
    packagingCost: 5,
    overheadPercentage: 10,
    targetMarginPercentage: 35,
  });

  // Direct: 20 + 30 + 5 = 55
  assert.equal(result.directCost, 55);
  // Overhead: 10% of 55 = 5.5
  assert.equal(result.overheadCost, 5.5);
  // Total Cost: 60.5
  assert.equal(result.totalCostOfProduction, 60.5);
  // Retail price with 35% margin: 60.5 / (1 - 0.35) = 60.5 / 0.65 = 93.08
  assert.equal(result.suggestedRetailPrice, 93.08);
  assert.ok(result.profitAmount > 32);
});

test('pricing calculator gracefully handles zero parameters', () => {
  const result = calculateSuggestedPrice({
    materialsCost: 0,
    laborHours: 0,
    hourlyRate: 0,
    packagingCost: 0,
    targetMarginPercentage: 25,
  });

  assert.equal(result.suggestedRetailPrice, 0);
  assert.equal(result.totalCostOfProduction, 0);
});
