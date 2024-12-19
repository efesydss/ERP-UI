import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/assignmentCards/$id/')({
  component: () => <div>Hello /_authenticated/storage/assignmentCard/$id/!</div>//detail
})