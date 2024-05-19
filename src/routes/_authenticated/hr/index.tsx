import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/')({
  component: () => <div>Hello /_authenticated/hr/!</div>
})