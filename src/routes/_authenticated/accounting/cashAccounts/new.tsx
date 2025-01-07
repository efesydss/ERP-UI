import { createFileRoute } from '@tanstack/react-router'
import { CashAccountAdd } from '@/components/Accounting/CashAccount/CashAccountAdd'

export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/new')({
  component: () => <CashAccountAdd />
})