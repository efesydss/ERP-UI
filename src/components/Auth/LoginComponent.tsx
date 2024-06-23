import { Container } from '@mui/material'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLogin } from '@/components/Auth/FormLogin'
import * as yup from 'yup'
import { useLogin } from '@/utils/hooks/useLogin'

export const LoginComponent = () => {
  const loginFormFields = {
    email: '',
    password: ''
  }

  const { mutate } = useLogin()

  const onFormSubmit = (values: typeof loginFormFields) => {
    mutate(values)
  }

  const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
  })

  return (
    <Container
      maxWidth='xs'
      sx={{ py: 4 }}
    >
      <BaseForm
        initialValues={loginFormFields}
        component={<FormLogin />}
        onSubmit={onFormSubmit}
        validationSchema={validationSchema}
      />
    </Container>
  )
}
