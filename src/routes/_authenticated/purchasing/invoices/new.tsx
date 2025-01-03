import { createFileRoute } from '@tanstack/react-router'
import { InvoiceAdd } from '@/components/Purchasing/Invoice/InvoiceAdd'

export const Route = createFileRoute('/_authenticated/purchasing/invoices/new')({
  component: () => <InvoiceAdd />
})