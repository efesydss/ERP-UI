import { createFileRoute } from '@tanstack/react-router'
import { BankAccountList } from '@/components/Finance/BankAccount/BankAccountList'

export const Route = createFileRoute('/_authenticated/finance/bankAccounts/')({
  component: () => <BankAccountList />
})