import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/assignmentTransactions/$id/')({
  component: () => <div>Hello /_authenticated/storage/assignmentTransactions/$id/!</div>// if you wanna detail page..
})