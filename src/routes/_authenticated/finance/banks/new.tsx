import { createFileRoute } from '@tanstack/react-router'
import { BankAdd } from '@/components/Finance/Bank/BankAdd'

export const Route = createFileRoute('/_authenticated/finance/banks/new')({
  component: () => <BankAdd />
})