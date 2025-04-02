import { createFileRoute } from '@tanstack/react-router'
import { ServiceGroupList } from '@/components/Storage/ServiceGroup/ServiceGroupList'
export const Route = createFileRoute('/_authenticated/storage/serviceGroups/')({
  component: () => <ServiceGroupList />
})