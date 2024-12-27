import { createFileRoute } from '@tanstack/react-router'
import { SectionForm } from '@/components/Admin/Section/SectionForm'

export const Route = createFileRoute('/_authenticated/admin/sections/new')({
  component: () => <SectionForm />
})