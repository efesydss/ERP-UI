import { NamedEntity } from '@/utils/sharedTypes'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'

export interface VacationStatus {
  entitled: number
  allTimeUsed: number
  employee: EmployeeResponse
  transferred: number
  usedCurrentYear: number
  usable: number
  profession: string
  workingDays: number
  startDateTime: string
}

export enum VacationType {
  Marriage = 'MARRIAGE',
  SickLeave = 'SICK_LEAVE',
  OnDemand = 'ON_DEMAND',
  Vacation = 'VACATION',
  ChildBirth = 'CHILD_BIRTH'
}

export interface VacationBaseProps {
  personnel: NamedEntity
  startDateTime: string
  endDateTime: string
  workingDays: number
  workingHours: number
  timeOffType: VacationType
  unPaid?: boolean
}

export interface EmployeeVacationProps extends VacationBaseProps {
  id: number
}
