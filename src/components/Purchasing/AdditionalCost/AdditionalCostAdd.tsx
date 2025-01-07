import React from 'react'
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { AdditionalCostForm } from '@/components/Purchasing/AdditionalCost/AdditionalCostForm'
import { AdditionalCost } from '@/components/Purchasing/AdditionalCost/types/typesAdditionalCost'
import { Route } from '@/routes/_authenticated/purchasing/additionalCosts/'

const initialAdditionalCost: AdditionalCost = {
  id: 0,
  code: '',
  description: '',
  unit: undefined,
  specialCode: ''

}
export const AdditionalCostAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: AdditionalCost) =>
      apiRequest({
        endpoint: 'additionalCostAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('AdditionalCost Created')
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
  const onFormSubmit = async (values: AdditionalCost) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:AdditionalCostAdd')} />
      <Container>
        <BaseForm
          initialValues={initialAdditionalCost}
          onSubmit={onFormSubmit}
          component={<AdditionalCostForm />}
        />
      </Container>
    </>
  )
}
