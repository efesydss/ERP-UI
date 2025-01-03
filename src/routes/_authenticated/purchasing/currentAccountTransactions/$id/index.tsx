import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountTransactions/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/currentAccountTransactions/$id/!</div>
})