import { Shelf } from '@/components/Storage/shelf/types/typesShelf'
import { apiRequest } from '@/utils/apiDefaults'
import { t } from 'i18next'
import { Route } from '@/routes/_authenticated/storage/shelf'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { Container } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { ShelfForm } from '@/components/Storage/shelf/ShelfForm'

const initialShelf: Shelf = {
  id: 0,
  name: ' ',
  description: ''
}
export const ShelfAdd = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (values: Shelf) =>
      apiRequest({
        endpoint: 'shelfAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success('Shelf Created')
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
  const onFormSubmit = async (values: Shelf) => {
    await mutateAsync({
      ...values
    })
    console.log('Payload: ', values)
  }
  return (
    <>
      <PageTitle title={t('common:ShelfAdd')} />
      <Container>
        <BaseForm
          initialValues={initialShelf}
          onSubmit={onFormSubmit}
          component={<ShelfForm />}
        />
      </Container>
    </>
  )

}