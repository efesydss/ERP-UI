import { createFileRoute } from '@tanstack/react-router'
import { PersonnelDetail } from '@/components/Hr/Personnel/PersonnelDetail'

export const Route = createFileRoute('/_authenticated/hr/personnel/add')({
  component: () => <PersonnelDetail />
})
