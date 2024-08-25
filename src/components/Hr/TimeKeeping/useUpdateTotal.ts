import { useMutation } from '@tanstack/react-query'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { apiRequest } from '@/utils/apiDefaults'
import { useEffect, useState } from 'react'
import { useTrackChanges } from '@/components/Hr/TimeKeeping/useTrackChanges'

interface UpdateTotalParams {
  values: EmployeeTimeKeepingProps
  onUpdateTotalPayment?: (total: number) => void
}

export const useUpdateTotal = (props: UpdateTotalParams) => {
  const { values, onUpdateTotalPayment } = props
  const [totalPayment, setTotalPayment] = useState<number>(values.total)
  const { updatedValues, hasChanges } = useTrackChanges(values)
  const { mutateAsync: updateNetPayment } = useMutation({
    mutationFn: (payment: EmployeeTimeKeepingProps) =>
      apiRequest<{ total: number }, EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepingCalculateTotal',
        payload: payment
      }),
    onSuccess: (res) => {
      if (onUpdateTotalPayment) {
        onUpdateTotalPayment(res.total)
      } else {
        setTotalPayment(res.total)
      }
    }
  })

  useEffect(() => {
    if (!hasChanges) {
      return
    }

    const handler = setTimeout(() => {
      updateNetPayment(updatedValues)
    }, 400)

    return () => {
      clearTimeout(handler)
    }
  }, [hasChanges, updateNetPayment, updatedValues])

  return { totalPayment, updatedValues }
}
