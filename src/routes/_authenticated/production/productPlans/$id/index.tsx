import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/production/productPlans/$id/')({
  component: () => <div>Hello /_authenticated/production/productPlans/$id/!</div>
})