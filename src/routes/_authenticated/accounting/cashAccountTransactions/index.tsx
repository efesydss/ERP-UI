import { createFileRoute } from '@tanstack/react-router'
import { CashAccountTransactionList } from '@/components/Accounting/CashAccountTransaction/CashAccountTransactionList'

export const Route = createFileRoute('/_authenticated/accounting/cashAccountTransactions/')({
  component: () => <CashAccountTransactionList />
})