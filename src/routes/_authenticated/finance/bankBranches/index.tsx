import { createFileRoute } from '@tanstack/react-router'
import { BankBranchList } from '@/components/Finance/BankBranch/BankBranchList'

export const Route = createFileRoute('/_authenticated/finance/bankBranches/')({
  component: () => <BankBranchList />
})