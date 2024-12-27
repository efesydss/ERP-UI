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
import { Route } from '@/routes/_authenticated/admin/publicHolidays'
import { PublicHoliday } from '@/components/Admin/PublicHoliday/types/typesPublicHoliday'
import { PublicHolidayForm } from '@/components/Admin/PublicHoliday/PublicHolidayForm'
const initialPublicHoliday: PublicHoliday = {
  id: 0,
  year: 2025,
  startDate: "2024-12-27",
  endDate: "2024-12-27",
  description: "Fatih Sultan Mehmet Street"
}
  export const PublicHolidayAdd = () => {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
      mutationFn: (values: PublicHoliday) =>
        apiRequest({
          endpoint: 'publicHolidayAdd',
          payload: values
        }),
      onSuccess: () => {
        navigate({ to: Route.fullPath })
        toast.success('PublicHoliday Created')
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
    const onFormSubmit = async (values: PublicHoliday) => {
      await mutateAsync({
        ...values
      })
      console.log('Payload: ', values)
    }
    return (
      <>
        <PageTitle title={t('common:PublicHolidayAdd')} />
        <Container>
          <BaseForm
            initialValues={initialPublicHoliday}
            onSubmit={onFormSubmit}
            component={<PublicHolidayForm />}
          />
        </Container>
      </>
    )
  }
