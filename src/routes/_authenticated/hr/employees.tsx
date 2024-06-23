import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/employees')({
  beforeLoad: () => {
    return {
      crumb: 'Personel Listesi'
    }
  },
  component: () => <Outlet />
})
