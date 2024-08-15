import { createFileRoute } from '@tanstack/react-router'
import { EmployeeAdd } from '@/components/Hr/Employees/EmployeeAdd'

export const Route = createFileRoute('/_authenticated/hr/employees/new')({
  component: () => <EmployeeAdd />
})
