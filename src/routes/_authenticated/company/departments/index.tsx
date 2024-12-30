import { createFileRoute } from '@tanstack/react-router'
import { DepartmentList } from '@/components/Company/Department/DepartmentList'

export const Route = createFileRoute('/_authenticated/company/departments/')({
  component: () => <DepartmentList />
})