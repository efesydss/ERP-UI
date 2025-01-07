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
import {
  CurrentAccountTransactionForm
} from '@/components/Purchasing/CurrentAccountTransaction/CurrentAccountTransactionForm'
import {
  CurrentAccountTransaction
} from '@/components/Purchasing/CurrentAccountTransaction/types/typesCurrentAccountTransaction'
import { Route } from '@/routes/_authenticated/purchasing/currentAccountTransactions/'

const initialCurrentAccountTransaction: CurrentAccountTransaction = {
  id: 0,
  date: '',
  currentAccount: undefined,
  description: '',
  transactionType: undefined,
  paymentType: undefined,
  bankAccount: undefined,
  transactionFee: 0,
  debtType: undefined,
  amount: 0,
  currency: undefined
}
export const CurrentAccountTransactionAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: CurrentAccountTransaction) =>
      apiRequest({
        endpoint: 'currentAccountTransactionAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Current Account Transaction Created')
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
  const onFormSubmit = async (values: CurrentAccountTransaction) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:CurrentAccountTransactionAdd')} />
      <Container>
        <BaseForm
          initialValues={initialCurrentAccountTransaction}
          onSubmit={onFormSubmit}
          component={<CurrentAccountTransactionForm />}
        />
      </Container>
    </>
  )
}
