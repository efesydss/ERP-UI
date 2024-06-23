import { createFileRoute } from '@tanstack/react-router'
import { EmployeeCreate } from '@/components/Hr/Employee/EmployeeCreate'

export const Route = createFileRoute('/_authenticated/hr/employees/create')({
  component: EmployeeCreate
})
