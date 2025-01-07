import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { DatePicker } from '@/components/Common/Form/DatePicker/DatePicker'
import { Checkbox } from '@/components/Common/Form/Checkbox/Checkbox'

interface FormCashAccountTransactionProps {
  cashAccountTransactionId?: number
}

export const CashAccountTransactionForm = (props: FormCashAccountTransactionProps) => {
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

            <BaseSelect
              name="cashAccount"
              fieldName={'accountNumber'}
              endpoint="cashAccounts"
            />
            <BaseSelect
              name="currentAccount"
              fieldName={'title'}
              endpoint="currentAccounts"
            />

            <Input
              name={'description'}
              label={t('common:description')}
            />
            <Checkbox
              name={'debtStatus'}
              label={t('common:debtStatus')}

            />
            <Input
              name={'total'}
              label={t('common:total')}
              type={'number'}
            />

            <Input
              name={'balance'}
              label={t('common:balance')}
              type={'number'}
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