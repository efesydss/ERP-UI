import { createFileRoute } from '@tanstack/react-router'
import { ServiceCardList } from '@/components/Storage/ServiceCard/ServiceCardList'
export const Route = createFileRoute('/_authenticated/storage/serviceCards/')({
  component: () => <ServiceCardList />
})