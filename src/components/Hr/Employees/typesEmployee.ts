import { NamedEntity } from '@/utils/sharedTypes'

export enum CivilStatus {
  Single = 'Single',
  Married = 'Married'
}

enum Currency {
  TL = 'TL',
  Euro = 'EUR',
  Dollar = 'USD'
}

export enum BloodType {
  A_Positive = 'A+',
  A_Negative = 'A-',
  B_Positive = 'B+',
  B_Negative = 'B-',
  AB_Positive = 'AB+',
  AB_Negative = 'AB-',
  O_Positive = 'O+',
  O_Negative = 'O-'
}

/*enum EmployeePaymentType {
  SALARY = 'SALARY',
  SALARY_PAYMENT = 'SALARY_PAYMENT',
  OVERTIME = 'OVERTIME',
  ADVANCE = 'ADVANCE',
  DEDUCTION = 'DEDUCTION',
  TRANSFER = 'TRANSFER',
  WAGE_CUT = 'WAGE_CUT'
}*/

export interface PayrollData {
  id?: number
  currency?: Currency
  salary: number
  includedInCost?: boolean
  monthlyProgress?: string
  monthlyHour?: number
  iban: string
  children?: number
  wifeWorking?: boolean
}

export interface EmployeeResponse {
  id: number
  identificationNumber: string
  name: string
  surname: string
  companyBranch: NamedEntity
  department: NamedEntity
  profession: string
  emergencyPhone: string
  emergencyName: string
  startDate: string
  endDate?: string
  phone?: string
  email?: string
  serialNumber?: string
  fathersName?: string
  mothersName?: string
  birthPlace?: string
  birthDate?: Date
  civilStatus?: CivilStatus
  city?: string
  province?: string
  state?: string
  street?: string
  volumeNumber?: string
  familySerial?: string
}
