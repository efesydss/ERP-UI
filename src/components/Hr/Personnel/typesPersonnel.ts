interface CitizenInformation {
  serialNumber: string
  identificationNumber: string
  fathersName: string
  mothersName: string
  birthPlace: string
  birthDate: Date
  civilStatus: string
  city: string
  province: string
  state: string
  street: string
  volumeNumber: string
  familySerial: string
}

interface PayrollDetails {
  currency: string
  salary: string
  isCost: string
  monthlyProgress: string
  monthlyHour: string
  iban: string
  children: string
  isWorkerWife: string
}

export interface PersonnelData {
  docRef: string
  name: string
  surname: string
  department: string
  proffession: string
  emergencyPhone: string
  emergencyName: string
  startTime: Date
  phone: string
  email: string
  uuid: string
  user: string
  citizenInformation: CitizenInformation
  payrollDetails: PayrollDetails
  isDeleted: boolean
  createdAt: string
}
