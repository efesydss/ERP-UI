/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { Branch } from './branch';
import type { Department } from './department';
import type { PayrollData } from './payrollData';

export interface Employee {
  /** @nullable */
  id?: number | null;
  passive?: boolean;
  /**
   * @minLength 5
   * @maxLength 128
   */
  identificationNumber: string;
  name: string;
  surname: string;
  companyBranch: Branch;
  department: Department;
  profession: string;
  /** @nullable */
  emergencyPhone?: string | null;
  /** @nullable */
  emergencyName?: string | null;
  startDate: string;
  /** @nullable */
  endDate?: string | null;
  /** @nullable */
  phone?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  serialNumber?: string | null;
  /** @nullable */
  fathersName?: string | null;
  /** @nullable */
  mothersName?: string | null;
  /** @nullable */
  birthPlace?: string | null;
  /** @nullable */
  birthDate?: string | null;
  /** @nullable */
  civilStatus?: string | null;
  /** @nullable */
  city?: string | null;
  /** @nullable */
  province?: string | null;
  /** @nullable */
  state?: string | null;
  /** @nullable */
  street?: string | null;
  /** @nullable */
  volumeNumber?: string | null;
  /** @nullable */
  familySerial?: string | null;
  payrollData?: PayrollData;
}
