import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/depots/new')({
  component: () => <DepotAdd/>//todo ef: Depot Add Formu kodlamak ..
})