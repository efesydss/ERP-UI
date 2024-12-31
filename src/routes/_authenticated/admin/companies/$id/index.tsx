import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/companies/$id/')({
  component: () => <div>Hello /_authenticated/admin/company/$id/!</div>
})