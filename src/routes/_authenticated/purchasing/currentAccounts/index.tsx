import { createFileRoute } from '@tanstack/react-router'
import { CurrentAccountList } from '@/components/Purchasing/CurrentAccount/CurrentAccountList'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccounts/')({
  component: () => <CurrentAccountList />
})