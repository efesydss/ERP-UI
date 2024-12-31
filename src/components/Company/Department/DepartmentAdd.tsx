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
import {Department} from '@/components/Company/Department/types/typesDepartment'
import {Route} from '@/routes/_authenticated/company/departments/'
import { DepartmentForm } from '@/components/Company/Department/DepartmentForm'
const initialDepartment: Department = {
  id: 0,
  name: '',
}
  export const DepartmentAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Department) =>
        apiRequest({
          endpoint: 'departmentAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Department Created')
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
    const onFormSubmit = async (values: Department) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:DepartmentAdd')} />
        <Container>
          <BaseForm
            initialValues={initialDepartment}
            onSubmit={onFormSubmit}
            component={<DepartmentForm />}
          />
        </Container>
      </>
    )
  }
