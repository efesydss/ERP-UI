import { NamedEntity } from '@/utils/sharedTypes'
import { VacationBaseProps } from '@/components/Hr/Vacations/typeVacations'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'

export interface EmployeeTimeKeepingSpan {
  employee?: NamedEntity
  year: number
  month: number
}

export interface TimeKeepingDraftProps {
  id?: string
  year: string
  month: string
}

export interface EmployeeRef {
  id: number
  name: string
  surname: string
  companyBranch: NamedEntity
  department: NamedEntity
}

export enum OverTimePercentage {
  P50 = 'P50',
  P100 = 'P100',
  P150 = 'P150',
  P200 = 'P200'
}

export interface EmployeeOverTime {
  id?: number
  description?: string
  overtimeDate: string
  workingHours: number
  overTimePercentage: OverTimePercentage
  employee?: EmployeeRef
}

export interface EmployeeTimeKeepingProps {
  id?: number
  year: number
  month: number
  employee: EmployeeRef
  netSalary: number
  normalWorkingDays: number
  weekendWorkingHours: number
  unpaidTimeOffHours: number
  timeOffs: Omit<VacationBaseProps, 'personnel'>[]
  title: string
  total: number
  deductions: EmployeePaymentProps[]
  additionalPayments: EmployeePaymentProps[]
  overtimes: EmployeeOverTime[]
  employeePayments: EmployeePaymentProps[]
}
