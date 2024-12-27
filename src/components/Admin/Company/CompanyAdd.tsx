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
import { Company } from '@/components/Admin/Company/types/typesCompany'
import { Route } from '@/routes/_authenticated/admin/companies'
import { CompanyForm } from '@/components/Admin/Company/CompanyForm'
const initialCompany: Company = {
  id: 0,
  code: '',
  title: '',
  address: '',
  phone: '',
  phoneBackup: '',
  taxAdmin: '',
  taxNumber: '',
  branch: { id: 0, name: 'initial branch' }
}
  export const CompanyAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Company) =>
        apiRequest({
          endpoint: 'companyAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Company Created')
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
    const onFormSubmit = async (values: Company) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:CompanyAdd')} />
        <Container>
          <BaseForm
            initialValues={initialCompany}
            onSubmit={onFormSubmit}
            component={<CompanyForm />}
          />
        </Container>
      </>
    )
  }
