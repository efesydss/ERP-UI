import { createFileRoute } from '@tanstack/react-router'
import { ProjectAdd } from '@/components/Production/Project/ProjectAdd'

export const Route = createFileRoute('/_authenticated/production/projects/new')({
  component: () => <ProjectAdd />
})