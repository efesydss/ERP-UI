import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Button } from '@mui/material'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useQuery } from '@tanstack/react-query'
import { EmployeeTimeKeepingProps, EmployeeTimeKeepingSpan } from '@/components/Hr/Tally/typesTimeKeeping'
import { useFormikContext } from 'formik'

interface EmployeeTimeKeepingDateSetProps {
  isLoading: boolean
}

export const EmployeeTimeKeepingDateSet = (props: EmployeeTimeKeepingDateSetProps) => {
  const { isLoading } = props
  const { values } = useFormikContext<EmployeeTimeKeepingSpan>()

  const { year, month } = values

  console.log('values -->', values)

  const { data: timeKeepings } = useQuery({
    queryKey: ['timeKeepings', values],
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

  const { data, isLoading: isEmployeeListLoading } = useQuery({
    //todo: pageSize needs to be updated
    queryKey: ['employees', values],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeResponse>>({
        endpoint: 'employees',
        payload: {
          filter: timeKeepings?.map((id) => `id!=${id}`).join(';'),
          page: 0,
          pageSize: 200
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        return {
          value: r.id ?? 0,
          label: `${r.name} ${r.surname}`
        }
      })
    },
    enabled: !!timeKeepings
  })

  return (
    <>
      <FormGrid widths={'forth'}>
        <Input
          name={'year'}
          type={'number'}
        />
        <Input
          name={'month'}
          type={'number'}
        />
        <BaseSelect
          name={'employee'}
          options={data}
          nameSpace={'hr'}
          isLoading={isEmployeeListLoading}
          onChange={(option) => console.log(option)}
        />
      </FormGrid>
      <Button
        type={'submit'}
        color={'primary'}
        variant={'contained'}
        disabled={isLoading || values.employee.id === 0}
      >
        Taslağı Getir
      </Button>
    </>
  )
}
