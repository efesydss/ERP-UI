import { createFileRoute } from '@tanstack/react-router'
import { TimeKeepingTemp } from '@/components/Hr/TimeKeeping/TimeKeepingTemp'

export const Route = createFileRoute('/_authenticated/hr/timekeeping/new')({
  component: () => <TimeKeepingTemp />
})
