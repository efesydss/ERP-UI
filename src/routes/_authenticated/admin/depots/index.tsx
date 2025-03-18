import { createFileRoute } from '@tanstack/react-router'
import { AdvancedDepotList } from '@/components/Admin/Depot/AdvancedDepotList'

export const Route = createFileRoute('/_authenticated/admin/depots/')({
  component: () => <AdvancedDepotList/>
})