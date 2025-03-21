import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { Currency } from '@/components/Accounting/CashAccount/types/typesCashAccount'

interface FormCurrentAccountBankAccountProps {
  currentAccountBankAccountId?: number
}

const assignmentStatusOptions = Object.values(Currency).map((value) => ({
  label: value,
  value: value
}))

export const CurrentAccountBankAccountForm = (props: FormCurrentAccountBankAccountProps) => {
  console.log(props)
  const { t } = useTranslation()

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >

          <BaseSelect
            name={'currentAccount'}
            fieldName={'title'}
            endpoint={'currentAccounts'}
          />
          <Input
            name={'iban'}
            label={t('common:iban')}
            required />
          <Input name={'accountNumber'}
                 label={t('common:accountNumber')}
                 required />
          <BaseSelect
            name={'currency'}
            isEnum={true}
            options={assignmentStatusOptions}
            selectLabel={t('common:Currency')}
          />

          <BaseSelect
            name={'bank'}
            fieldName={'bankName'}
            endpoint="banks"
            selectLabel={t('common:bank')}
          />
          <Input
            name={'branch'}
            label={t('common:branch')}
            required />


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