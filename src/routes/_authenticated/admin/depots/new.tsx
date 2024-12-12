import { createFileRoute } from '@tanstack/react-router'
import { DepotAdd } from '@/components/Admin/Depot/DepotAdd'

export const Route = createFileRoute('/_authenticated/admin/depots/new')({
  component: () => <DepotAdd/>
})

