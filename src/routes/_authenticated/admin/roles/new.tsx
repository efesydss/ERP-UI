import { createFileRoute } from '@tanstack/react-router'
import { RoleAdd } from '@/components/Admin/Role/RoleAdd'

export const Route = createFileRoute('/_authenticated/admin/roles/new')({
  component: () => <RoleAdd />
})