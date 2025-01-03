import { createFileRoute } from '@tanstack/react-router'
import { AdditionalCostList } from '@/components/Purchasing/AdditionalCost/AdditionalCostList'

export const Route = createFileRoute('/_authenticated/purchasing/additionalCosts/')({
  component: () => <AdditionalCostList />
})