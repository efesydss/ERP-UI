import { createFileRoute } from '@tanstack/react-router'
import { AdditionalCostAdd } from '@/components/Purchasing/AdditionalCost/AdditionalCostAdd'

export const Route = createFileRoute('/_authenticated/purchasing/additionalCosts/new')({
  component: () => <AdditionalCostAdd />
})