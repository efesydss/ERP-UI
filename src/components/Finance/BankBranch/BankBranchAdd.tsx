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
import { BankBranchForm } from '@/components/Finance/BankBranch/BankBranchForm'
import { BankBranch } from '@/components/Finance/BankBranch/types/typesBankBranch'
import { Route } from '@/routes/_authenticated/finance/bankBranches/'
const initialBankBranch: BankBranch = {
  id: 0,
  bank: undefined,
  name: '',
  relatedEmployee: '',
}
  export const BankBranchAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: BankBranch) =>
        apiRequest({
          endpoint: 'bankBranchAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('BankBranch Created')
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
    const onFormSubmit = async (values: BankBranch) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:BankBranchAdd')} />
        <Container>
          <BaseForm
            initialValues={initialBankBranch}
            onSubmit={onFormSubmit}
            component={<BankBranchForm />}
          />
        </Container>
      </>
    )
  }
