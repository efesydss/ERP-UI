import { Container } from '@mui/material'
import { apiRequest } from '@/utils/apiDefaults'
import { useRouter } from '@tanstack/react-router'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLogin } from '@/components/Auth/FormLogin'
import { useMutation } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'
import * as yup from 'yup'

export const LoginComponent = () => {
  const router = useRouter()

  const loginFormFields = {
    username: '',
    password: ''
  }

  const { mutate } = useMutation({
    mutationFn: (values: typeof loginFormFields) => apiRequest<typeof loginFormFields>(apiRoutes.login, 'POST', values),
    onSuccess: () => console.log('login form success'),
    onError: () => console.log('login form error')
  })

  const onFormSubmit = (values: typeof loginFormFields) => {
    mutate(values)

    /* try {
      const response = await axiosBase.get('/user/login', {
        params: { username, password }
      })
      console.log(response.data)
      setAuthToken(response.data.token)
      router.history.push('/dashboard')
    } catch (error) {
      console.error('There was an error!', error)
    }*/
  }

  const validationSchema = yup.object({
    username: yup.string().required(),
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
