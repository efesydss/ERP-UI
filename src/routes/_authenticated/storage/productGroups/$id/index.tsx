import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/productGroups/$id/')({
  component: () => <div>Hello /_authenticated/storage/productGroups/$id/!</div>
})