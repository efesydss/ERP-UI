enum MaritalStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed'
}

enum Currency {
  TL = 'TL',
  Euro = 'EUR',
  Dollar = 'USD'
}

enum BloodType {
  A_Positive = 'A+',
  A_Negative = 'A-',
  B_Positive = 'B+',
  B_Negative = 'B-',
  AB_Positive = 'AB+',
  AB_Negative = 'AB-',
  O_Positive = 'O+',
  O_Negative = 'O-'
}

interface EmergencyContact {
  name: string
  phone: string
}

interface PayrollInformation {
  currency: Currency
  monthlyNetSalary: number
  isIncludedInCost: boolean
  monthlyWorkingDays: number
  monthlyWorkingHours: number
  iban: string
  numberOfChildren: number
  isSpouseWorking: boolean
}

interface CitizenInformation {
  serialNumber: string
  identityNumber: string
  fatherName: string
  motherName: string
  birthPlace: string
  birthDate: Date
  maritalStatus: MaritalStatus
  registeredProvince: string
  registeredDistrict: string
  registeredNeighborhood: string
  volumeNumber: string
  familyOrderNumber: string
  orderNumber: string
}

export interface PersonnelData {
  fullName: string
  isInactive: boolean
  startDate: Date | null
  endDate: Date | null
  bloodType: BloodType
  socialSecurityNumber: number
  homePhone?: string
  mobilePhone: string
  email: string
  address: string
  department: string
  title: string
  emergencyContact: EmergencyContact
  citizenInformation: CitizenInformation
  payrollDetails: PayrollInformation
  uuid: string
  docRef: string
  createdAt: string
}
