import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/company/new')({
  component: () => <div>Hello /_authenticated/admin/company/new!</div>
})