import { enumToOptions } from '@/utils/transformers'
import { AdditionalPaymentType, CurrencyCode, DeductionPaymentType } from '@/components/Hr/Finances/typesFinance'
import { OptionType } from '@/components/Common/Form/BaseSelect'
import { t } from 'i18next'
import { DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { EmployeeOverTime, OverTimePercentage } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'

//todo: check 'nested' type, is that still relevant for bankAccount
/*{
    name: 'bankAccount',
    type: 'nested',
    fields: bankAccountFields
  }*/

export enum EditableFields {
  'overtimes',
  'deductions',
  'additionalPayments'
}

export interface DynamicFieldValues {
  overtimes: EmployeeOverTime[]
  deductions: EmployeePaymentProps[]
  additionalPayments: EmployeePaymentProps[]
}

export const getTypeOptions = (): OptionType[] => [
  { value: 'deductions', label: t('hr:deductions') },
  { value: 'overtimes', label: t('hr:overtimes') },
  { value: 'additionalPayments', label: t('hr:additionalPayments') }
]

const getEmployeePayment = () => [
  {
    name: 'paymentDate',
    type: 'date'
  },
  {
    name: 'description'
  },
  {
    name: 'transactionCost',
    type: 'number'
  },
  {
    name: 'amount',
    type: 'number'
  },
  {
    name: 'amountCurrency',
    type: 'select',
    options: enumToOptions(CurrencyCode)
  }
]

export const getAdditionalPayment = () => [
  ...getEmployeePayment(),
  {
    name: 'paymentType',
    type: 'select',
    options: enumToOptions(AdditionalPaymentType, 'hr')
  }
]

export const getDeductionPayment = () => [
  ...getEmployeePayment(),
  {
    name: 'paymentType',
    type: 'select',
    options: enumToOptions(DeductionPaymentType, 'hr')
  }
]

export const getFieldConfigurations = (): { [key: string]: Array<DynamicInputFieldProps> } => {
  return {
    deductions: getDeductionPayment(),
    additionalPayments: getAdditionalPayment(),
    overtimes: [
      {
        name: 'overTimePercentage',
        type: 'select',
        options: enumToOptions(OverTimePercentage)
      },
      { name: 'overtimeDate', type: 'date' },
      { name: 'workingHours', type: 'number' }
    ]
  }
}

export const initializeValues = (fields: Array<DynamicInputFieldProps>) => {
  return fields.reduce(
    (acc, field) => {
      if (field.type === 'nested' && field.fields) {
        acc[field.name] = initializeValues(field.fields)
      } else {
        acc[field.name] = field.type === 'number' ? 0 : ''
      }
      return acc
    },
    {} as Record<string, any>
  )
}

export const hasAllValuesFilled = (obj: EmployeeOverTime | EmployeePaymentProps): boolean => {
  if (!obj) return false

  const checkValues = (obj: Record<string, any>): boolean => {
    return Object.keys(obj).every((key) => {
      if (key === 'id') return true
      const value = obj[key]
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return checkValues(value)
      }
      return Boolean(value)
    })
  }
  return checkValues(obj)
}

export const hasItemChanged = (
  item: EmployeeOverTime | EmployeePaymentProps,
  initialItem: EmployeeOverTime | EmployeePaymentProps
): boolean => {
  if (!initialItem || !item) return false

  return Object.keys(item).some((key) => {
    const value = item[key as keyof typeof item]
    const initialValue = initialItem[key as keyof typeof item]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return hasItemChanged(value as any, initialValue as any)
    }

    return value !== initialValue
  })
}

export const processRecords = (values: DynamicFieldValues, initialValues: DynamicFieldValues) => {
  const processItems = <T extends EmployeeOverTime | EmployeePaymentProps>(items: T[], initialItems: T[]) =>
    items.reduce(
      (acc, item, index) => {
        const initialItem = initialItems[index]
        if (item.id) {
          hasItemChanged(item, initialItem) ? acc.toUpdate.push(item) : null
        } else if (hasAllValuesFilled(item)) {
          acc.toAdd.push(item)
        }
        return acc
      },
      { toAdd: [] as T[], toUpdate: [] as T[] }
    )

  const overtimesResult = processItems(values.overtimes, initialValues.overtimes)
  const deductionsResult = processItems(values.deductions, initialValues.deductions)
  const additionalPaymentsResult = processItems(values.additionalPayments, initialValues.additionalPayments)

  return {
    overtimesToAdd: overtimesResult.toAdd,
    overtimesToUpdate: overtimesResult.toUpdate,
    paymentRecordsToAdd: [...deductionsResult.toAdd, ...additionalPaymentsResult.toAdd],
    paymentRecordsToUpdate: [...deductionsResult.toUpdate, ...additionalPaymentsResult.toUpdate]
  }
}

export const getAccordionConfigs = () => [
  {
    name: 'overtimes',
    label: t('hr:overtimes'),
    fields: getFieldConfigurations()['overtimes']
  },
  {
    name: 'deductions',
    label: t('hr:deductions'),
    fields: getFieldConfigurations()['deductions']
  },
  {
    name: 'additionalPayments',
    label: t('hr:additionalPayments'),
    fields: getFieldConfigurations()['additionalPayments']
  }
]
