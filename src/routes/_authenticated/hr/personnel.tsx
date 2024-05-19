import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/personnel')({
  component: () => <div>Hello /_authenticated/hr/personnel!</div>
})