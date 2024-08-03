import { VacationBaseProps, VacationType } from '@/components/Hr/Vacations/typeVacations'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLeavesAdd } from './FormLeavesAdd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { OptionType } from '@/components/Common/Form/BaseSelect'
import { toast } from 'react-toastify'
import { useNavigate } from '@tanstack/react-router'

const initialLeave: VacationBaseProps = {
  personnel: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  workingDays: 0,
  workingHours: 0,
  timeOffType: VacationType.Vacation,
  unPaid: false
}

export const VacationAdd = () => {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeResponse>>({
        endpoint: 'employees',
        payload: {
          filter: '',
          page: 0,
          pageSize: 100
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        return {
          value: r.id ?? 0,
          label: `${r.name} ${r.surname}`
        }
      })
    }
  })

  const { mutateAsync } = useMutation({
    mutationFn: (values: VacationBaseProps) =>
      apiRequest({
        endpoint: 'employeeVacationAdd',
        params: { employeeId: values.personnel },
        payload: {
          id: Number(values.personnel),
          startDateTime: values.startDateTime.toISOString(),
          endDateTime: values.endDateTime.toISOString(),
          workingDays: Number(values.workingDays),
          workingHours: Number(values.workingHours),
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
      component={<FormLeavesAdd employees={data || []} />}
    />
  )
}
