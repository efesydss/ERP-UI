import { NamedEntity } from '@/utils/sharedTypes'
import { VacationBaseProps } from '@/components/Hr/Vacations/typeVacations'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'

//todo: employee can be null
export interface EmployeeTimeKeepingSpan {
  employee: NamedEntity
  year: number
  month: number
}

export interface EmployeeTimeKeepingInfo {
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

//todo: typo
export interface EmployeeOverTime {
  id?: number
  description?: string
  overtimeDate: string
  workingHours: number
  overTimePercentage: OverTimePercentage
  employee?: EmployeeTimeKeepingInfo
}

export interface EmployeeTimeKeepingProps {
  id?: number
  year: number
  month: number
  employee: EmployeeTimeKeepingInfo
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
