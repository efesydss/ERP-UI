import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/branches/new')({
  component: () => <div>Hello /_authenticated/finance/bank/branches/new!</div>
})