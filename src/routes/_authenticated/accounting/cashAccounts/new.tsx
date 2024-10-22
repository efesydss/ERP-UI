import { CashAccountAdd } from '@/components/Accounting/CashAccountAdd'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/new')({
  component: () => <CashAccountAdd />
})