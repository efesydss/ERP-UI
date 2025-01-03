import { createFileRoute } from '@tanstack/react-router'
import {
  CurrentAccountTransactionAdd
} from '@/components/Purchasing/CurrentAccountTransaction/CurrentAccountTransactionAdd'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountTransactions/new')({
  component: () => <CurrentAccountTransactionAdd />
})