/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { ActivityConnection } from './activityConnection';

export interface ActivityConnections {
  message?: string;
  error?: string;
  data?: ActivityConnection[];
  total?: number;
  page?: number;
  pageSize?: number;
}
