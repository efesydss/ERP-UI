import { PropsWithChildren, useMemo, useState } from 'react'
import { AppContext, User } from '@/utils/providers/AppContext/AppContext'

export const AppProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [crumb, setCrumb] = useState('')

  const value = useMemo(
    () => ({
      user,
      setUser,
      isDrawerOpen,
      setIsDrawerOpen,
      crumb,
      setCrumb
    }),
    [user, isDrawerOpen, crumb]
  )

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}
