import { createFileRoute } from '@tanstack/react-router'
import { CompanyAdd } from '@/components/Admin/Company/CompanyAdd'

export const Route = createFileRoute('/_authenticated/admin/companies/new')({
  component: () => <CompanyAdd />
})