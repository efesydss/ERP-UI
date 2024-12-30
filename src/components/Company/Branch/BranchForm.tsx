import React from 'react';
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import { FaCheck } from 'react-icons/fa6'
interface FormBranchProps {
  BranchId?: number

}

export const BranchForm = (props: FormBranchProps) => {
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
            <Input name={'name'} />
            <Input name={'description'} />
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