import { createFileRoute } from '@tanstack/react-router'
import { PaymentMethodAdd } from '@/components/Admin/PaymentMethod/PaymentMethodAdd'

export const Route = createFileRoute('/_authenticated/admin/paymentMethods/new')({
  component: () => <PaymentMethodAdd />
})