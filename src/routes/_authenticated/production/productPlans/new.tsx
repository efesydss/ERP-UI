import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/production/productPlans/new')({
  component: () => <div>Hello /_authenticated/production/productPlans/new!</div>
})