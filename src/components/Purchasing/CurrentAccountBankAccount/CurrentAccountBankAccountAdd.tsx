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
import { Route } from '@/routes/_authenticated/purchasing/currentAccountBankAccounts/'
import {CurrentAccountBankAccount} from '@/components/Purchasing/CurrentAccountBankAccount/types/typesCurrentAccountBankAccount'
import {
  CurrentAccountBankAccountForm
} from '@/components/Purchasing/CurrentAccountBankAccount/CurrentAccountBankAccountForm'
const initialCurrentAccountBankAccount: CurrentAccountBankAccount = {
  id: 0,
  currentAccount: undefined,
  bank: undefined,
  branch: undefined,
  accountNumber: '',
  iban: '',
  currency:undefined,
}
  export const CurrentAccountBankAccountAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: CurrentAccountBankAccount) =>
        apiRequest({
          endpoint: 'currentAccountBankAccountAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('CurrentAccountBankAccount Created')
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
    const onFormSubmit = async (values: CurrentAccountBankAccount) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:CurrentAccountBankAccountAdd')} />
        <Container>
          <BaseForm
            initialValues={initialCurrentAccountBankAccount}
            onSubmit={onFormSubmit}
            component={<CurrentAccountBankAccountForm />}
          />
        </Container>
      </>
    )
  }
