import { FormGrid } from '@/components/Common/Form/FormGrid/FormGrid'
import { Input } from '@/components/Common/Form/Input/Input'
import { Button } from '@mui/material'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useQuery } from '@tanstack/react-query'

export const EmployeeTally = () => {
  const { data } = useQuery({
    queryKey: ['employees'],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeResponse>>({
        endpoint: 'employees',
        payload: {
          filter: '',
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
    }
  })
  return (
    <>
      <FormGrid widths={'third'}>
        <BaseSelect
          name={'employee'}
          options={data}
          nameSpace={'hr'}
        />
        <Input
          name={'year'}
          type={'number'}
        />
        <Input
          name={'month'}
          type={'number'}
        />
      </FormGrid>
      <Button
        type={'submit'}
        color={'primary'}
        variant={'contained'}
      >
        Getir
      </Button>
    </>
  )
}
