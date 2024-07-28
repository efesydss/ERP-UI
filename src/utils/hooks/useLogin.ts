import { useMutation } from '@tanstack/react-query'
import { LoginRequest, LoginResponse } from '@/utils/AppContext'
import { axiosBase, setAuthToken, skipRefreshAuth } from '@/utils/apiDefaults'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from '@tanstack/react-router'
import { apiRoutes } from '@/utils/apiRoutes'

interface ErrorResponse {
  error: string
}

export const useLogin = () => {
  const { setUser } = useAppContext()
  const router = useRouter()

  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) => {
      return axiosBase.post<LoginResponse>(apiRoutes.userLogin, { email, password }, skipRefreshAuth)
    },
    onSuccess: (res) => {
      const { user, token } = res.data

      console.log('userData -->', res.data)

      localStorage.setItem('user', JSON.stringify(user))

      setUser(user)

      setAuthToken(token)
      router.history.push('/dashboard')
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      let errMsg = 'Network Error'

      if (err.response && err.response.status === 401) {
        errMsg = err.response.data.error
      }

      toast.error(errMsg)
    }
  })
}
