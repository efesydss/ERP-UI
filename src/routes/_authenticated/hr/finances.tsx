import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/finances')({
  component: () => <div>Hello /_authenticated/hr/finances!</div>
})