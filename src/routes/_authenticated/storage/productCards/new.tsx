import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/productCards/new')({
  component: () => <div>Hello /_authenticated/storage/productCards/new!</div>
})