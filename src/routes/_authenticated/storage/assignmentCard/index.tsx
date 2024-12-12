import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/assignmentCard/')({
  component: () => <div>Hello /_authenticated/storage/assignmentCard/!</div>//list
})