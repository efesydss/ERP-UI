import { createFileRoute } from '@tanstack/react-router'
import { PaymentMethodList } from '@/components/Admin/PaymentMethod/PaymentMethodList'

export const Route = createFileRoute('/_authenticated/admin/paymentMethods/')({
  component: () => <PaymentMethodList />
})