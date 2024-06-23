import { createFileRoute } from '@tanstack/react-router'
import { EmployeeList } from '@/components/Hr/Employee/EmployeeList'

export const Route = createFileRoute('/_authenticated/hr/employees/')({
  component: EmployeeList
})
