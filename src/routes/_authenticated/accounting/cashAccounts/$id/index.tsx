import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/$id/')({
  component: () => <div>Hello /_authenticated/accounting/cashAccounts/$id/!</div>
})