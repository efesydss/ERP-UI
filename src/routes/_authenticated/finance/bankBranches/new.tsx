import { createFileRoute } from '@tanstack/react-router'
import { BankBranchAdd } from '@/components/Finance/BankBranch/BankBranchAdd'

export const Route = createFileRoute('/_authenticated/finance/bankBranches/new')({
  component: () => <BankBranchAdd />
})