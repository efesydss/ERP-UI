import { createFileRoute } from '@tanstack/react-router'
import { MaterialCardForm } from '@/components/Storage/MaterialGroup/MaterialCardForm'

export const Route = createFileRoute('/_authenticated/storage/materialCards/new')({
  component: () => <MaterialCardForm />
})