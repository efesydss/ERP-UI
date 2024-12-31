import { createFileRoute } from '@tanstack/react-router'
import { SectionList } from '@/components/Admin/Section/SectionList'

export const Route = createFileRoute('/_authenticated/admin/sections/')({
  component: () => <SectionList />
})