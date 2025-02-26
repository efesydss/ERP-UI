import { createFileRoute } from '@tanstack/react-router'
import { MaterialGroupForm } from '@/components/Storage/MaterialGroup/MaterialGroupForm'

export const Route = createFileRoute('/_authenticated/storage/materialGroups/new')({
  component: () => <MaterialGroupForm />
})