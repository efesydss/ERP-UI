import { createFileRoute } from '@tanstack/react-router'
import { FinanceList } from '@/components/Hr/Finances/FinanceList'

export const Route = createFileRoute('/_authenticated/hr/finances/')({
  component: () => <FinanceList />
})
