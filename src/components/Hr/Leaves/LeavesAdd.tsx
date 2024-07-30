import { LeavesBaseProps, LeaveType } from '@/components/Hr/Leaves/typesLeaves'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLeavesAdd } from './FormLeavesAdd'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { Employee } from '@/components/Hr/Employee/typesEmployee'
import { OptionType } from '@/components/Common/Form/BaseSelect'
import { toast } from 'react-toastify'
import { useNavigate } from '@tanstack/react-router'

const initialLeave: LeavesBaseProps = {
  personnel: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  workingDays: 0,
  workingHours: 0,
  timeOffType: LeaveType.Vacation,
  unPaid: false
}

export const LeavesAdd = () => {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      apiRequest<ApiResponse<Employee>>({
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
          value: (r.id ?? 0).toString(),
          label: `${r.name} ${r.surname}`
        }
      })
    }
  })

  const { mutateAsync } = useMutation({
    mutationFn: (values: LeavesBaseProps) =>
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
      navigate({ to: '/hr/leaves' })
    }
  })

  const onFormSubmit = async (values: LeavesBaseProps) => {
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
