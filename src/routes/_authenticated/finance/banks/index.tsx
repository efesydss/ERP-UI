import { createFileRoute } from '@tanstack/react-router'
import { BankList } from '@/components/Finance/Bank/BankList'

export const Route = createFileRoute('/_authenticated/finance/banks/')({
  component: () => <BankList />,
})