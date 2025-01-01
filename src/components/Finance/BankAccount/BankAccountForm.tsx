import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { Currency } from '@/components/Storage/typesEnums'

interface FormBankAccountProps {
  bankAccountId?: number

}

export const BankAccountForm = (props: FormBankAccountProps) => {
  console.log(props)
  const { t } = useTranslation()

  const warrantyPeriodOptions = Object.values(Currency).map((value) => ({
    label: value,
    value: value
  }))


  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <Input name={'accountNumber'} />
            <Input name={'iban'} />
            <BaseSelect
              name={'currency'}
              isEnum={true}
              options={warrantyPeriodOptions}
              selectLabel={'Currency'}
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