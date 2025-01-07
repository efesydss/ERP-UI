import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/expenseInvoices/new')({
  component: () => <div>Hello /_authenticated/accounting/expenseInvoices/new!</div>
})