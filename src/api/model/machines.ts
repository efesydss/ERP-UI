/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { Machine } from './machine';

export interface Machines {
  message?: string;
  error?: string;
  data?: Machine[];
  total?: number;
  page?: number;
  pageSize?: number;
}
