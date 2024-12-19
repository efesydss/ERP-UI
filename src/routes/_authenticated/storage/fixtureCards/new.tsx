import { createFileRoute } from '@tanstack/react-router'
import MaterialGroupTable from '@/components/Storage/fixtureCard/MaterialGroupTable'

export const Route = createFileRoute('/_authenticated/storage/fixtureCards/new')({
  component: () => <MaterialGroupTable/>
})