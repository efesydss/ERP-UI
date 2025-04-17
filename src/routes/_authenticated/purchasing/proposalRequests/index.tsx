import { ProposaRequestList } from '@/components/Purchasing/ProposalRequest/ProposalRequestList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/purchasing/proposalRequests/')({
  component: () => <ProposaRequestList />
})