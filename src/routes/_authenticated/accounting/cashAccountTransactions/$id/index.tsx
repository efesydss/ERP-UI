import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/cashAccountTransactions/$id/')({
  component: () => <div>Hello /_authenticated/accounting/cashAccountTransactions/$id/!</div>
})