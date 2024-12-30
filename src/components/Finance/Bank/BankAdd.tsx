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
import {Bank} from '@/components/Finance/Bank/types/typesBank'
import {Route} from '@/routes/_authenticated/finance/banks/'
import { BankForm } from '@/components/Finance/Bank/BankForm'
const initialBank: Bank = {
  id: 0,
  bankName: '',
  bankShortName: '',
  swiftCode: '',
}
  export const BankAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Bank) =>
        apiRequest({
          endpoint: 'bankAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Bank Created')
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
    const onFormSubmit = async (values: Bank) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:BankAdd')} />
        <Container>
          <BaseForm
            initialValues={initialBank}
            onSubmit={onFormSubmit}
            component={<BankForm />}
          />
        </Container>
      </>
    )
  }
