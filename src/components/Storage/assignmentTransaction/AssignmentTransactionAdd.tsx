import { AssignmentStatusEnum } from '@/components/Storage/typesEnums'
import { useMutation } from '@tanstack/react-query'
import { AssignmentTransaction  } from '@/components/Storage/assignmentTransaction/types/typesAssignmentTransaction'
import { toast } from 'react-toastify'
import { t } from 'i18next'
import { apiRequest } from '@/utils/apiDefaults'
import { AxiosError } from 'axios'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/storage/assignmentCards'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { Container } from '@mui/material'
import { AssignmentTransactionForm } from '@/components/Storage/assignmentTransaction/AssignmentTransactionForm'


export const initialAssignmentTransaction: AssignmentTransaction = {
  id: 0,
  assignmentCard: undefined,
  employee: undefined,
  transactionDate: '',
  assignmentStatusEnum: AssignmentStatusEnum.ASSIGNED
};


export const AssignmentTransactionAdd = () => {
  const navigate = useNavigate();


  const { mutateAsync } = useMutation({
    mutationFn: (values: AssignmentTransaction) =>
      apiRequest({
        endpoint: 'assignmentCardAdd',
        payload: values,
      }),
    onSuccess: () => {
      navigate({to: Route.fullPath})
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

  const onFormSubmit = async (values: AssignmentTransaction) => {
    await mutateAsync({
      ...values

    })
    console.log('Payload: ', values);
  }

  return (
    <>
      <PageTitle title={t('common:assignmentTransactionAdd')} />
      <Container>
        <BaseForm
          initialValues={initialAssignmentTransaction}
          component={<AssignmentTransactionForm/>}
          onSubmit={onFormSubmit}
        />
      </Container>
    </>
  )
}