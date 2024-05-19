import { createContext } from 'react'

export interface LoginResponseProps {
  username: string
  userId: number
  accessToken: string | undefined
  avatarURL: string
}

export interface User extends Omit<LoginResponseProps, 'accessToken'> {}

export interface LoginRequestProps {
  username: string
  password: string
}

export interface AppContextProps {
  setUser: (user: User | null) => void
  user: User | null
  setIsDrawerOpen: (isOpen: boolean) => void
  isDrawerOpen: boolean
}

const appInitials: AppContextProps = {
  setUser: () => {},
  setIsDrawerOpen: () => {},
  user: null,
  isDrawerOpen: true
}

export const AppContext = createContext<AppContextProps>(appInitials)
