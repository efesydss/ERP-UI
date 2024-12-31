import { createFileRoute } from '@tanstack/react-router'
import { ShelfList } from '@/components/Storage/shelf/ShelfList'

export const Route = createFileRoute('/_authenticated/storage/shelf/')({
  component: () => <ShelfList />
})