import { createFileRoute } from '@tanstack/react-router'
import { ProductCardList } from '@/components/Storage/ProductCard/ProductCardList'

export const Route = createFileRoute('/_authenticated/storage/productCards/')({
  component: () => <ProductCardList />
})