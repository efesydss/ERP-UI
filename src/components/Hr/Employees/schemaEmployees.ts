import * as yup from 'yup'
import { CivilStatus, Currency } from '@/components/Hr/Employees/typesEmployee'

const payrollDataSchema = yup.object().shape({
  id: yup.number(),
  currency: yup.string().oneOf(Object.values(Currency)),
  salary: yup.number().required('Salary is required'),
  includedInCost: yup.boolean(),
  monthlyProgress: yup.string().nullable(),
  monthlyHour: yup.number(),
  iban: yup.string().required('IBAN is required'),
  children: yup.number(),
  spouseWorking: yup.boolean()
})

export const employeeValidationSchema = yup.object().shape({
  id: yup.number().required('ID is required'),
  identificationNumber: yup
    .string()
    .required('Identification Number is required')
    .matches(/^[0-9]+$/, 'Identification Number must be only numbers')
    .min(5, 'Identification Number must be at least 5 characters')
    .max(11, 'Identification Number must be at most 11 characters'),
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  companyBranch: yup
    .object()
    .shape({
      id: yup.number().required('Branch ID is required'),
      name: yup.string().required('Branch Name is required')
    })
    .required('Company Branch is required'),
  department: yup
    .object()
    .shape({
      id: yup.number().required('Department ID is required'),
      name: yup.string().required('Department Name is required')
    })
    .required('Department is required'),
  profession: yup.string().required('Profession is required'),
  emergencyPhone: yup.string(),
  emergencyName: yup.string(),
  startDate: yup.string().required(),
  endDate: yup.string().nullable(),
  phone: yup.string(),
  email: yup.string().email('Invalid email format'),
  serialNumber: yup.string(),
  fathersName: yup.string(),
  mothersName: yup.string(),
  birthPlace: yup.string(),
  birthDate: yup.string(),
  civilStatus: yup.string().oneOf(Object.values(CivilStatus), 'Invalid Civil Status'),
  city: yup.string(),
  province: yup.string(),
  state: yup.string(),
  street: yup.string(),
  volumeNumber: yup.string(),
  familySerial: yup.string(),
  payrollData: payrollDataSchema
})
