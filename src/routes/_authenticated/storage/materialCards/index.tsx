import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialCards/')({
  component: () => <Outlet />
})