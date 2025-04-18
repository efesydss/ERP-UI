/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { EmployeeRef } from './employeeRef';
import type { TimeOff } from './timeOff';
import type { EmployeePayment } from './employeePayment';
import type { EmployeeOvertime } from './employeeOvertime';

export interface TimeKeeping {
  /** @nullable */
  id?: number | null;
  employee: EmployeeRef;
  year: number;
  month: number;
  netSalary: number;
  normalWorkingDays: number;
  weekendWorkingHours: number;
  unpaidTimeOffHours: number;
  timeOffs: TimeOff[];
  total: number;
  title: string;
  deductions: EmployeePayment[];
  additionalPayments: EmployeePayment[];
  overtimes: EmployeeOvertime[];
}
