import { createFileRoute } from '@tanstack/react-router'
import { LoginComponent } from '@/components/Auth/LoginComponent'
import { z } from 'zod'

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional()
  })
}).update({
  component: LoginComponent
})
