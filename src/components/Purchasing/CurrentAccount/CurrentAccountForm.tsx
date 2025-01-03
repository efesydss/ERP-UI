import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'
import { SectorEnum } from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount'
interface FormCurrentAccountProps {
  currentAccountId?: number
}

const assignmentStatusOptions = Object.values(SectorEnum).map((value) => ({
  label: value,
  value: value
}))
export const CurrentAccountForm = (props: FormCurrentAccountProps) => {
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
            <Input
              name={'code'}
              label={t('common:code')}
              required
            />
            <Input
              name={'title'}
              label={t('common:title')}
              required
            />
            <BaseSelect
              name={'active'}
              options={[
                { label: t('common:true'), value: true },
                { label: t('common:false'), value: false }
              ]}
              selectLabel={t('common:active')}
            />
            <BaseSelect
              name={'sector'}
              isEnum={true}
              options={assignmentStatusOptions}
              selectLabel={'Sector'}
            />
            <Input
              name={'contactInformation'}
              label={t('common:contactInformationBunuAnlamadım')}
              required
            />

            <BaseSelect
              name="bankAccount"
              endpoint="bankAccounts"
            />
            <Input
              name={'currentAccountBankAccount'}
              label={t('common:currentAccountBankAccounts burada birden fazla item seçebileceğim bir şey olmalı')}

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