import { AppLeftDrawer, DrawerHeader } from '@/components/Root/stylesRoot'
import { IconButton, List } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { navMenuItems } from '@/components/Root/components/AppDrawer/navMenuItems'
import { NavListItem } from '@/components/Root/components/AppDrawer/NavListItem'
import { useState } from 'react'

export const AppDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppContext()
  const [activeMenus, setActiveMenus] = useState<string[]>([''])

  const handleMenuClick = (menuName: string) => {
    setActiveMenus((prev) => (prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]))
  }

  return (
    <AppLeftDrawer
      variant={'permanent'}
      open={isDrawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List disablePadding>
        {navMenuItems.map((nav, i) => {
          const depth = 0
          const menuName = `sidebar-${depth}-${i}`

          return (
            <NavListItem
              key={menuName}
              menuName={menuName}
              depth={depth}
              data={nav}
              onHandleMenuClick={handleMenuClick}
              activeMenus={activeMenus}
            />
          )
        })}
      </List>
    </AppLeftDrawer>
  )
}
