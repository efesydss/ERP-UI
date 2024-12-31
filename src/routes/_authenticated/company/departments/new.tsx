import { createFileRoute } from '@tanstack/react-router'
import { DepartmentAdd } from '@/components/Company/Department/DepartmentAdd'

export const Route = createFileRoute('/_authenticated/company/departments/new')({
  component: () => <DepartmentAdd />
})