import { Box, ListItem as MuiListItem, CSSObject, ListItemButton as MuiListItemButton, styled, Theme } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { AppBarProps } from '@/components/Root/typesRoot'
import MuiDrawer from '@mui/material/Drawer'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

export const RootWrapper = styled('div')({
  display: 'flex'
})

export const AppTopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<AppBarProps>(({ theme, isOpen }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(isOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export const AppLeftDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

export const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3)
}))

export const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => prop !== 'isCurrent' && prop !== 'isChild'
})<{ isCurrent: boolean; isChild: boolean }>(({ theme, isCurrent, isChild }) => ({
  width: 'auto',
  overflow: 'hidden',
  ...(isChild && {
    margin: theme.spacing(0.5, 2),
    borderRadius: theme.spacing(1)
  }),
  ...(isCurrent && {
    backgroundColor: theme.palette.secondary.main
  })
}))

export const ListItemButton = styled(MuiListItemButton)(() => ({
  width: '100%',
  position: 'relative'
}))

export const ListItemContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'depth' && prop !== 'isDrawerOpen'
})<{ depth: number; isDrawerOpen: boolean }>(({ theme, depth, isDrawerOpen }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  position: 'relative',
  justifyContent: 'center',
  ...(depth !== 0 &&
    isDrawerOpen && {
      paddingLeft: theme.spacing(depth)
    })
}))
