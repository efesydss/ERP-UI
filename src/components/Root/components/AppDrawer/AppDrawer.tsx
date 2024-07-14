import { AppNavDrawer, SidebarHeader } from '@/components/Root/stylesRoot'
import { IconButton, List } from '@mui/material'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { navMenuItems } from '@/components/Root/components/AppDrawer/navMenuItems'
import { NavListItem } from '@/components/Root/components/AppDrawer/NavListItem'
import { useEffect, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import logo from '@/assets/images/sahinler_logo.png'
import { TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarRightExpandFilled } from 'react-icons/tb'

export const AppDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppContext()
  const [activeMenus, setActiveMenus] = useState<string[]>([])

  const pathname = useLocation({
    select: (location) => location.pathname
  })

  const parentPath = pathname.match(/(?<=\/)[^/]+(?=\/)/)

  useEffect(() => {
    if (!parentPath || !parentPath.length) {
      return
    }
    setActiveMenus(parentPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMenuClick = (menuName: string) => {
    setActiveMenus((prev) => (prev.includes(menuName) ? prev.filter((name) => name !== menuName) : [...prev, menuName]))
  }

  return (
    <AppNavDrawer
      variant={'permanent'}
      open={isDrawerOpen}
    >
      <SidebarHeader>
        <img
          height={42}
          src={logo}
          alt='sahinler erp'
        />
      </SidebarHeader>
      <List
        disablePadding
        sx={{ flexGrow: 1 }}
      >
        {navMenuItems.map((nav) => {
          const depth = 0
          const menuName = nav.label

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
      <IconButton
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        disableRipple
      >
        {isDrawerOpen ? <TbLayoutSidebarRightExpandFilled /> : <TbLayoutSidebarRightCollapseFilled />}
      </IconButton>
    </AppNavDrawer>
  )
}
