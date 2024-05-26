import { createFileRoute } from '@tanstack/react-router'
import { PersonnelList } from '@/components/Hr/Personnel/PersonnelList'

export const Route = createFileRoute('/_authenticated/hr/personnel/')({
  component: () => <PersonnelList />
})
