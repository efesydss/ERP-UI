import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/sections/$id/')({
  component: () => <div>Hello /_authenticated/admin/sections/$id/!</div>
})