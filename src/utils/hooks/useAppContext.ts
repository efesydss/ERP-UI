import { useContext } from 'react'
import { AppContext } from '@/utils/providers/AppContext/AppContext'

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
