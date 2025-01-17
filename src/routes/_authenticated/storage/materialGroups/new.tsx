import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialGroups/new')({
  component: () => <div>Hello /_authenticated/storage/materialGroups/new!</div>
})