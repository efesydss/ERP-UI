/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { UserRole } from './userRole';
import type { UserUserRolesItem } from './userUserRolesItem';

export interface User {
  /** @nullable */
  id?: number | null;
  email: string;
  active?: boolean;
  /** @deprecated */
  role?: UserRole;
  userRoles?: UserUserRolesItem[];
}
