import { VacationBaseProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { useNavigate } from '@tanstack/react-router'
import { formatToISOString } from '@/utils/transformers'
import { FormVacationAdd } from '@/components/Hr/Vacations/FormVacationAdd'

const initialLeave: VacationBaseProps = {
  personnel: { id: 0, name: '' },
  startTime: '',
  endTime: '',
  workingDays: 1,
  workingHours: 8,
  timeOffType: VacationType.Vacation,
  unPaid: false
}

export const VacationAdd = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: (values: VacationBaseProps) =>
      apiRequest({
        endpoint: 'employeeVacationAdd',
        params: { employeeId: values.personnel.id.toString() },
        payload: {
          id: values.personnel.id,
          startTime: formatToISOString(values.startTime),
          endTime: formatToISOString(values.endTime),
          workingDays: values.workingDays,
          workingHours: values.workingHours,
          timeOffType: values.timeOffType,
          unPaid: values.unPaid
        }
      }),
    onSuccess: () => {
      toast.success('Vacation Created')
      navigate({ to: '/hr/vacations' })
    }
  })

  const onFormSubmit = async (values: VacationBaseProps) => {
    await mutateAsync(values)
  }

  return (
    <BaseForm
      initialValues={initialLeave}
      onSubmit={onFormSubmit}
      component={<FormVacationAdd />}
    />
  )
}
