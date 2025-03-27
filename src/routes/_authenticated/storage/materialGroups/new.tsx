import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/materialGroups/new')({
  component: () => <Outlet />
})