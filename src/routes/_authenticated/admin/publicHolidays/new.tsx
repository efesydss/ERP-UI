import { createFileRoute } from '@tanstack/react-router'
import { PublicHolidayAdd } from '@/components/Admin/PublicHoliday/PublicHolidayAdd'

export const Route = createFileRoute('/_authenticated/admin/publicHolidays/new')({
  component: () => <PublicHolidayAdd />
})