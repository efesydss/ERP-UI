import React from 'react'
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { InvoiceForm } from '@/components/Purchasing/Invoice/InvoiceForm'
import { Invoice } from '@/components/Purchasing/Invoice/types/typesInvoice'
import { Route } from '@/routes/_authenticated/purchasing/invoices/'

const initialInvoice: Invoice = {
  id: 0,
  code: '',
  date: '',
  warehouseBranch: undefined,
  specialCode: '',
  currency: undefined,
  fixedCurrency: false,
  fixedCurrencyValue: 0,
  invoiceItems: undefined,
  generalDiscount: 0,
  unitDiscount: 0,
  totalVat: 0,
  totalAdditionalCosts: 0,
  subTotal: 0,
  finalTotal: 0,
  invoiceTypeEnum: undefined
}
export const InvoiceAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: Invoice) =>
      apiRequest({
        endpoint: 'invoiceAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Invoice Created')
    },
    onError: (
      err: AxiosError<{
        err?: string
      }>
    ) => {
      if (err.response?.status === 409) {
        console.log(err.response)
        toast.error('exist')
      } else {
        toast.error('error')
      }
    }
  })
  const onFormSubmit = async (values: Invoice) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:InvoiceAdd')} />
      <Container>
        <BaseForm
          initialValues={initialInvoice}
          onSubmit={onFormSubmit}
          component={<InvoiceForm />}
        />
      </Container>
    </>
  )
}
