import { createFileRoute } from '@tanstack/react-router'
import { EmployeeCreate } from '@/components/Hr/Employees/EmployeeCreate'

export const Route = createFileRoute('/_authenticated/hr/employees/new')({
  component: () => <EmployeeCreate />
})
