import { createFileRoute } from '@tanstack/react-router'
import {
  CurrentAccountBankAccountAdd
} from '@/components/Purchasing/CurrentAccountBankAccount/CurrentAccountBankAccountAdd'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountBankAccounts/new')({
  component: () => <CurrentAccountBankAccountAdd />
})