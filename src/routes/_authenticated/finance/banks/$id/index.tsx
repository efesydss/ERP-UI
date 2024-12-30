import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/banks/$id/')({
  component: () => <div>Hello /_authenticated/finance/banks/$id/!</div>
})