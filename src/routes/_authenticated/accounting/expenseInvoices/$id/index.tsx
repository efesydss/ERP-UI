import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/expenseInvoices/$id/')({
  component: () => <div>Hello /_authenticated/accounting/expenseInvoices/$id/!</div>
})