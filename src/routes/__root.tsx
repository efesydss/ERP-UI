import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { AppContextProps } from '@/utils/providers/AppContext/AppContext'
import i18n from 'i18next'
import { registerLocale } from 'react-datepicker'
import { tr } from 'date-fns/locale/tr'

export interface RouterContextProps {
  queryClient: QueryClient
  app: AppContextProps
}

export const Route = createRootRouteWithContext<RouterContextProps>()({
  component: () => {
    document.documentElement.lang = i18n.language
    registerLocale('tr', tr)

    return <Outlet />
  }
})
