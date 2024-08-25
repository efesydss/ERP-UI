import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { OptionType } from '@/components/Common/Form/Select/BaseSelect'

export const useAvailableEmployees = (year: number, month: number) => {
  const { data: timeKeepingCreatedEmployees, isLoading: timeKeepingCreatedEmployeesLoading } = useQuery({
    queryKey: ['timeKeepings', year, month],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeTimeKeepingProps>>({
        endpoint: 'timeKeepings',
        payload: {
          filter: `year==${year};month==${month}`,
          page: 0,
          pageSize: 200
        }
      }),
    select: (res) => {
      return res.data.map((r) => r.employee.id)
    }
  })

  const { data: employeeList, isLoading: isEmployeeListLoading } = useQuery({
    queryKey: ['employees', timeKeepingCreatedEmployees],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeResponse>>({
        endpoint: 'employees',
        payload: {
          filter: timeKeepingCreatedEmployees?.map((id) => `id!=${id}`).join(';'),
          page: 0,
          pageSize: 200
        }
      }),
    enabled: !!timeKeepingCreatedEmployees,
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        return {
          value: r.id ?? 0,
          label: `${r.name} ${r.surname}`
        }
      })
    }
  })

  const isLoadingState = isEmployeeListLoading || timeKeepingCreatedEmployeesLoading

  return {
    employeeList,
    isLoadingState
  }
}
