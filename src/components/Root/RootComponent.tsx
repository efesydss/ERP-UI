import { Outlet } from '@tanstack/react-router'
import { DrawerHeader, Main, RootWrapper } from '@/components/Root/stylesRoot'
import { AppBar } from '@/components/Root/components/AppBar/AppBar'
import { AppDrawer } from '@/components/Root/components/AppDrawer/AppDrawer'

export const RootComponent = () => {
  return (
    <RootWrapper>
      <AppBar />
      <AppDrawer />
      <Main component={'main'}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </RootWrapper>
  )
}
