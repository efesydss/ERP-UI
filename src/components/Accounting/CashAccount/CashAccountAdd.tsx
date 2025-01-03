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
import {CashAccount} from '@/components/Accounting/CashAccount/types/typesCashAccount'
import {Route} from '@/routes/_authenticated/accounting/cashAccounts/'
import { CashAccountForm } from '@/components/Accounting/CashAccount/CashAccountForm'
const initialCashAccount: CashAccount = {
  id: 0,
  code: '',
  name: '',
  currency: '',
}
  export const CashAccountAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: CashAccount) =>
        apiRequest({
          endpoint: 'cashAccountAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('CashAccount Created')
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
    const onFormSubmit = async (values: CashAccount) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:CashAccountAdd')} />
        <Container>
          <BaseForm
            initialValues={initialCashAccount}
            onSubmit={onFormSubmit}
            component={<CashAccountForm />}
          />
        </Container>
      </>
    )
  }
