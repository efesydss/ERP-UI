import { createFileRoute } from '@tanstack/react-router'
import { TimeKeepingList } from '@/components/Hr/Tally/TimeKeepingList'

export const Route = createFileRoute('/_authenticated/hr/tally/')({
  component: () => <TimeKeepingList />
})
