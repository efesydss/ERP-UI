import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialGroups/$id/')({
  component: () => <div>Hello /_authenticated/storage/materialGroups/$id/!</div>
})