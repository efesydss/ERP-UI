/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { OfferStatusEnum } from './offerStatusEnum';
import type { EmployeeExtendedRef } from './employeeExtendedRef';
import type { Project } from './project';
import type { CurrentAccountExtras } from './currentAccountExtras';
import type { CurrentAccount } from './currentAccount';
import type { MaterialRequestExtras } from './materialRequestExtras';

export interface ProposalRequest {
  /** @nullable */
  id?: number | null;
  offerStatus: OfferStatusEnum;
  requestDate: string;
  documentName: string;
  employee: EmployeeExtendedRef;
  description?: string;
  project: Project;
  currentAccounts: CurrentAccountExtras[];
  suggestedCurrentAccount?: CurrentAccount;
  selectedCurrentAccount?: CurrentAccount;
  materialRequestExtras: MaterialRequestExtras[];
  total: number;
  totalDiscount: number;
  unitDiscount: number;
  additionalCost: number;
  tax: number;
}
