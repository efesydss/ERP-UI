import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'

interface FormCompanyProps {
  companyId?: number

}

export const CompanyForm = (props: FormCompanyProps) => {
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
            <Input name={'id'} />
            <Input name={'code'} />
            <Input name={'title'} />
            <Input name={'address'} />
            <Input name={'phone'} />
          </FormGrid>

          <FormGrid>
            <Input name={'phoneBackup'} />
            <Input name={'taxAdmin'} />
            <Input name={'taxNumber'} />
            <BaseSelect name={'branch'} endpoint={'branches'} />
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