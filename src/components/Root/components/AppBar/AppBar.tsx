import { Avatar, Divider, IconButton, Toolbar } from '@mui/material'
import { useAppContext } from '@/utils/hooks/useAppContext'
import MenuIcon from '@mui/icons-material/Menu'
import { AppTopBar } from '@/components/Root/stylesRoot'
import { setLocale } from 'yup'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/components/Common/Breadcrumbs/Breadcrumbs'

export const AppBar = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppContext()
  const { t: feedbacks } = useTranslation('feedbacks')

  setLocale({
    mixed: {
      required: feedbacks('notValid.required')
    },
    string: {
      email: feedbacks('notValid.email')
    }
  })

  return (
    <AppTopBar
      position={'sticky'}
      isOpen={isDrawerOpen}
      color={'inherit'}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: isDrawerOpen ? 'flex-end' : 'space-between' }}>
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
        <Avatar>A</Avatar>
      </Toolbar>
      <Divider />
      <Breadcrumbs />
      <Divider />
    </AppTopBar>
  )
}
