import { createFileRoute } from '@tanstack/react-router'
import { ProposalsAdd } from '@/components/Sales/Proposals/ProposalsAdd'

export const Route = createFileRoute('/_authenticated/sales/proposals/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProposalsAdd/>
}
