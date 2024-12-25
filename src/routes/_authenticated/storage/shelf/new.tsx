import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/shelf/new')({
  component: () => <div>Hello /_authenticated/storage/shelf/new!</div>
})