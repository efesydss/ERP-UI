import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialCards/new')({
  component: () => <div>Hello /_authenticated/storage/materialCards/new!</div>
})