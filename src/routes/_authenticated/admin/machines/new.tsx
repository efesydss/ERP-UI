import { createFileRoute } from '@tanstack/react-router'
import { MachineAdd } from '@/components/Admin/machine/MachineAdd'
export const Route = createFileRoute('/_authenticated/admin/machines/new')({
  component: () => <MachineAdd/>
})