import React from 'react';
import { TestComponent } from './types/typesTestComponent';
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { TestComponentForm } from '@/components/Admin/TestComponent/TestComponentForm'

const initialTestComponent: TestComponent = {
  id: 0,
  
}
  export const TestComponentAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: TestComponent) =>
        apiRequest({
          endpoint: 'TestComponentAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('TestComponent Created')
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
    const onFormSubmit = async (values: TestComponent) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:TestComponentAdd')} />
        <Container>
          <BaseForm
            initialValues={initialTestComponent}
            onSubmit={onFormSubmit}
            component={<TestComponentForm />}
          />
        </Container>
      </>
    )
  }
