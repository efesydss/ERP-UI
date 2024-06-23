import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'

export const FormLogin = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <FormGrid>
        <Input name={'email'} />
        <Input name={'password'} />
      </FormGrid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {t('login')}
        </Button>
      </Box>
    </>
  )
}
