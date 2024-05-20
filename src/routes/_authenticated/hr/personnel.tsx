import { createFileRoute } from '@tanstack/react-router'
import { Personnel } from '@/components/Hr/Personnel/Personnel'

export const Route = createFileRoute('/_authenticated/hr/personnel')({
  component: () => <Personnel />
})
