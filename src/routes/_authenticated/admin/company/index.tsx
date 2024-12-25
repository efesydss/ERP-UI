import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/company/')({
  component: () => <div>Hello /_authenticated/admin/company/!</div>
})