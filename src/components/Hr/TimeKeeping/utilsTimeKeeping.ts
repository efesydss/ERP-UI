import { DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { EmployeeOverTime } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'


export interface DynamicFieldValues {
  overtimes: EmployeeOverTime[]
  deductions: EmployeePaymentProps[]
  additionalPayments: EmployeePaymentProps[]
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
