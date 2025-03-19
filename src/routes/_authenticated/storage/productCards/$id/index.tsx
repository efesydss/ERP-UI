import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/productCards/$id/')({
  component: () => <div>Hello /_authenticated/storage/productCards/$id/!</div>
})