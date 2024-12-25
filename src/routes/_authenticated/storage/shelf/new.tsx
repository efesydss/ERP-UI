import { createFileRoute } from '@tanstack/react-router'
import { ShelfAdd } from '@/components/Storage/shelf/ShelfAdd'

export const Route = createFileRoute('/_authenticated/storage/shelf/new')({
  component: () => <ShelfAdd />
})