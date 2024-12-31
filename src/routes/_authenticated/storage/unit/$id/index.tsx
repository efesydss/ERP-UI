import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/unit/$id/')({
  component: () => <div>Hello /_authenticated/storage/unit/$id/!</div>
})