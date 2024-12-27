import { createFileRoute } from '@tanstack/react-router'
import { RoleList } from '@/components/Admin/Role/RoleList'

export const Route = createFileRoute('/_authenticated/admin/roles/')({
  component: () => <RoleList />
})