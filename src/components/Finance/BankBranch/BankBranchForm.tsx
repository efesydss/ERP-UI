import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'

interface FormBankBranchProps {
  bankBranchId?: number
}

export const BankBranchForm = (props: FormBankBranchProps) => {
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
              name={'name'}
              label={t('common:name')}
              required
            />
            <BaseSelect
              name={'bank'}
              endpoint={'banks'}
            />
            <Input
              name={'relatedEmployee'}
              label={t('common:relatedEmployee')}
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