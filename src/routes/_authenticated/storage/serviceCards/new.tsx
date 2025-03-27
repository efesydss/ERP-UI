import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/serviceCards/new')({
  component: () => <div>Hello /_authenticated/storage/serviceCards/new!</div>
})