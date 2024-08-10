import { Menu as MuiMenu, MenuItem as MuiMenuItem, styled } from '@mui/material'

export const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiList-root': {
    padding: theme.spacing(0.5)
  }
}))

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  '& p': {
    fontSize: '0.9rem'
  },
  padding: theme.spacing(1),
  minWidth: 100,
  display: 'flex',
  gap: theme.spacing(0.5)
}))
