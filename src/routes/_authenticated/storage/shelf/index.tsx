import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/shelf/')({
  component: () => <div>Hello /_authenticated/storage/shelf/!</div>
})