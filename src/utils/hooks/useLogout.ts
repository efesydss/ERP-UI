import { useMutation } from '@tanstack/react-query'
import { axiosBase, setAuthToken } from '@/utils/apiDefaults'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { useRouter } from '@tanstack/react-router'
import { apiRoutes } from '@/utils/apiRoutes'

export const useLogout = () => {
  const { setUser } = useAppContext()
  const router = useRouter()

  return useMutation({
    mutationFn: () => axiosBase.post(apiRoutes.userLogout),
    onSuccess: () => {
      setUser(null)
      localStorage.removeItem('user')
      setAuthToken(undefined)
      router.history.push('/login')
    }
  })
}
