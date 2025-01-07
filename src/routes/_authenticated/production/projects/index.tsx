import { createFileRoute } from '@tanstack/react-router'
import { ProjectList } from '@/components/Production/Project/ProjectList'

export const Route = createFileRoute('/_authenticated/production/projects/')({
  component: () => <ProjectList />
})