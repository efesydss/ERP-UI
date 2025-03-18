import { createFileRoute } from '@tanstack/react-router'
import { DepotList } from '@/components/Admin/Depot/DepotList'

export const Route = createFileRoute('/_authenticated/admin/depots/')({
  component: () => <DepotList/>
})