import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountBankAccounts/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/currentAccountBankAccounts/$id/!</div>
})