import {
  Box,
  ListItem as MuiListItem,
  CSSObject,
  ListItemButton as MuiListItemButton,
  Toolbar as MuiToolbar,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  styled,
  Theme
} from '@mui/material'
import { AppBarProps } from '@/components/Root/typesRoot'

const drawerWidth = 240
const drawerCollapsed = 80
export const headerHeight = 54

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
  width: drawerCollapsed
})

export const RootWrapper = styled('div')({
  display: 'flex'
})

export const AppTopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.muted.main}`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
}))

export const AppNavDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  display: 'flex',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  }),
  '& .MuiPaper-root': {
    borderRight: `1px solid ${theme.palette.muted.main}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100dvh'
  }
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1)
}))

export const SidebarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  height: 64
}))

export const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3)
}))

export const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => prop !== 'isCurrent' && prop !== 'isChild'
})<{ isCurrent: boolean; isChild: boolean }>(({ theme, isCurrent, isChild }) => ({
  width: 'auto',
  ...(isChild
    ? {
        margin: theme.spacing(0.5, 2),
        borderRadius: theme.spacing(1),
        '& .MuiTypography-root': {
          fontSize: '0.8rem'
        },
        ...(isCurrent && {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.background.paper,

          '& svg': {
            color: theme.palette.background.paper
          }
        })
      }
    : {
        '& .MuiListItemText-root': {
          paddingTop: theme.spacing(0.25)
        },
        '& .MuiListItemText-primary': {
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '.8rem',
          lineHeight: '.8'
        }
      })
}))

export const ListItemButton = styled(MuiListItemButton)(() => ({
  width: '100%',
  position: 'relative',
  height: 44
}))

export const Toolbar = styled(MuiToolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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
