import { createFileRoute } from '@tanstack/react-router'
import { AssignmentTransactionAdd } from '@/components/Storage/assignmentTransaction/AssignmentTransactionAdd'
export const Route = createFileRoute('/_authenticated/storage/assignmentTransactions/new')({
  component: () => <AssignmentTransactionAdd/>
})