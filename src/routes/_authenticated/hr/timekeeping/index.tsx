import { createFileRoute } from '@tanstack/react-router'
import { TimeKeepings } from '@/components/Hr/TimeKeeping/TimeKeepings'

export const Route = createFileRoute('/_authenticated/hr/timekeeping/')({
  component: () => <TimeKeepings />
})
