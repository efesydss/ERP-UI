/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { EmployeeExtendedRef } from './employeeExtendedRef';
import type { Project } from './project';
import type { ProductPlan } from './productPlan';
import type { MaterialRequestRowItem } from './materialRequestRowItem';

export interface MaterialRequest {
  /** Malzeme talebinin benzersiz kimliÄŸi */
  id?: number;
  /** Malzeme talebinin oluÅŸturulduÄŸu tarih */
  requestDate: string;
  /** Malzemenin ihtiyaÃ§ duyulduÄŸu tarih */
  needDate: string;
  /** Malzemenin kullanÄ±m amacÄ± */
  usagePurpose?: string;
  requester: EmployeeExtendedRef;
  approver: EmployeeExtendedRef;
  project?: Project;
  productPlan?: ProductPlan;
  /** Talep edilen malzemelerin listesi */
  materials: MaterialRequestRowItem[];
}
