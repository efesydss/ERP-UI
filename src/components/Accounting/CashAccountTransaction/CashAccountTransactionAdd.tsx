import React from 'react';
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'

const initialCashAccountTransaction: CashAccountTransaction = {
  id: 0,
  
}
  export const CashAccountTransactionAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: CashAccountTransaction) =>
        apiRequest({
          endpoint: 'CashAccountTransactionAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('CashAccountTransaction Created')
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
    const onFormSubmit = async (values: CashAccountTransaction) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:CashAccountTransactionAdd')} />
        <Container>
          <BaseForm
            initialValues={initialCashAccountTransaction}
            onSubmit={onFormSubmit}
            component={<CashAccountTransactionForm />}
          />
        </Container>
      </>
    )
  }
