import { MenuItemProps } from '@/components/Root/typesRoot'
import { List, ListItemIcon, ListItemText } from '@mui/material'
import { ListItemButton, ListItemContent, ListItem } from '@/components/Root/stylesRoot'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useAppContext } from '@/utils/hooks/useAppContext'

export interface NavListItemProps {
  depth: number
  menuName: string
  data: MenuItemProps
  onHandleMenuClick: (name: string) => void
  activeMenus: string[]
  parentRoute?: string
}

export const NavListItem = (props: NavListItemProps) => {
  const { isDrawerOpen } = useAppContext()
  const { t } = useTranslation('nav')
  const navigate = useNavigate()

  const { depth, menuName, data, onHandleMenuClick, activeMenus, parentRoute } = props
  const isToggled = activeMenus.includes(menuName)
  const hasSub = !!data.sub
  const itemLink = parentRoute ? `/${parentRoute}/${data.label}` : `/${data.label}`
  const pathname = useLocation({
    select: (location) => location.pathname
  })

  return (
    <>
      <ListItem
        disablePadding
        isCurrent={itemLink === pathname}
        isChild={!!parentRoute}
      >
        <ListItemButton
          onClick={() => {
            if (!hasSub) {
              navigate({ to: itemLink })
              return
            }
            onHandleMenuClick(menuName)
          }}
        >
          <ListItemContent
            depth={depth}
            isDrawerOpen={isDrawerOpen}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>{<data.icon />}</ListItemIcon>
            {isDrawerOpen && <ListItemText primary={t(data.label)} />}
          </ListItemContent>
          {isDrawerOpen && hasSub && (isToggled ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {data.sub && isToggled && (
        <List disablePadding>
          {data.sub.map((sub, index) => {
            const subMenuName = `${menuName}-${index}`
            return (
              <NavListItem
                key={subMenuName}
                menuName={subMenuName}
                depth={depth + 1}
                data={sub}
                onHandleMenuClick={onHandleMenuClick}
                activeMenus={activeMenus}
                parentRoute={data.label}
              />
            )
          })}
        </List>
      )}
    </>
  )
}
