import { createFileRoute } from '@tanstack/react-router'
import { PurchaseOrderAdd } from '@/components/Purchasing/PurchaseOrder/PurchaseOrderAdd'

export const Route = createFileRoute('/_authenticated/purchasing/purchaseOrders/new')({
  component: () => <PurchaseOrderAdd />
})