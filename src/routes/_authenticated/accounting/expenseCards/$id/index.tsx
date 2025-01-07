import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/expenseCards/$id/')({
  component: () => <div>Hello /_authenticated/accounting/expenseCards/$id/!</div>
})