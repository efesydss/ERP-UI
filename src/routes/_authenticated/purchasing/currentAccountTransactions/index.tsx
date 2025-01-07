import { createFileRoute } from '@tanstack/react-router'
import {
  CurrentAccountTransactionList
} from '@/components/Purchasing/CurrentAccountTransaction/CurrentAccountTransactionList'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountTransactions/')({
  component: () => <CurrentAccountTransactionList />
})