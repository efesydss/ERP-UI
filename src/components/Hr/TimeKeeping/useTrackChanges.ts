import { useEffect, useRef, useState, useMemo } from 'react'
import { EmployeeOverTime, EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'

type ValidFields<T> = {
  [K in keyof T]: string | number
}

export const useTrackChanges = (initialValues: EmployeeTimeKeepingProps) => {
  const [updatedValues, setUpdatedValues] = useState<EmployeeTimeKeepingProps>(initialValues)
  const [hasChanges, setHasChanges] = useState(false)
  const previousChangeSetRef = useRef<Set<string>>(new Set())

  const isValidObject = useMemo(
    () =>
      <T extends Record<string, any>>(obj: T): obj is T & ValidFields<T> => {
        return Object.entries(obj).every(
          ([key, value]) => key === 'transactionCost' || (value !== '' && value !== 0 && value !== '0')
        )
      },
    []
  )

  const filterValidObjects = useMemo(
    () =>
      <T extends Record<string, any>>(array: T[]): T[] => {
        return array.filter(isValidObject)
      },
    [isValidObject]
  )

  useEffect(() => {
    const filteredOvertimes = filterValidObjects<EmployeeOverTime>(initialValues.overtimes)
    const filteredDeductions = filterValidObjects<EmployeePaymentProps>(initialValues.deductions)
    const filteredAdditionalPayments = filterValidObjects<EmployeePaymentProps>(initialValues.additionalPayments)

    const newChangeSet = new Set<string>(
      [...filteredOvertimes, ...filteredDeductions, ...filteredAdditionalPayments].map((item) => JSON.stringify(item))
    )

    const added = [...newChangeSet].filter((item) => !previousChangeSetRef.current.has(item))
    const removed = [...previousChangeSetRef.current].filter((item) => !newChangeSet.has(item))

    const changesOccurred = added.length > 0 || removed.length > 0

    if (changesOccurred) {
      previousChangeSetRef.current = newChangeSet

      setUpdatedValues({
        ...initialValues,
        overtimes: filteredOvertimes,
        deductions: filteredDeductions,
        additionalPayments: filteredAdditionalPayments
      })
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }, [initialValues, filterValidObjects])

  return { updatedValues, hasChanges }
}
