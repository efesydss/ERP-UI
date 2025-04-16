import DepotTransactionList from '@/components/Storage/depotTransaction/DepotTransactionList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/storage/depotTransactions/')({
  component: () => <DepotTransactionList />
})