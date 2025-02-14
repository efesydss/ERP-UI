import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/sales/proposals/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/sales/proposals/$id/"!</div>
}
