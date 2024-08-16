import { Container, Paper, Stack, Typography } from '@mui/material'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLogin } from '@/components/Auth/FormLogin'
import * as yup from 'yup'
import { useLogin } from '@/utils/hooks/useLogin'
import logo from '@/assets/images/sahinler_logo.png'

export const Login = () => {
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
      sx={{ py: 16 }}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap={2}
        justifyContent='center'
        mb={2}
      >
        <img
          height={32}
          src={logo}
          alt='sahinler erp'
        />
        <Typography sx={{ fontWeight: 600 }}>Şahinler Denizcilik ERP</Typography>
      </Stack>

      <Paper sx={{ p: 2 }}>
        <BaseForm
          initialValues={loginFormFields}
          component={<FormLogin />}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
        />
      </Paper>
    </Container>
  )
}
