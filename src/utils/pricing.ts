/**
 * Pricing calculator utility for artisans
 * Calculates suggested selling price based on materials, labor hours, packaging and target profit margin.
 */

export interface PricingParameters {
  materialsCost: number;
  laborHours: number;
  hourlyRate: number;
  packagingCost: number;
  overheadPercentage?: number; // e.g. 10% for tools, kiln firing, studio rent
  targetMarginPercentage: number; // e.g. 35% margin
}

export interface PricingBreakdown {
  directCost: number; // materials + (hours * rate) + packaging
  overheadCost: number; // overhead % applied to direct cost
  totalCostOfProduction: number;
  profitAmount: number;
  suggestedRetailPrice: number;
  marginPercentageAchieved: number;
}

export function calculateSuggestedPrice(params: PricingParameters): PricingBreakdown {
  const materials = Math.max(0, Number(params.materialsCost) || 0);
  const hours = Math.max(0, Number(params.laborHours) || 0);
  const rate = Math.max(0, Number(params.hourlyRate) || 0);
  const packaging = Math.max(0, Number(params.packagingCost) || 0);
  const overheadPct = Math.max(0, Number(params.overheadPercentage ?? 10)) / 100;
  const targetMarginPct = Math.min(85, Math.max(5, Number(params.targetMarginPercentage) || 30)) / 100;

  const laborCost = hours * rate;
  const directCost = materials + laborCost + packaging;
  const overheadCost = directCost * overheadPct;
  const totalCostOfProduction = directCost + overheadCost;

  // Margin Formula: Price = Cost / (1 - Margin)
  const suggestedRetailPrice = totalCostOfProduction > 0
    ? Math.round((totalCostOfProduction / (1 - targetMarginPct)) * 100) / 100
    : 0;

  const profitAmount = Math.max(0, Math.round((suggestedRetailPrice - totalCostOfProduction) * 100) / 100);
  const marginPercentageAchieved = suggestedRetailPrice > 0
    ? Math.round((profitAmount / suggestedRetailPrice) * 1000) / 10
    : 0;

  return {
    directCost: Math.round(directCost * 100) / 100,
    overheadCost: Math.round(overheadCost * 100) / 100,
    totalCostOfProduction: Math.round(totalCostOfProduction * 100) / 100,
    profitAmount,
    suggestedRetailPrice,
    marginPercentageAchieved,
  };
}
