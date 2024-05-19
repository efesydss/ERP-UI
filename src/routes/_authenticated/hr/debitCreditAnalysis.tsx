import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/hr/debitCreditAnalysis')({
  component: () => <div>Hello /_authenticated/hr/debitCreditAnalysis!</div>
})