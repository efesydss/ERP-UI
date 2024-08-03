import { createFileRoute } from '@tanstack/react-router'
import { VacationAdd } from '@/components/Hr/Vacations/VacationAdd'

export const Route = createFileRoute('/_authenticated/hr/vacations/new')({
  component: () => <VacationAdd />
})
