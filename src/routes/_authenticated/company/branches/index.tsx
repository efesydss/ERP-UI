import { createFileRoute } from '@tanstack/react-router'
import { BranchList } from '@/components/Company/Branch/BranchList'
export const Route = createFileRoute('/_authenticated/company/branches/')({
  component: () => <BranchList />
})