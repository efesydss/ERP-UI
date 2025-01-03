import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/branches/')({
  component: () => <div>Hello /_authenticated/finance/bank/branches/!</div>
})