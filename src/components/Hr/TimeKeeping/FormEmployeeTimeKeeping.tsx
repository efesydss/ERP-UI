import { BaseSelect } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields, DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { MdAdd, MdAutorenew } from 'react-icons/md'
import {
  EmployeeOverTime,
  EmployeeTimeKeepingInfo,
  EmployeeTimeKeepingProps
} from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { toast } from 'react-toastify'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'
import { DynamicFieldsWrapper } from '@/components/Hr/TimeKeeping/stylesTimeKeeping'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useFormArray } from '@/components/Common/Form/useFormArray'
import { t } from 'i18next'
import {
  additionalPayment,
  deductionPayment,
  overTimeOptions,
  typeOptions
} from '@/components/Hr/TimeKeeping/utilsTimeKeeping'
import { NamedEntity } from '@/utils/sharedTypes'

export const FormEmployeeTimeKeeping = () => {
  const { t: hr } = useTranslation('hr')
  const [selectedType, setSelectedType] = useState('')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const { values, initialValues } = useFormikContext<EmployeeTimeKeepingProps>()

  const { addItem, setCurrentHelpers, removeItem } = useFormArray<any>()

  //todo: recheck, we dont need id here?
  const hasAllValuesFilled = (obj: any): boolean => {
    const checkValues = (obj: any): boolean => {
      return Object.keys(obj).every((key) => {
        if (key === 'id') return true
        const value = obj[key]
        if (value && typeof value === 'object') {
          return checkValues(value)
        }
        return Boolean(value)
      })
    }
    return checkValues(obj)
  }

  //todo: refactor
  const hasItemChanged = (
    item: EmployeeOverTime | EmployeePaymentProps | EmployeeTimeKeepingInfo | NamedEntity,
    initialItem: EmployeeOverTime | EmployeePaymentProps | EmployeeTimeKeepingInfo | NamedEntity
  ): boolean => {
    if (!initialItem) return false

    return Object.keys(item).some((key) => {
      const value = item[key as keyof typeof item]
      const initialValue = initialItem[key as keyof typeof item]

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return hasItemChanged(value, initialValue as any)
      }

      return value !== initialValue
    })
  }

  const hasNoRecords =
    !!selectedType && !values[selectedType as 'overtimes' | 'deductions' | 'additionalPayments'].length

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
      //todo: check bank account, cant send whole object right now
      apiRequest({
        endpoint: 'employeeAddPayment',
        params: { employeeId: values.employee.id.toString() },
        payload: payments.map((p) => ({
          ...p,
          bankAccount: { id: p.bankAccount }
        }))
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Created')
    }
  })

  const { mutateAsync: updatePayment } = useMutation({
    mutationFn: (paymentsToUpdate: EmployeePaymentProps[]) =>
      //todo: check bank account, cant send whole object right now
      apiRequest({
        endpoint: 'employeeUpdatePayment',
        method: 'PUT',
        params: { employeeId: values.employee.id.toString() },
        payload: paymentsToUpdate.map((p) => ({
          ...p,
          bankAccount: { id: 1 }
        }))
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

  const fieldConfigurations: { [key: string]: Array<DynamicInputFieldProps> } = {
    deductions: deductionPayment,
    additionalPayments: additionalPayment,
    overtimes: [
      {
        name: 'overTimePercentage',
        type: 'select',
        options: overTimeOptions
      },
      { name: 'overtimeDate', type: 'date' },
      { name: 'workingHours', type: 'number' }
    ]
  }

  const initializeValues = (fields: Array<DynamicInputFieldProps>) => {
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

  const recordsToProcess = useCallback(() => {
    const overtimesToUpdate = values.overtimes.filter((item, index) => {
      const initialItem = initialValues.overtimes[index]
      return item.id && hasItemChanged(item, initialItem)
    })

    const overtimesToAdd = values.overtimes.filter((item) => !item.id && hasAllValuesFilled(item))

    const deductionRecordsToAdd = values.deductions.filter((d) => !d.id && hasAllValuesFilled(d))
    const additionalPaymentRecordsToAdd = values.additionalPayments.filter((d) => !d.id && hasAllValuesFilled(d))

    const paymentRecordsToUpdate = [
      ...values.deductions.filter((d, index) => {
        const initialItem = initialValues.deductions[index]
        return d.id && hasItemChanged(d, initialItem)
      }),
      ...values.additionalPayments.filter((d, index) => {
        const initialItem = initialValues.additionalPayments[index]
        return d.id && hasItemChanged(d, initialItem)
      })
    ]

    return {
      overtimesToUpdate,
      overtimesToAdd,
      paymentRecordsToAdd: [...deductionRecordsToAdd, ...additionalPaymentRecordsToAdd],
      paymentRecordsToUpdate
    }
  }, [
    values.overtimes,
    values.deductions,
    values.additionalPayments,
    initialValues.overtimes,
    initialValues.deductions,
    initialValues.additionalPayments
  ])

  const { overtimesToAdd, paymentRecordsToAdd, overtimesToUpdate, paymentRecordsToUpdate } = recordsToProcess()

  const hasNewOvertimeRecords = overtimesToAdd.length >= 1
  const hasNewPaymentRecords = paymentRecordsToAdd.length >= 1
  const hasUpdatedOvertimes = overtimesToUpdate.length >= 1
  const hasUpdatedPaymentRecords = paymentRecordsToUpdate.length >= 1

  const isUpdateEnabled =
    hasNewOvertimeRecords || hasNewPaymentRecords || hasUpdatedOvertimes || hasUpdatedPaymentRecords

  console.log('recordsToProcess() -->', recordsToProcess())

  return (
    <>
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
      <Stack
        direction={'row'}
        alignItems={'flex-end'}
        gap={2}
        sx={{ width: '100%', marginY: 2 }}
      >
        <BaseSelect
          name='entryType'
          options={typeOptions}
          onChange={(option) => setSelectedType(option)}
        />
        <Button
          type='button'
          onClick={() => addItem(initializeValues(fieldConfigurations[selectedType]))}
          color='primary'
          variant='outlined'
          sx={{ flexShrink: 0 }}
          startIcon={<MdAdd />}
          disabled={!selectedType}
        >
          Satır Ekle
        </Button>
      </Stack>
      {hasNoRecords && <Typography sx={{ fontSize: '.8rem' }}>{hr('noRecord')}</Typography>}

      {selectedType && (
        <FieldArray name={selectedType}>
          {(arrayHelpers) => {
            setCurrentHelpers(arrayHelpers)
            return (
              <>
                {arrayHelpers.form.values[selectedType]?.map((_: any, index: number) => (
                  <DynamicFieldsWrapper key={index}>
                    <Box>
                      <FormGrid widths={'forth'}>
                        <DynamicFields
                          prefix={`${selectedType}.${index}`}
                          fields={fieldConfigurations[selectedType]}
                        />
                      </FormGrid>
                      <IconButton
                        sx={{ position: 'absolute', right: 6, top: 6 }}
                        size={'small'}
                        onClick={() => {
                          const fieldValue = arrayHelpers.form.values[selectedType][index]
                          //todo: just temp! will refactor
                          if (fieldValue && fieldValue.id) {
                            openDialog(
                              'Confirm Deletion',
                              'Are you sure you want to delete this item?',
                              () => {
                                if (selectedType === 'overtimes') {
                                  deleteOvertime(fieldValue.id)
                                }
                                if (selectedType === 'additionalPayments' || selectedType === 'deductions') {
                                  deleteEmployeePayment(fieldValue.id)
                                }
                              },
                              () => console.log('Deletion cancelled')
                            )
                          } else {
                            removeItem(index)
                          }
                        }}
                        color={'error'}
                      >
                        <FaRegTrashCan />
                      </IconButton>
                    </Box>
                  </DynamicFieldsWrapper>
                ))}
              </>
            )
          }}
        </FieldArray>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
        <Button
          startIcon={<MdAutorenew />}
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
          {t('hr:saveDraft')}
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isUpdateEnabled}
        >
          {hr('createTimeKeeping')}
        </Button>
      </Box>
    </>
  )
}
