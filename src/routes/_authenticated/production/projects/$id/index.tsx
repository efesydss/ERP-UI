import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/production/projects/$id/')({
  component: () => <div>Hello /_authenticated/projects/$id/!</div>
})