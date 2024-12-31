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
import { PaymentMethod } from '@/components/Admin/PaymentMethod/types/typesPaymentMethod'
import { Route } from '@/routes/_authenticated/admin/paymentMethods'
import { PaymentMethodForm } from '@/components/Admin/PaymentMethod/PaymentMethodForm'

const initialPaymentMethod: PaymentMethod = {
  id: 0,
  code: '',
  name: ''
}
export const PaymentMethodAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: PaymentMethod) =>
      apiRequest({
        endpoint: 'paymentMethodAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('PaymentMethod Created')
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
  const onFormSubmit = async (values: PaymentMethod) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:PaymentMethodAdd')} />
      <Container>
        <BaseForm
          initialValues={initialPaymentMethod}
          onSubmit={onFormSubmit}
          component={<PaymentMethodForm />}
        />
      </Container>
    </>
  )
}
