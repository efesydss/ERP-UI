import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/additionalCosts/$id/')({
  component: () => <div>Hello /_authenticated/purchasing/additionalCosts/$id/!</div>
})