import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/bankBranches/$id/')({
  component: () => <div>Hello /_authenticated/finance/bankBranches/$id/!</div>
})