import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { MultiThemeProvider } from '@/utils/ThemeContext'
import { initI18n } from '@/i18n'
import { AppProvider } from '@/utils/providers/AppContext/AppProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, ErrorComponent, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { FullPageCircular } from '@/components/Common/Loaders/FullPageCircular'
import { ConfirmationDialog } from '@/components/Common/Dialog/ConfirmationDialog'
import { ConfirmDialogProvider } from '@/utils/providers/ConfirmDialogContext/ConfirmDialogProvider'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    app: undefined!,
    queryClient
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => <FullPageCircular />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultNotFoundComponent: () => <span>is a 404</span>
})

/*
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
*/

function InnerApp() {
  const app = useAppContext()
  return (
    <RouterProvider
      router={router}
      context={{ app }}
    />
  )
}

function App() {
  return (
    <AppProvider>
      <ConfirmDialogProvider>
        <ConfirmationDialog />
        <InnerApp />
      </ConfirmDialogProvider>
    </AppProvider>
  )
}

const rootElement = document.getElementById('appRoot')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  initI18n()

  root.render(
    <StrictMode>
      <MultiThemeProvider>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: {
                backgroundColor: '#F9F9F9'
              }
            }}
          />
          <ToastContainer />
          <App />
        </QueryClientProvider>
      </MultiThemeProvider>
    </StrictMode>
  )
}
