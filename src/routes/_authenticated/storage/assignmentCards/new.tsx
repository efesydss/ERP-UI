import { createFileRoute } from '@tanstack/react-router'
import { AssignmentCardAdd } from '@/components/Storage/assignmentCard/AssignmentCardAdd'

export const Route = createFileRoute('/_authenticated/storage/assignmentCards/new')({
  component: () => <AssignmentCardAdd/>
})