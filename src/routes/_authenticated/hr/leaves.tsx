import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/leaves')({
  component: () => <div>Hello /_authenticated/hr/leaves!</div>
})