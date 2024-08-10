import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'

export const Route = createFileRoute('/_authenticated/hr/timekeeping')({
  component: () => (
    <Container>
      <Outlet />
    </Container>
  )
})
