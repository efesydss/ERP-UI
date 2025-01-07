import { createFileRoute } from '@tanstack/react-router'
import { InvoiceList } from '@/components/Purchasing/Invoice/InvoiceList'

export const Route = createFileRoute('/_authenticated/purchasing/invoices/')({
  component: () => <InvoiceList />
})