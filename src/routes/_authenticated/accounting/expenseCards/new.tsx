import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/expenseCards/new')({
  component: () => <div>Hello /_authenticated/accounting/expenseCards/new!</div>
})