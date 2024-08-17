import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLogin } from '@/components/Auth/FormLogin'
import * as yup from 'yup'
import { useLogin } from '@/utils/hooks/useLogin'
import logo from '@/assets/images/sahinler_logo.png'
import bckg from '@/assets/images/lgnBckg.jpg'

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
    <>
      <Container
        maxWidth='xs'
        sx={{ py: 22 }}
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

        <Paper sx={{ p: 2, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
          <BaseForm
            initialValues={loginFormFields}
            component={<FormLogin />}
            onSubmit={onFormSubmit}
            validationSchema={validationSchema}
          />
        </Paper>
      </Container>
      <Box
        sx={{
          backgroundImage: `url(${bckg})`,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      />
    </>
  )
}
