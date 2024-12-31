import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/paymentMethods/$id/')({
  component: () => <div>Hello /_authenticated/admin/paymentMethods/$id/!</div>
})