import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button, Paper } from '@mui/material'
import {  FaCheck } from 'react-icons/fa6'
import { BaseSelect } from '@/components/Common/Form/Select/BaseSelect'


interface FormMachineProps {
  machineId?: number
}

export const FormMachine = (props: FormMachineProps) => {

  const { t } = useTranslation()


  console.log(props);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <FormGrid
          widths={'half'}
          isContainer
        >
          <FormGrid>
            <Input name={'code'} />
            <Input name={'description'} />


          </FormGrid>
          <FormGrid>
            <BaseSelect
              name="employee"
              endpoint="employees"
            />
          </FormGrid>

        </FormGrid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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

      </Paper>
    </>
  )
}
