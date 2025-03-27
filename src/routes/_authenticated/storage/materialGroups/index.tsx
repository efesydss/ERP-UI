import { createFileRoute } from '@tanstack/react-router'
import { MaterialGroupList } from '@/components/Storage/MaterialGroup/MaterialGroupList'

export const Route = createFileRoute('/_authenticated/storage/materialGroups/')({
  component: () => <MaterialGroupList />
})