import { createFileRoute } from '@tanstack/react-router'
import { CashAccountTransactionAdd } from '@/components/Accounting/CashAccountTransaction/CashAccountTransactionAdd'

export const Route = createFileRoute('/_authenticated/accounting/cashAccountTransactions/new')({
  component: () => <CashAccountTransactionAdd />
})