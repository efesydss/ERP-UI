import { createFileRoute } from '@tanstack/react-router'
import { BranchAdd } from '@/components/Company/Branch/BranchAdd'

export const Route = createFileRoute('/_authenticated/company/branches/new')({
  component: () => <BranchAdd />
})