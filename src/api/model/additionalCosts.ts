/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { AdditionalCost } from './additionalCost';

export interface AdditionalCosts {
  message?: string;
  error?: string;
  data?: AdditionalCost[];
  total?: number;
  page?: number;
  pageSize?: number;
}
