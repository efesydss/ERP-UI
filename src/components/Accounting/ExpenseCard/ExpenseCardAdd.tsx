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
import {ExpenseCard} from '@/components/Accounting/ExpenseCard/types/typesExpenseCard'
import {Route} from '@/routes/_authenticated/accounting/expenseCards'
import { ExpenseCardForm } from '@/components/Accounting/ExpenseCard/ExpenseCardForm'
const initialExpenseCard: ExpenseCard = {
  id: 0,
  code: ' ',
  description: ' ',
  unit: undefined,
}
  export const ExpenseCardAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: ExpenseCard) =>
        apiRequest({
          endpoint: 'expenseCardAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('ExpenseCard Created')
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
    const onFormSubmit = async (values: ExpenseCard) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:ExpenseCardAdd')} />
        <Container>
          <BaseForm
            initialValues={initialExpenseCard}
            onSubmit={onFormSubmit}
            component={<ExpenseCardForm />}
          />
        </Container>
      </>
    )
  }
