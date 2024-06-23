import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.app.user) {
      throw redirect({
        to: '/login'
      })
    }

    throw redirect({
      to: '/dashboard'
    })
  }
})
