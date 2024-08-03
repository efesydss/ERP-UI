import { createFileRoute } from '@tanstack/react-router'
import { VacationList } from '@/components/Hr/Vacations/VacationList'

export const Route = createFileRoute('/_authenticated/hr/vacations/')({
  component: () => <VacationList />
})
