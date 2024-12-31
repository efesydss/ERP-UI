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
import { BranchForm } from '@/components/Company/Branch/BranchForm'
import { Branch } from '@/components/Company/Branch/types/typesBranch'
import { Route } from '@/routes/_authenticated/company/branches/'
const initialBranch: Branch = {
  id: 0,
  name: ' ',
  
}
  export const BranchAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Branch) =>
        apiRequest({
          endpoint: 'branchAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Branch Created')
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
    const onFormSubmit = async (values: Branch) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:branchAdd')} />
        <Container>
          <BaseForm
            initialValues={initialBranch}
            onSubmit={onFormSubmit}
            component={<BranchForm />}
          />
        </Container>
      </>
    )
  }