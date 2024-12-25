import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/shelf/$id/')({
  component: () => <div>Hello /_authenticated/storage/shelf/$id/!</div>
})