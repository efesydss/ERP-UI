import { TimeKeepingList } from '@/components/Hr/TimeKeeping/TimeKeepingList'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@mui/material'
import { PiFlag } from 'react-icons/pi'
import { Route } from '@/routes/_authenticated/hr/timekeeping/new'

export const TimeKeepings = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const TimeKeepingListActions = () => (
    <Button
      variant={'contained'}
      size={'small'}
      startIcon={<PiFlag />}
      onClick={() => navigate({ to: Route.fullPath })}
    >
      {t('common:createTimeKeeping')}
    </Button>
  )

  return (
    <>
      <PageTitle
        title={t('common:timeKeepingList')}
        actions={<TimeKeepingListActions />}
      />
      <TimeKeepingList />
    </>
  )
}
