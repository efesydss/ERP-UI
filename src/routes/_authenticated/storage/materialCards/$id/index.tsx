import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialCards/$id/')({
  component: () => <div>Hello /_authenticated/storage/materialCards/$id/!</div>
})