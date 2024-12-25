import { createFileRoute } from '@tanstack/react-router'
import { UnitList } from '@/components/Storage/unit/UnitList'

export const Route = createFileRoute('/_authenticated/storage/unit/')({
  component: () => <UnitList />
})