import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Box, Button, Paper } from '@mui/material'
import { Input } from '@/components/Common/Form/Input/Input'
import { useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa6'

interface FormDepotProps {
  depotId?: number

}

export const FormDepot = (props: FormDepotProps) => {
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
