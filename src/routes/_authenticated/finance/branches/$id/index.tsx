import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/branches/$id/')({
  component: () => <div>Hello /_authenticated/finance/bank/branches/$id/!</div>
})
