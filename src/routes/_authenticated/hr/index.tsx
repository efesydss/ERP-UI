import { createFileRoute } from '@tanstack/react-router'
import { MdConstruction } from 'react-icons/md'

export const Route = createFileRoute('/_authenticated/hr/')({
  component: () => <MdConstruction />
})
