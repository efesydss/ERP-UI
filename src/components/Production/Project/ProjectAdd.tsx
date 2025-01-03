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
import {Project} from '@/components/Production/Project/types/typesProject'
import {Route} from '@/routes/_authenticated/production/projects/'
import { ProjectForm } from '@/components/Production/Project/ProjectForm'
const initialProject: Project = {
  id: 0,
  name: '',
  code: '',
  currentAccount:undefined,
  employee:undefined,

}
  export const ProjectAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: Project) =>
        apiRequest({
          endpoint: 'projectAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('Project Created')
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
    const onFormSubmit = async (values: Project) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:ProjectAdd')} />
        <Container>
          <BaseForm
            initialValues={initialProject}
            onSubmit={onFormSubmit}
            component={<ProjectForm />}
          />
        </Container>
      </>
    )
  }
