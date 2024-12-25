import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/unit/new')({
  component: () => <div>Hello /_authenticated/storage/unit/new!</div>
})