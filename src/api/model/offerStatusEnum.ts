/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */

export type OfferStatusEnum = typeof OfferStatusEnum[keyof typeof OfferStatusEnum];


 export const OfferStatusEnum = {
  PENDING_QUOTE_ENTRIES: 'PENDING_QUOTE_ENTRIES',
  PENDING_CURRENT_PROPOSAL: 'PENDING_CURRENT_PROPOSAL',
  PENDING_VENDOR_SELECTION: 'PENDING_VENDOR_SELECTION',
  PENDING_ORDERS: 'PENDING_ORDERS',
  COMPLETED_QUOTES: 'COMPLETED_QUOTES',
  CANCELED_QUOTES: 'CANCELED_QUOTES',
} as const;
