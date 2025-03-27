import { createFileRoute } from '@tanstack/react-router'
import { MaterialCardList } from '@/components/Storage/MaterialCard/MaterialCardList'

export const Route = createFileRoute('/_authenticated/storage/materialCards/')({
  component: () => <MaterialCardList />
})