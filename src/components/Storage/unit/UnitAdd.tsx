import { Unit } from '@/components/Storage/unit/types/typesUnit'
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { Route } from '@/routes/_authenticated/storage/unit'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { UnitForm } from '@/components/Storage/unit/UnitForm'

const initialUnit: Unit = {
  id: 0,
  name: ' ',
}
export const UnitAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: Unit) =>
      apiRequest({
        endpoint: 'unitAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Unit Created')
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
  const onFormSubmit = async (values: Unit) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:UnitAdd')} />
      <Container>
        <BaseForm
          initialValues={initialUnit}
          onSubmit={onFormSubmit}
          component={<UnitForm />}//todo ef create
        />
      </Container>
    </>
  )

}