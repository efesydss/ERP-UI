import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/invoices/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/invoices/$id/!</div>
})