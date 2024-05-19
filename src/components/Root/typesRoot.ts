import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { IconType } from 'react-icons'

export interface AppBarProps extends MuiAppBarProps {
  isOpen?: boolean
}

export interface MenuItemProps {
  label: string
  icon: IconType
  sub?: MenuItemProps[]
}
