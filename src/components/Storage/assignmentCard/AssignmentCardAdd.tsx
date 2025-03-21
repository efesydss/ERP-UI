import {
  AssignmentCard,
  WarrantyPeriodEnum,
  MaintenancePeriodEnum,
  AssignmentStatusEnum
} from '@/components/Storage/assignmentCard/types/typesAssignmentCard'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Route } from '@/routes/_authenticated/storage/assignmentCards'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import { apiRequest } from '@/utils/apiDefaults'
import { AxiosError } from 'axios'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { Container } from '@mui/material'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { AssignmentCardForm } from '@/components/Storage/assignmentCard/AssignmentCardForm'


const initialAssignmentCard: AssignmentCard = {
  id: 0,
  assignmentStatusEnum: AssignmentStatusEnum.ASSIGNED,
  code: '',
  name: '',
  fixtureCard: undefined,
  insuranceCompany: '',
  insurance: false,
  insurancePolicyNo: '',
  insuranceDuration: 0,
  info: '',
  invoice: undefined,
  warrantyPeriodEnum: WarrantyPeriodEnum.DAY,
  warrantyDay: 0,
  underMaintenance: false,
  maintenanceDuration: 0,
  maintenancePeriodEnum: MaintenancePeriodEnum.DAY
}
export const AssignmentCardAdd = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (values: AssignmentCard) =>
      apiRequest({
        endpoint: 'assignmentCardAdd',
        payload: values
      }),
    onSuccess: () => {
      navigate({ to: Route.fullPath })
      toast.success(t('AssignmentCardAdd successfully added successfully!'))
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
  const onFormSubmit = async (values: AssignmentCard) => {
    await mutateAsync({
      ...values

    })
    console.log('Payload: ', values)
  }

  return (
    <>
      <PageTitle title={t('common:assignmentCardAdd')} />
      <Container>
        <BaseForm
          initialValues={initialAssignmentCard}
          component={<AssignmentCardForm />}
          onSubmit={onFormSubmit}
        />
      </Container>
    </>
  )

}

