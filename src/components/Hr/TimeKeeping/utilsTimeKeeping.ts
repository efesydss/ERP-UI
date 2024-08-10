import { enumToOptions } from '@/utils/transformers'
import { OverTimePercentage } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { AdditionalPaymentType, CurrencyCode, DeductionPaymentType } from '@/components/Hr/Finances/typesFinance'
import { OptionType } from '@/components/Common/Form/BaseSelect'
import { t } from 'i18next'

export const overTimeOptions = enumToOptions(OverTimePercentage)

export const additionalPaymentTypeOptions = enumToOptions(AdditionalPaymentType, 'hr')
export const deductionPaymentTypeOptions = enumToOptions(DeductionPaymentType, 'hr')

export const currencyCodeOptions = enumToOptions(CurrencyCode)

//todo: temp
const bankOptions = [
  {
    value: '1',
    label: 'defaultBank'
  }
]

export const typeOptions: OptionType[] = [
  { value: 'deductions', label: t('hr:deductions') },
  { value: 'overtimes', label: t('hr:overtimes') },
  { value: 'additionalPayments', label: t('hr:additionalPayments') }
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

export const employeePayment = [
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

export const additionalPayment = [
  ...employeePayment,
  {
    name: 'paymentType',
    type: 'select',
    options: additionalPaymentTypeOptions
  }
]

export const deductionPayment = [
  ...employeePayment,
  {
    name: 'paymentType',
    type: 'select',
    options: deductionPaymentTypeOptions
  }
]
