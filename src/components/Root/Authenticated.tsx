import { drawerCollapsed, DrawerHeader, drawerWidth, Main, RootWrapper } from '@/components/Root/stylesRoot'
import { AppDrawer } from '@/components/Root/components/AppDrawer/AppDrawer'
import { Box } from '@mui/material'
import { AppBar } from '@/components/Root/components/AppBar/AppBar'
import { Outlet } from '@tanstack/react-router'
import { useAppContext } from '@/utils/hooks/useAppContext'

export const Authenticated = () => {
  const { isDrawerOpen } = useAppContext()

  return (
    <>
      <RootWrapper>
        <AppDrawer />
        <Box sx={{ width: `calc(100% - ${isDrawerOpen ? drawerWidth : drawerCollapsed}px)` }}>
          <AppBar />
          <Main component={'main'}>
            <DrawerHeader />
            <Outlet />
          </Main>
        </Box>
      </RootWrapper>
    </>
  )
}
