import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import {
  Currency,
  TransactionTypeEnum,
  PaymentTypeEnum,
  DebtTypeEnum
} from '@/components/Purchasing/CurrentAccountTransaction/types/typesCurrentAccountTransaction'

interface FormCurrentAccountTransactionProps {
  currentAccountTransactionId?: number
}

const warrantyPeriodOptions = Object.values(TransactionTypeEnum).map((value) => ({
  label: value,
  value: value
}))
const paymentOptions = Object.values(PaymentTypeEnum).map((value) => ({
  label: value,
  value: value
}))
const currOptions = Object.values(Currency).map((value) => ({
  label: value,
  value: value
}))
const debtPeriodOptions = Object.values(DebtTypeEnum).map((value) => ({
  label: value,
  value: value
}))

export const CurrentAccountTransactionForm = (props: FormCurrentAccountTransactionProps) => {
  console.log(props)
  const { t } = useTranslation()

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <DatePicker name={'date'} />
            <Input
              name={'description'}
              label={t('common:description')}

            />
            <BaseSelect
              name={'currentAccount'}
              endpoint={'currentAccounts'} />
            <BaseSelect
              name={'transactionType'}
              isEnum={true}
              options={warrantyPeriodOptions}
              selectLabel={'transactionType'}
            />
            <BaseSelect
              name={'paymentType'}
              isEnum={true}
              options={paymentOptions}
              selectLabel={'paymentType'} />
            <BaseSelect
              name={'currency'}
              isEnum={true}
              options={currOptions}
              selectLabel={'currency'} />
            <BaseSelect
              name={'bankAccount'}
              endpoint={'bankAccounts'} />
            <Input
              name={'transactionFee'}
              label={t('common:transactionFee')}
              required
            />
            <BaseSelect
              name={'debtType'}
              isEnum={true}
              options={debtPeriodOptions}
              selectLabel={'debtType'}
            />
            <Input
              name={'amount'}
              label={t('common:amount')}
              required
            />

          </FormGrid>

        </FormGrid>

      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          size={'small'}
          endIcon={<FaCheck />}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {t('common:save')}
        </Button>

      </Box>
    </>
  )
}