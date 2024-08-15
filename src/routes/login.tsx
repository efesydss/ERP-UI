import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/components/Auth/Login'
import { z } from 'zod'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional()
  })
}).update({
  component: Login
})
