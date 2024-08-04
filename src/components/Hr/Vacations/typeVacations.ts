import { NamedEntity } from '@/utils/sharedTypes'

export interface VacationStatus {
  employeeId: number
  fullName: string
  department: string
  title: string
  entitled: number
  transferred: number
  usedCurrentYear: number
  usable: number
  remaining: number
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
  startTime: string
  endTime: string
  workingDays: number
  workingHours: number
  timeOffType: VacationType
  unPaid?: boolean
}

export interface EmployeeVacationProps extends VacationBaseProps {
  id: number
}
