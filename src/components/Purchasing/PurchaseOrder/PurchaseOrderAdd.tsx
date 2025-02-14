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
import { PurchaseOrder } from '@/components/Purchasing/PurchaseOrder/types/typesPurchaseOrder'
import { Route } from '@/routes/_authenticated/purchasing/purchaseOrders'
import { PurchaseOrderForm } from '@/components/Purchasing/PurchaseOrder/PurchaseOrderForm'

const initialPurchaseOrder: PurchaseOrder = {
  id: 0,
  date: '',
  name: '',
  employee: undefined,
  description: '',
  project: undefined,
  currentAccount: undefined,
  purchaseOrderItems: []
}
export const PurchaseOrderAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: PurchaseOrder) =>
      apiRequest({
        endpoint: 'purchaseOrderAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('PurchaseOrder Created')
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
  const onFormSubmit = async (values: PurchaseOrder) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:PurchaseOrderAdd')} />
      <Container>
        <BaseForm
          initialValues={initialPurchaseOrder}
          onSubmit={onFormSubmit}
          component={<PurchaseOrderForm />}
        />
      </Container>
    </>
  )
}
