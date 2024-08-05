import { Container } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/tally')({
  component: () => (
    <Container>
      <Outlet />
    </Container>
  )
})
