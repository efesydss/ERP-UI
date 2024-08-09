import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields, DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { MdAdd, MdAutorenew } from 'react-icons/md'
import { enumToOptions } from '@/utils/transformers'
import { EmployeeOverTime, EmployeeTimeKeepingProps, OverTimePercentage } from '@/components/Hr/Tally/typesTimeKeeping'
import { AdditionalPaymentType, CurrencyCode, DeductionPaymentType } from '@/components/Hr/Finances/typesFinance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { toast } from 'react-toastify'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'
import { DynamicFieldsWrapper } from '@/components/Hr/Tally/stylesTimeKeeping'
import { FaRegTrashCan } from 'react-icons/fa6'

export const FormEmployeeTimeKeeping = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const [selectedType, setSelectedType] = useState('')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const { values } = useFormikContext<EmployeeTimeKeepingProps>()

  const hasNoRecords =
    !!selectedType && !values[selectedType as 'overtimes' | 'deductions' | 'additionalPayments'].length

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

  const { mutateAsync: addOvertime } = useMutation({
    mutationFn: (overtimes: EmployeeOverTime[]) =>
      apiRequest({
        endpoint: 'employeeAddOvertime',
        params: { employeeId: values.employee.id.toString() },
        payload: overtimes
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeTimeKeeping'] })
      toast.success('Entry Created')
    }
  })

  const { mutateAsync: addPayment } = useMutation({
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

  const overTimeOptions = enumToOptions(OverTimePercentage)

  const additionalPaymentTypeOptions = enumToOptions(AdditionalPaymentType, 'hr')
  const deductionPaymentTypeOptions = enumToOptions(DeductionPaymentType, 'hr')

  const currencyCodeOptions = enumToOptions(CurrencyCode)

  //todo: temp
  const bankOptions = [
    {
      value: '1',
      label: 'defaultBank'
    }
  ]

  const typeOptions: OptionType[] = [
    { value: 'deductions', label: hr('deductions') },
    { value: 'overtimes', label: hr('overtimes') },
    { value: 'additionalPayments', label: hr('additionalPayments') }
  ]

  /*  const bankAccountFields = [
    { name: 'accountNumber' },
    { name: 'iban' },
    {
      name: 'currency',
      type: 'select',
      options: currencyCodeOptions
    }
  ]*/

  const employeePayment = [
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
      options: currencyCodeOptions
    },
    {
      name: 'bankAccount',
      type: 'select',
      options: bankOptions
    }
    /*{
      name: 'bankAccount',
      type: 'nested',
      fields: bankAccountFields
    }*/
  ]

  const additionalPayment = [
    ...employeePayment,
    {
      name: 'paymentType',
      type: 'select',
      options: additionalPaymentTypeOptions
    }
  ]

  const deductionPayment = [
    ...employeePayment,
    {
      name: 'paymentType',
      type: 'select',
      options: deductionPaymentTypeOptions
    }
  ]

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
    const overtimesToUpdate = values.overtimes.filter((item) => item.id)
    const overtimesToAdd = values.overtimes.filter((item) => !item.id && hasAllValuesFilled(item))

    const deductionRecordsToAdd = values.deductions.filter((d) => !d.id && hasAllValuesFilled(d))
    const additionalPaymentRecordsToAdd = values.additionalPayments.filter((d) => !d.id && hasAllValuesFilled(d))

    const paymentRecordsToUpdate = [
      ...values.deductions.filter((d) => d.id),
      ...values.additionalPayments.filter((d) => d.id)
    ]

    return {
      overtimesToUpdate,
      overtimesToAdd,
      paymentRecordsToAdd: [...deductionRecordsToAdd, ...additionalPaymentRecordsToAdd],
      paymentRecordsToUpdate
    }
  }, [values.overtimes, values.deductions, values.additionalPayments])

  const { overtimesToAdd, paymentRecordsToAdd } = recordsToProcess()

  const hasNewOvertimeRecords = overtimesToAdd.length >= 1
  const hasNewPaymentRecords = paymentRecordsToAdd.length >= 1

  const isUpdateEnabled = hasNewOvertimeRecords || hasNewPaymentRecords

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
      <Stack sx={{ width: '100%', marginY: 2 }}>
        <BaseSelect
          name='entryType'
          options={typeOptions}
          onChange={(option) => setSelectedType(option)}
        />
      </Stack>
      {hasNoRecords && <Typography>No record yet</Typography>}

      {selectedType && (
        <FieldArray name={selectedType}>
          {({ push, remove, form }) => (
            <>
              {form.values[selectedType]?.map((_: any, index: number) => (
                <DynamicFieldsWrapper key={index}>
                  <Box>
                    <FormGrid widths={'forth'}>
                      <DynamicFields
                        prefix={`${selectedType}.${index}`}
                        fields={fieldConfigurations[selectedType]}
                      />
                    </FormGrid>
                    <IconButton
                      sx={{ position: 'absolute', right: 12, top: 12 }}
                      size={'small'}
                      disabled={isUpdateEnabled}
                      onClick={() => {
                        const fieldValue = form.values[selectedType][index]
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
                          remove(index)
                        }
                      }}
                      color={'error'}
                    >
                      <FaRegTrashCan />
                    </IconButton>
                  </Box>
                </DynamicFieldsWrapper>
              ))}
              <Button
                type='button'
                onClick={() => push(initializeValues(fieldConfigurations[selectedType]))}
                color='primary'
                variant='outlined'
                sx={{ my: 2 }}
                startIcon={<MdAdd />}
              >
                Satır Ekle
              </Button>
            </>
          )}
        </FieldArray>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          startIcon={<MdAutorenew />}
          type={'button'}
          color={'primary'}
          disabled={!isUpdateEnabled}
          variant={'outlined'}
          onClick={async () => {
            if (hasNewOvertimeRecords) {
              await addOvertime(overtimesToAdd)
            }

            if (hasNewPaymentRecords) {
              await addPayment(paymentRecordsToAdd)
            }
          }}
        >
          Taslak olarak kaydet
        </Button>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isUpdateEnabled}
        >
          {common('save')}
        </Button>
      </Box>
    </>
  )
}
