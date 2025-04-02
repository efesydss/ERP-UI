import { createFileRoute } from '@tanstack/react-router'
import { ProductGroupList } from '@/components/Storage/ProductGroup/ProductGroupList'
export const Route = createFileRoute('/_authenticated/storage/productGroups/')({
  component: () => <ProductGroupList />
})