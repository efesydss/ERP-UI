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
import {BankAccount} from '@/components/Finance/BankAccount/types/typesBankAccount'
import {Route} from '@/routes/_authenticated/finance/bankAccounts/'
import { BankAccountForm } from '@/components/Finance/BankAccount/BankAccountForm'

const initialBankAccount: BankAccount = {
  id: 0,
  accountNumber: '',
  iban: '',
  currency: undefined,
}
  export const BankAccountAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: BankAccount) =>
        apiRequest({
          endpoint: 'bankAccountAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('BankAccount Created')
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
    const onFormSubmit = async (values: BankAccount) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:BankAccountAdd')} />
        <Container>
          <BaseForm
            initialValues={initialBankAccount}
            onSubmit={onFormSubmit}
            component={<BankAccountForm />}
          />
        </Container>
      </>
    )
  }
