import { createFileRoute } from '@tanstack/react-router'
import { LeavesList } from '@/components/Hr/Leaves/LeavesList'

export const Route = createFileRoute('/_authenticated/hr/leaves/')({
  component: () => <LeavesList />
})
