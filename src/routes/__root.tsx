import { createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { RootComponent } from '@/components/Root/RootComponent'

export interface RouterContextProps {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContextProps>()({
  component: RootComponent
})
