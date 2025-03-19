import { createFileRoute } from '@tanstack/react-router'
import { PurchaseOrderList } from '@/components/Purchasing/PurchaseOrder/PurchaseOrderList'

export const Route = createFileRoute('/_authenticated/purchasing/purchaseOrders/')({
  component: () => <PurchaseOrderList />
})