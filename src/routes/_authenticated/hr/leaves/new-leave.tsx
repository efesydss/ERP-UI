import { createFileRoute } from '@tanstack/react-router'
import { LeavesAdd } from '@/components/Hr/Leaves/LeavesAdd'

export const Route = createFileRoute('/_authenticated/hr/leaves/new-leave')({
  component: () => <LeavesAdd />
})
