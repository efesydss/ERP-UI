import { apiRoutes } from '@/utils/apiRoutes'
import { enumToOptions } from '@/utils/transformers'
import { CivilStatus, Currency } from '@/components/Hr/Employees/typesEmployee'

export const getEmployeeConfig = () => [
  {
    id: 'infoGeneral',
    fields: [
      {
        name: 'name'
      },
      {
        name: 'surname'
      },
      {
        name: 'companyBranch',
        type: 'select',
        endpoint: 'branches' as keyof typeof apiRoutes
      },
      {
        name: 'department',
        type: 'select',
        endpoint: 'departments' as keyof typeof apiRoutes
      },
      {
        name: 'profession'
      },
      {
        name: 'email'
      },
      {
        name: 'startDate',
        type: 'date'
      },
      {
        name: 'endDate',
        type: 'date',
        isOptional: true
      },
      {
        name: 'phone',
        isOptional: true
      },
      {
        name: 'city',
        isOptional: true
      },
      {
        name: 'province',
        isOptional: true
      },
      {
        name: 'state',
        isOptional: true
      },
      {
        name: 'street',
        isOptional: true
      },
      {
        name: 'emergencyName',
        isOptional: true
      },
      {
        name: 'emergencyPhone',
        isOptional: true
      },
      {
        name: 'passive',
        isOptional: true,
        type: 'boolean'
      }
    ]
  },
  {
    id: 'infoIdentity',
    fields: [
      {
        name: 'identificationNumber',
        type: 'number'
      },
      {
        name: 'fathersName',
        isOptional: true
      },
      {
        name: 'mothersName',
        isOptional: true
      },
      {
        name: 'birthDate',
        type: 'date',
        isOptional: true
      },
      {
        name: 'civilStatus',
        type: 'select',
        isOptional: true,
        options: enumToOptions(CivilStatus)
      }
    ]
  },
  {
    id: 'infoPayroll',
    fields: [
      {
        name: 'payrollData.salary',
        type: 'number'
      },
      {
        name: 'payrollData.iban'
      },
      {
        name: 'payrollData.currency',
        options: enumToOptions(Currency),
        type: 'select',
        isOptional: true
      },
      {
        name: 'payrollData.monthlyHour',
        type: 'number',
        isOptional: true
      },
      {
        name: 'payrollData.monthlyProgress',
        type: 'number',
        isOptional: true
      },
      {
        name: 'payrollData.children',
        type: 'number',
        isOptional: true
      },
      {
        name: 'payrollData.includedInCost',
        type: 'boolean'
      },
      {
        name: 'payrollData.spouseWorking',
        type: 'boolean'
      }
    ]
  }
]
