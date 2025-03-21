import { NamedEntity } from '@/utils/sharedTypes'
import { EmployeeRef } from '@/components/Hr/TimeKeeping/typesTimeKeeping'

export interface VacationStatus {
  entitled: number
  allTimeUsed: number
  transferred: number
  usedCurrentYear: number
  usable: number
  profession: string
  workingDays: number
  startDateTime: string
  employee: EmployeeRef
}

export enum VacationType {
  Marriage = 'MARRIAGE',
  SickLeave = 'SICK_LEAVE',
  OnDemand = 'ON_DEMAND',
  Vacation = 'VACATION',
  ChildBirth = 'CHILD_BIRTH'
}

export interface VacationBaseProps {
  id?: number
  personnel: NamedEntity
  startDateTime: string | Date
  endDateTime: string | Date
  workingDays: number
  workingHours: number
  timeOffType: VacationType
  unPaid?: boolean
}
