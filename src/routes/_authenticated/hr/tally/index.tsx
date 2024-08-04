import { createFileRoute } from '@tanstack/react-router'
import { TallyList } from '@/components/Hr/Tally/TallyList'

export const Route = createFileRoute('/_authenticated/hr/tally/')({
  component: () => <TallyList />
})
