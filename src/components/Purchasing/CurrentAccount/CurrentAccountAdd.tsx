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
import {CurrentAccount} from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount'
import {Route} from '@/routes/_authenticated/purchasing/currentAccounts/'
import { CurrentAccountForm } from '@/components/Purchasing/CurrentAccount/CurrentAccountForm'
const initialCurrentAccount: CurrentAccount = {
  id: 0,
  code: 'Code',
  title: 'Title',
  active: true,
  sector: undefined,
  contactInformation:undefined,
  bankAccount:undefined,
  currentAccountBankAccounts:undefined,
}
  export const CurrentAccountAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: CurrentAccount) =>
        apiRequest({
          endpoint: 'currentAccountAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('CurrentAccount Created')
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
    const onFormSubmit = async (values: CurrentAccount) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:CurrentAccountAdd')} />
        <Container>
          <BaseForm
            initialValues={initialCurrentAccount}
            onSubmit={onFormSubmit}
            component={<CurrentAccountForm />}
          />
        </Container>
      </>
    )
  }
