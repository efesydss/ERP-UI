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
import { Role } from '@/components/Admin/Role/types/typesRole'
import { Route } from '@/routes/_authenticated/admin/roles'
import { RoleForm } from '@/components/Admin/Role/RoleForm'

const initialRole: Role = {
  id: 0,
  name: '',
}
  export const RoleAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Role) =>
        apiRequest({
          endpoint: 'roleAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Role Created')
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
    const onFormSubmit = async (values: Role) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:RoleAdd')} />
        <Container>
          <BaseForm
            initialValues={initialRole}
            onSubmit={onFormSubmit}
            component={<RoleForm />}
          />
        </Container>
      </>
    )
  }
