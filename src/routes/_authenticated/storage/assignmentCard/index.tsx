import { createFileRoute } from '@tanstack/react-router'
import { AssignmentCardList } from '@/components/Storage/assignmentCard/AssignmentCardList'

export const Route = createFileRoute('/_authenticated/storage/assignmentCard/')({
  component: () => <AssignmentCardList/>
})