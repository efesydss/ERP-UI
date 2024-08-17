import { DynamicInputFieldProps } from '@/components/Common/Form/Input/DynamicFields'
import { useBankList } from '@/utils/hooks/useBankList'
import { OptionType } from '@/components/Common/Form/Select/BaseSelect'
import { enumToOptions } from '@/utils/transformers'
import { AdditionalPaymentType, CurrencyCode, DeductionPaymentType } from '@/components/Hr/Finances/typesFinance'
import { OverTimePercentage } from '@/components/Hr/TimeKeeping/typesTimeKeeping'

export const useFieldConfigurations = () => {
  const { bankList = [] } = useBankList()

  const bankOptions: OptionType[] = bankList?.map((b) => ({
    value: b.id ?? 0,
    label: b.bankShortName
  }))

  const bankSelectionField: DynamicInputFieldProps = {
    name: 'bankAccount',
    type: 'select',
    options: bankOptions,
    areOptionsEnum: false
  }

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
    },
    bankSelectionField
  ]

  const getAdditionalPayment = () => [
    ...getEmployeePayment(),
    {
      name: 'paymentType',
      type: 'select',
      options: enumToOptions(AdditionalPaymentType, 'hr')
    }
  ]

  const getDeductionPayment = () => [
    ...getEmployeePayment(),
    {
      name: 'paymentType',
      type: 'select',
      options: enumToOptions(DeductionPaymentType, 'hr')
    }
  ]

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
