import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppBar } from '@/components/Root/components/AppBar/AppBar'
import { AppDrawer } from '@/components/Root/components/AppDrawer/AppDrawer'
import { DrawerHeader, Main, RootWrapper } from '@/components/Root/stylesRoot'

export const Route = createFileRoute('/_authenticated')({
  /* beforeLoad: async ({ context, location }) => {
    const { setUser } = context.auth
    const persistedUserInfo = localStorage.getItem('user')

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

      if (tokenGlobal !== accessToken) {
        setAuthToken(accessToken)
      }

      setUser({
        ...(persistedUserInfo && JSON.parse(persistedUserInfo))
      })
    } catch (err) {
      console.error('err', err)
      redirect({ to: '/login' })
    }

    return {
      username: context.auth.user

  }}*/
  component: () => (
    <>
      <RootWrapper>
        <AppBar />
        <AppDrawer />
        <Main component={'main'}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </RootWrapper>
    </>
  )
})
