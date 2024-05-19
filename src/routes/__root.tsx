import { createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { AppContextProps } from '@/utils/AppContext'
import { RootComponent } from '@/components/Root/RootComponent'

export interface RouterContextProps {
  auth: AppContextProps
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContextProps>()({
  component: RootComponent
})
