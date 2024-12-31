import { createFileRoute } from '@tanstack/react-router'
import { ExpenseCardList } from '@/components/Accounting/ExpenseCard/ExpenseCardList'

export const Route = createFileRoute('/_authenticated/accounting/expenseCards/')({
  component: () => <ExpenseCardList />
})