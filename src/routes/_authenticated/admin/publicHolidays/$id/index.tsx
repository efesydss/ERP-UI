import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/publicHolidays/$id/')({
  component: () => <div>Hello /_authenticated/admin/publicHolidays/$id/!</div>
})