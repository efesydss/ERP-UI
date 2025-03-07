import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/catalog/$id/')({
  component: () => <div>Hello /_authenticated/storage/catalog/$id/!</div>
})