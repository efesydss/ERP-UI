import { LeavesBaseProps, LeaveType } from '@/components/Hr/Leaves/typesLeaves'
import { BaseForm } from '@/components/Common/Form/BaseForm'
import { FormLeavesAdd } from './FormLeavesAdd'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { Employee } from '@/components/Hr/Employee/typesEmployee'
import { OptionType } from '@/components/Common/Form/BaseSelect'

const initialLeave: LeavesBaseProps = {
  personnel: '',
  startTime: '',
  endTime: '',
  workingDays: 0,
  workingHours: 0,
  timeOffType: LeaveType.Vacation,
  unPaid: false
}

export const LeavesAdd = () => {
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

  return (
    <BaseForm
      initialValues={initialLeave}
      onSubmit={(values) => console.log(values)}
      component={<FormLeavesAdd employees={data || []} />}
    />
  )
}
