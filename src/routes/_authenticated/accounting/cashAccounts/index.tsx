import { createFileRoute } from '@tanstack/react-router'
import { CashAccountList } from '@/components/Accounting/CashAccount/CashAccountList'

export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/')({
  component: () => <CashAccountList />
})