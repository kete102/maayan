/** Shared pricing constants used across cart and checkout */

/** Free shipping threshold in USD */
export const FREE_SHIPPING_THRESHOLD = 75;

/** Flat shipping cost in USD when below threshold */
export const SHIPPING_COST = 6.5;

/** Tax rate as a decimal */
export const TAX_RATE = 0.07;

export function calcShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0
    ? 0
    : SHIPPING_COST;
}

export function calcTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

export function calcTotal(subtotal: number): number {
  return subtotal + calcShipping(subtotal) + calcTax(subtotal);
}
