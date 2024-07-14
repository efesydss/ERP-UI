import { Toolbar } from '@mui/material'
import { useAppContext } from '@/utils/hooks/useAppContext'
import { AppTopBar } from '@/components/Root/stylesRoot'
import { setLocale } from 'yup'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/components/Common/Breadcrumbs/Breadcrumbs'

export const AppBar = () => {
  const { isDrawerOpen } = useAppContext()
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
      <Toolbar>
        <Breadcrumbs />
      </Toolbar>
    </AppTopBar>
  )
}
