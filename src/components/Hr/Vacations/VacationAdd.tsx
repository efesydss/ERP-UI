import { VacationBaseProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { useNavigate } from '@tanstack/react-router'
import { formatToISOString } from '@/utils/transformers'
import { FormVacationAdd } from '@/components/Hr/Vacations/FormVacationAdd'
import { Route } from '@/routes/_authenticated/hr/vacations/new/$id'
import { Paper } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { t } from 'i18next'

const initialLeave: VacationBaseProps = {
  personnel: { id: 0, name: '' },
  startDateTime: '',
  endDateTime: '',
  workingDays: 1,
  workingHours: 8,
  timeOffType: VacationType.Vacation,
  unPaid: false
}

export const VacationAdd = () => {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const data = Route.useLoaderData()

  const { mutateAsync } = useMutation({
    mutationFn: (values: VacationBaseProps) =>
      apiRequest({
        endpoint: 'employeeVacationAdd',
        params: { employeeId: id.toString() },
        payload: {
          startDateTime: formatToISOString(values.startDateTime),
          endDateTime: formatToISOString(values.endDateTime),
          workingDays: values.workingDays,
          workingHours: values.workingHours,
          timeOffType: values.timeOffType,
          unPaid: values.unPaid
        }
      }),
    onSuccess: () => {
      toast.success('Vacation Created')
      navigate({ to: '/hr/vacations' })
    },
    onError: (err) => console.log(err)
  })

  const onFormSubmit = async (values: VacationBaseProps) => {
    console.log(values)
    await mutateAsync(values)
  }

  return (
    <>
      <PageTitle
        title={`${data.name} ${data.surname}`}
        subTitle={`${data.companyBranch.name} ${t('hr:branchSuffix')}, ${data.department.name} ${t('hr:departmentSuffix')}`}
      />
      <Paper sx={{ p: 2 }}>
        <BaseForm
          initialValues={initialLeave}
          onSubmit={onFormSubmit}
          component={<FormVacationAdd />}
        />
      </Paper>
    </>
  )
}
