import { createFileRoute } from '@tanstack/react-router'
import { TimeKeepings } from '@/components/Hr/Tally/TimeKeepings'

export const Route = createFileRoute('/_authenticated/hr/tally/')({
  component: () => <TimeKeepings />
})
