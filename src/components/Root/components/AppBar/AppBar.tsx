import { IconButton, Toolbar, Typography } from '@mui/material'
import { useAppContext } from '@/utils/hooks/useAppContext'
import MenuIcon from '@mui/icons-material/Menu'
import { AppTopBar } from '@/components/Root/stylesRoot'

export const AppBar = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppContext()

  return (
    <AppTopBar
      position={'fixed'}
      isOpen={isDrawerOpen}
      color={'secondary'}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => setIsDrawerOpen(true)}
          edge='start'
          sx={{
            marginRight: 5,
            ...(isDrawerOpen && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
        >
          header
        </Typography>
      </Toolbar>
    </AppTopBar>
  )
}
