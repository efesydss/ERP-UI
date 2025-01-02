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
import { Section } from '@/components/Admin/Section/types/typesSection'
import { Route } from '@/routes/_authenticated/admin/sections'
import { SectionForm } from '@/components/Admin/Section/SectionForm'
const initialSection: Section = {
  id: 0,
  name: ' ',
  employee: undefined,
  department: undefined,
  sectionType:undefined,

}
  export const SectionAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Section) =>
        apiRequest({
          endpoint: 'sectionAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Section Created')
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
    const onFormSubmit = async (values: Section) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:SectionAdd')} />
        <Container>
          <BaseForm
            initialValues={initialSection}
            onSubmit={onFormSubmit}
            component={<SectionForm />}
          />
        </Container>
      </>
    )
  }
