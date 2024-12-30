import { createFileRoute } from '@tanstack/react-router'
import { SectionAdd } from '@/components/Admin/Section/SectionAdd'

export const Route = createFileRoute('/_authenticated/admin/sections/new')({
  component: () => <SectionAdd />
})