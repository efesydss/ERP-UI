import { createFileRoute } from '@tanstack/react-router'
import { CurrentAccountAdd } from '@/components/Purchasing/CurrentAccount/CurrentAccountAdd'

export const Route = createFileRoute('/_authenticated/purchasing/currentAccounts/new')({
  component: () => <CurrentAccountAdd />
})