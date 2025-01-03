import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccounts/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/currentAccounts/$id/!</div>
})