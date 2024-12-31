import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/bankAccounts/$id/')({
  component: () => <div>Hello /_authenticated/finance/bankAccounts/$id/!</div>
})