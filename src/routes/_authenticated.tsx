import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AppBar } from '@/components/Root/components/AppBar/AppBar'
import { AppDrawer } from '@/components/Root/components/AppDrawer/AppDrawer'
import { DrawerHeader, Main, RootWrapper } from '@/components/Root/stylesRoot'
import { getRefreshToken, setAuthToken, tokenGlobal } from '@/utils/apiDefaults'
import { Breadcrumbs } from '@/components/Common/Breadcrumbs/Breadcrumbs'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const { setUser } = context.app
    const persistedUserInfo = localStorage.getItem('user')

    console.log('context -->', context)

    if (!persistedUserInfo) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      })
    }

    try {
      const accessToken = await getRefreshToken()
      if (!accessToken) {
        return redirect({ to: '/login' })
      }

      if (tokenGlobal !== accessToken) {
        setAuthToken(accessToken)
      }

      setUser({
        ...(persistedUserInfo && JSON.parse(persistedUserInfo))
      })
    } catch (err) {
      console.error('err', err)
      throw redirect({ to: '/login' })
    }
  },
  component: () => (
    <>
      <RootWrapper>
        <AppBar />
        <AppDrawer />
        <Main component={'main'}>
          <DrawerHeader />
          <Breadcrumbs />
          <Outlet />
        </Main>
      </RootWrapper>
    </>
  )
})
