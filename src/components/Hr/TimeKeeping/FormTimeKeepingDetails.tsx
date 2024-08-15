import { Box, Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { EmployeeOverTime, EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { DynamicFieldsAccordion } from '@/components/Hr/TimeKeeping/components/DynamicFieldsAccordion'
import { useEffect } from 'react'
import { useTrackChanges } from '@/components/Hr/TimeKeeping/useTrackChanges'
import { t } from 'i18next'
import { toast } from 'react-toastify'

interface FormTimeKeepingDetailsProps {
  onSetTotalPayment: (total: number) => void
}

export const FormTimeKeepingDetails = (props: FormTimeKeepingDetailsProps) => {
  const { onSetTotalPayment } = props
  const { values } = useFormikContext<EmployeeTimeKeepingProps>()
  const { updatedValues, hasChanges } = useTrackChanges(values)
  const queryClient = useQueryClient()

  const { mutateAsync: updateNetPayment } = useMutation({
    mutationFn: (payment: EmployeeTimeKeepingProps) =>
      apiRequest<{ total: number }, EmployeeTimeKeepingProps>({
        endpoint: 'timeKeepingCalculateTotal',
        payload: payment
      }),
    onSuccess: (res) => {
      onSetTotalPayment(res.total)
    }
  })

  console.log('values -->', values)
  console.log(
    'updatedValues -->',
    updatedValues.overtimes.filter((o) => !o.id)
  )

  const { mutate: deleteOvertime } = useMutation({
    mutationFn: (id: number) =>
      apiRequest({
        endpoint: 'employeeDeleteOvertime',
        method: 'DELETE',
        params: { employeeId: values.employee.id.toString(), overtimeId: id.toString() }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeKeeping'], refetchType: 'all' })
      toast.success('Entry Deleted')
    }
  })

  const { mutateAsync: updateTimeKeeping } = useMutation({
    mutationFn: (values: EmployeeTimeKeepingProps) =>
      apiRequest({
        endpoint: 'timeKeepingUpdate',
        payload: values,
        method: 'PUT',
        id: values.id
      })
  })

  const { mutateAsync: addOvertime } = useMutation({
    mutationFn: (overtimesToAdd: EmployeeOverTime[]) =>
      apiRequest({
        endpoint: 'employeeAddOvertime',
        params: { employeeId: values.employee.id.toString() },
        payload: overtimesToAdd
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Created')
    }
  })

  useEffect(() => {
    if (!hasChanges) {
      return
    }

    const handler = setTimeout(() => {
      addOvertime(updatedValues.overtimes.filter((o) => !o.id))
      updateNetPayment(updatedValues)
    }, 400)

    return () => {
      clearTimeout(handler)
    }
  }, [hasChanges, updateNetPayment, updatedValues])

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <DynamicFieldsAccordion
          deleteEmployeePayment={() => {}}
          deleteOvertime={deleteOvertime}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant={'contained'}
          onClick={() => updateTimeKeeping(values)}
        >
          {t('common:update')}
        </Button>
      </Box>
    </>
  )
}
