import { createFileRoute } from '@tanstack/react-router'
import { BankAccountAdd } from '@/components/Finance/BankAccount/BankAccountAdd'

export const Route = createFileRoute('/_authenticated/finance/branches/$id/bankAccounts/new')({
  component: () => <BankAccountAdd />
})