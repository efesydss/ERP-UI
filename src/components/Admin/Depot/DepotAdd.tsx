import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/admin/depots'
import { useMutation } from '@tanstack/react-query'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { Container } from '@mui/material'
import { FormDepot } from '@/components/Admin/Depot/FormDepot'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { DepotResponse } from '@/components/Admin/Depot/typesDepot'
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'


const initialDepot: DepotResponse = {
  id: 1,
  name: ''
}

export const DepotAdd = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (values: DepotResponse) =>
      apiRequest({
        endpoint: 'depotAdd',
        payload: values
      }),

    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Depots Created')
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

  const onFormSubmit = async (values: DepotResponse) => {
    await mutateAsync({
      ...values

    })
    console.log('Payload: ', values)
  }


  return (
    <>
      <PageTitle title={t('common:depotAdd')} />
      <Container>
        <BaseForm
          initialValues={initialDepot}
          component={<FormDepot />}
          onSubmit={onFormSubmit}
        />
      </Container>
    </>
  )
}