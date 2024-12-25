import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/shelfs')({
  component: () => <div>Hello /_authenticated/storage/shelfs!</div>
})