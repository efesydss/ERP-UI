import { createContext } from 'react'

type Roles = 'USER' | 'ADMIN'

export interface LoginResponse {
  token?: string
  user: User
}

export interface User {
  email: string
  id: number
  role: Roles
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AppContextProps {
  setUser: (user: User | null) => void
  user: User | null
  setIsDrawerOpen: (isOpen: boolean) => void
  isDrawerOpen: boolean
  crumb: string
}

const appInitials: AppContextProps = {
  setUser: () => {},
  setIsDrawerOpen: () => {},
  user: null,
  isDrawerOpen: true,
  crumb: '/'
}

export const AppContext = createContext<AppContextProps>(appInitials)
