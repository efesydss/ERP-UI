import { createFileRoute } from '@tanstack/react-router'
import { AssignmentTransactionList } from '@/components/Storage/assignmentTransaction/AssignmentTransactionList'
export const Route = createFileRoute('/_authenticated/storage/assignmentTransactions/')({
  component: () => <AssignmentTransactionList/>
})