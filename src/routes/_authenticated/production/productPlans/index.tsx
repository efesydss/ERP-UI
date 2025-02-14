import { createFileRoute } from '@tanstack/react-router'
import { ProductPlanList } from '@/components/Production/ProductPlan/ProductPlanList'

export const Route = createFileRoute('/_authenticated/production/productPlans/')({
  component: () => <ProductPlanList />,
})