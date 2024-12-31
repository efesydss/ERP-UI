import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/company/branches/$id/')({
  component: () => <div>Hello /_authenticated/company/branches/$id/!</div>
})