import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button } from '@mui/material'
import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { useFormikContext } from 'formik'
import { validationSchema } from '@/components/Auth/Login'
import { t } from 'i18next'

export const FormLogin = () => {
  const { isValid, dirty } = useFormikContext<typeof validationSchema>()

  return (
    <>
      <FormGrid>
        <Input name={'email'} />
        <Input name={'password'} />
      </FormGrid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          disabled={!isValid || !dirty}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          {t('common:login')}
        </Button>
      </Box>
    </>
  )
}
