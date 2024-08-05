import { NamedEntity } from '@/utils/sharedTypes'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { VacationBaseProps } from '@/components/Hr/Vacations/typeVacations'
import { EmployeePayment } from '@/components/Hr/typesHr'

export interface EmployeeTallySpan {
  employee: NamedEntity
  year: number
  month: number
}

export interface EmployeeTallyProps {
  id: number | null
  employee: EmployeeResponse
  netSalary: number
  normalWorkingDays: number
  weekendWorkingDays: number
  unpaidTimeOffHours: number
  timeOffs: Omit<VacationBaseProps, 'personnel'>[]
  title: string
  total: number
  deductions: EmployeePayment[]
  overtimes: EmployeePayment[]
  employeePayments: EmployeePayment[]
}
