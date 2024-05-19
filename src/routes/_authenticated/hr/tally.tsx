import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/tally')({
  component: () => <div>Hello /_authenticated/hr/tally!</div>
})