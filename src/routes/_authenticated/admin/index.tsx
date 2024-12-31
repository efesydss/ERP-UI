import { MdConstruction } from 'react-icons/md'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: () => <MdConstruction />
})