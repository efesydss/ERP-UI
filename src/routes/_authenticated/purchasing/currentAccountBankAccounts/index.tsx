import { createFileRoute } from '@tanstack/react-router'
import {
  CurrentAccountBankAccountList
} from '@/components/Purchasing/CurrentAccountBankAccount/CurrentAccountBankAccountList'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccountBankAccounts/')({
  component: () => <CurrentAccountBankAccountList />
})