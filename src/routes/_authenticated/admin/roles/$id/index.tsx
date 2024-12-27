import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/roles/$id/')({
  component: () => <div>Hello /_authenticated/admin/roles/$id/!</div>
})