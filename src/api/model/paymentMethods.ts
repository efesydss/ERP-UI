/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { PaymentMethod } from './paymentMethod';

export interface PaymentMethods {
  message?: string;
  error?: string;
  data?: PaymentMethod[];
  total?: number;
  page?: number;
  pageSize?: number;
}
