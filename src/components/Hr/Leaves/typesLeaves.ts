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

export enum LeaveType {
  Marriage = 'MARRIAGE',
  SickLeave = 'SICK_LEAVE',
  OnDemand = 'ON_DEMAND',
  Vacation = 'VACATION',
  ChildBirth = 'CHILD_BIRTH'
}

export interface LeavesBaseProps {
  personnel: string
  startTime: string
  endTime: string
  workingDays: number
  workingHours: number
  timeOffType: LeaveType
  unPaid?: boolean
}