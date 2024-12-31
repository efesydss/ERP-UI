import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/fixtureCards/$id/')({
  component: () => <div>Hello /_authenticated/storage/fixtureCards/$id/!</div>
})