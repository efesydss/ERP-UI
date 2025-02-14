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
import { MaterialGroupForm } from '@/components/Storage/MaterialGroup/MaterialGroupForm'
import { MaterialGroup } from '@/components/Storage/MaterialGroup/types/typesMaterialGroup'
import { Route } from '@/routes/_authenticated/storage/materialGroups'
const initialMaterialGroup: MaterialGroup = {
  id: 0,
  
}
  export const MaterialGroupAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: MaterialGroup) =>
        apiRequest({
          endpoint: 'materialGroupAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('MaterialGroup Created')
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
    const onFormSubmit = async (values: MaterialGroup) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:MaterialGroupAdd')} />
        <Container>
          <BaseForm
            initialValues={initialMaterialGroup}
            onSubmit={onFormSubmit}
            component={<MaterialGroupForm />}
          />
        </Container>
      </>
    )
  }
