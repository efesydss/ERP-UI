import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { MdAutorenew } from 'react-icons/md'
import { EmployeeOverTime, EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'
import { FaCheck } from 'react-icons/fa6'
import { t } from 'i18next'
import { processRecords } from '@/components/Hr/TimeKeeping/utilsTimeKeeping'
import { DynamicFieldsAccordion } from '@/components/Hr/TimeKeeping/components/DynamicFieldsAccordion'

export const FormTimeKeepingDraft = () => {
  const queryClient = useQueryClient()

  const { values, initialValues } = useFormikContext<EmployeeTimeKeepingProps>()

  console.log('values -->', values)

  const { mutateAsync: addOvertime, isPending: isAddOvertimePending } = useMutation({
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

  const { mutateAsync: updateOvertime } = useMutation({
    mutationFn: (overtimesToUpdate: EmployeeOverTime[]) =>
      apiRequest({
        endpoint: 'employeeAddOvertime',
        method: 'PUT',
        params: { employeeId: values.employee.id.toString() },
        payload: overtimesToUpdate
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Updated')
    }
  })

  const { mutateAsync: addPayment, isPending: isAddPaymentPending } = useMutation({
    mutationFn: (payments: EmployeePaymentProps[]) =>
      apiRequest({
        endpoint: 'employeeAddPayment',
        params: { employeeId: values.employee.id.toString() },
        payload: payments
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Created')
    }
  })

  const { mutateAsync: updatePayment } = useMutation({
    mutationFn: (paymentsToUpdate: EmployeePaymentProps[]) =>
      apiRequest({
        endpoint: 'employeeUpdatePayment',
        method: 'PUT',
        params: { employeeId: values.employee.id.toString() },
        payload: paymentsToUpdate
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Updated')
    }
  })

  const { mutate: deleteOvertime } = useMutation({
    mutationFn: (id: number) =>
      apiRequest({
        endpoint: 'employeeDeleteOvertime',
        method: 'DELETE',
        params: { employeeId: values.employee.id.toString(), overtimeId: id.toString() }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Deleted')
    }
  })

  const { mutate: deleteEmployeePayment } = useMutation({
    mutationFn: (id: number) =>
      apiRequest({
        endpoint: 'employeeDeletePayment',
        method: 'DELETE',
        params: { employeeId: values.employee.id.toString(), paymentId: id.toString() }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Deleted')
    }
  })

  const { overtimesToAdd, paymentRecordsToAdd, overtimesToUpdate, paymentRecordsToUpdate } = processRecords(
    values,
    initialValues
  )

  const hasNewOvertimeRecords = overtimesToAdd.length >= 1
  const hasNewPaymentRecords = paymentRecordsToAdd.length >= 1
  const hasUpdatedOvertimes = overtimesToUpdate.length >= 1
  const hasUpdatedPaymentRecords = paymentRecordsToUpdate.length >= 1

  const isUpdateEnabled =
    hasNewOvertimeRecords || hasNewPaymentRecords || hasUpdatedOvertimes || hasUpdatedPaymentRecords

  return (
    <>
      <Box sx={{ my: 3 }}>
        <FormGrid widths={'forth'}>
          <Input
            name={'netSalary'}
            nameSpace={'hr'}
            isOptional
            type='number'
          />
          <Input
            name={'normalWorkingDays'}
            nameSpace={'hr'}
            isOptional
            type='number'
          />
          <Input
            name={'weekendWorkingHours'}
            nameSpace={'hr'}
            isOptional
            type='number'
          />
          <Input
            name={'unpaidTimeOffHours'}
            nameSpace={'hr'}
            isOptional
            type='number'
          />
        </FormGrid>
      </Box>

      <DynamicFieldsAccordion
        deleteEmployeePayment={deleteEmployeePayment}
        deleteOvertime={deleteOvertime}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          startIcon={<MdAutorenew />}
          size={'small'}
          type={'button'}
          color={'primary'}
          disabled={!isUpdateEnabled || isAddOvertimePending || isAddPaymentPending}
          variant={'outlined'}
          onClick={async () => {
            if (hasNewOvertimeRecords) {
              await addOvertime(overtimesToAdd)
            }

            if (hasNewPaymentRecords) {
              await addPayment(paymentRecordsToAdd)
            }

            if (hasUpdatedOvertimes) {
              await updateOvertime(overtimesToUpdate)
            }

            if (hasUpdatedPaymentRecords) {
              await updatePayment(paymentRecordsToUpdate)
            }
          }}
        >
          {t('hr:updateDraft')}
        </Button>
        <Button
          startIcon={<FaCheck />}
          size={'small'}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isUpdateEnabled}
        >
          {t('hr:createTimeKeeping')}
        </Button>
      </Box>
    </>
  )
}
