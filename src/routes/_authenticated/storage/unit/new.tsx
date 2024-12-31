import { createFileRoute } from '@tanstack/react-router'
import { UnitAdd } from '@/components/Storage/unit/UnitAdd'

export const Route = createFileRoute('/_authenticated/storage/unit/new')({
  component: () => <UnitAdd />
})