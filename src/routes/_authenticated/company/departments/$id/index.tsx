import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/company/departments/$id/')({
  component: () => <div>Hello /_authenticated/company/departments/$id/!</div>
})