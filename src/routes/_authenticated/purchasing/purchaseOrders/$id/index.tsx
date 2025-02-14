import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/purchaseOrders/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/purchaseOrders/$id/!</div>
})