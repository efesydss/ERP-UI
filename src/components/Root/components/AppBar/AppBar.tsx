import { useAppContext } from '@/utils/hooks/useAppContext'
import { AppTopBar, Toolbar } from '@/components/Root/stylesRoot'
import { setLocale } from 'yup'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/components/Common/Breadcrumbs/Breadcrumbs'
import { IconButton } from '@mui/material'
import { MdOutlineLogout } from 'react-icons/md'
import { useLogout } from '@/utils/hooks/useLogout'

export const AppBar = () => {
  const { isDrawerOpen } = useAppContext()
  const { t: feedbacks } = useTranslation('feedbacks')
  const { mutate } = useLogout()

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
        <IconButton onClick={() => mutate()}>
          <MdOutlineLogout />
        </IconButton>
      </Toolbar>
    </AppTopBar>
  )
}
