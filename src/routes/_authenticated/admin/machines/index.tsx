import { createFileRoute } from '@tanstack/react-router'
import { MachineList } from '@/components/Admin/machine/MachineList'

export const Route = createFileRoute('/_authenticated/admin/machines/')({
  component: () => <MachineList />
})