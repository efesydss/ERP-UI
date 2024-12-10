import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/machines/new')({
  component: () => <div>Hello /_authenticated/admin/machines/new!</div>
})