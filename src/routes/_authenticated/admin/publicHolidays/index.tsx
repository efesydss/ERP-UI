import { createFileRoute } from '@tanstack/react-router'
import { PublicHolidayList } from '@/components/Admin/PublicHoliday/PublicHolidayList'

export const Route = createFileRoute('/_authenticated/admin/publicHolidays/')({
  component: () => <PublicHolidayList />
})