import { createFileRoute } from '@tanstack/react-router'
import { ExpenseCardAdd } from '@/components/Accounting/ExpenseCard/ExpenseCardAdd'

export const Route = createFileRoute('/_authenticated/accounting/expenseCards/new')({
  component: () => <ExpenseCardAdd />
})