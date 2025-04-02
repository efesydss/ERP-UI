import { createFileRoute } from '@tanstack/react-router'
import { CompanyList } from '@/components/Admin/Company/Company/CompanyList'

export const Route = createFileRoute('/_authenticated/admin/companies/')({
  component: () => <CompanyList />
})