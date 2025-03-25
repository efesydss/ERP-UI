import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/productGroups/new')({
  component: () => <div>Hello /_authenticated/storage/productGroups/new!</div>
})