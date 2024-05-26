import { Input } from '@/components/Common/Form/Input/Input'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const FormLogin = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <Input name={'username'} />
      <Input name={'password'} />
      <Button
        type={'submit'}
        color={'primary'}
        variant={'contained'}
      >
        {t('login')}
      </Button>
    </>
  )
}
