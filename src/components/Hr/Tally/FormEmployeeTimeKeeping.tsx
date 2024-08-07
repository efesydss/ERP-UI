import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { DynamicFields, DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { FieldArray, useFormikContext } from 'formik'
import { IoMdClose } from 'react-icons/io'
import { MdAdd, MdAutorenew } from 'react-icons/md'
import { enumToOptions } from '@/utils/transformers'
import { EmployeeOverTime, EmployeeTimeKeepingProps, OverTimePercentage } from '@/components/Hr/Tally/typesTimeKeeping'
import { CurrencyCode, PaymentType } from '@/components/Hr/Finances/typesFinance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { toast } from 'react-toastify'
import { EmployeePaymentProps } from '@/components/Hr/typesHr'

export const FormEmployeeTimeKeeping = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const [selectedType, setSelectedType] = useState('')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const { values } = useFormikContext<EmployeeTimeKeepingProps>()

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
      //todo: payload will be updated as []
      apiRequest({
        endpoint: 'employeeAddPayment',
        params: { employeeId: values.employee.id.toString() },
        payload: {
          ...payments[0],
          bankAccount: { id: payments[0].bankAccount }
        }
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

  const overTimeOptions = enumToOptions(OverTimePercentage)
  const paymentTypeOptions = enumToOptions(PaymentType)
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
      name: 'paymentType',
      type: 'select',
      options: paymentTypeOptions
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

  const fieldConfigurations: { [key: string]: Array<DynamicInputFieldProps> } = {
    deductions: employeePayment,
    additionalPayments: employeePayment,
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

  const newOvertimeRecords = useCallback(() => {
    return values.overtimes.filter((item) => !item.id && item.overTimePercentage && item.overtimeDate)
  }, [values.overtimes])
  const newPaymentRecords = useCallback(() => {
    const deductionRecords = values.deductions.filter((d) => !d.id && hasAllValuesFilled(d))
    const additionalPaymentRecords = values.additionalPayments.filter((d) => !d.id && hasAllValuesFilled(d))

    return [...deductionRecords, ...additionalPaymentRecords]
  }, [values.additionalPayments, values.deductions])

  const hasNewOvertimeRecords = newOvertimeRecords().length >= 1
  const hasNewPaymentRecords = newPaymentRecords().length >= 1

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
          name={'total'}
          nameSpace={'hr'}
          isOptional
          disabled
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

      {selectedType && (
        <FieldArray name={selectedType}>
          {({ push, remove, form }) => (
            <>
              {form.values[selectedType]?.map((_: any, index: number) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <FormGrid widths={'forth'}>
                    <DynamicFields
                      prefix={`${selectedType}.${index}`}
                      fields={fieldConfigurations[selectedType]}
                    />
                  </FormGrid>
                  <IconButton
                    onClick={() => {
                      const fieldValue = form.values[selectedType][index]
                      if (fieldValue && fieldValue.id) {
                        openDialog(
                          'Confirm Deletion',
                          'Are you sure you want to delete this item?',
                          () => {
                            deleteOvertime(fieldValue.id)
                          },
                          () => console.log('Deletion cancelled')
                        )
                      } else {
                        remove(index)
                      }
                    }}
                    color={'error'}
                  >
                    <IoMdClose />
                  </IconButton>
                </Box>
              ))}
              <Button
                type='button'
                onClick={() => push(initializeValues(fieldConfigurations[selectedType]))}
                color='primary'
                variant='contained'
                startIcon={<MdAdd />}
              >
                {hr(selectedType)}
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
              await addOvertime(newOvertimeRecords())
            }

            if (hasNewPaymentRecords) {
              await addPayment(newPaymentRecords())
            }
          }}
        >
          Güncelle
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
