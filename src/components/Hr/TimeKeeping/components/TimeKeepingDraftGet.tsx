import { Input } from '@/components/Common/Form/Input/Input'
import { Box, Button } from '@mui/material'
import { BaseSelect, OptionType } from '@/components/Common/Form/BaseSelect'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useQuery } from '@tanstack/react-query'
import { EmployeeTimeKeepingProps, EmployeeTimeKeepingSpan } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useFormikContext } from 'formik'
import { t } from 'i18next'

interface EmployeeTimeKeepingDateSetProps {
  isLoading: boolean
}

export const TimeKeepingDraftGet = (props: EmployeeTimeKeepingDateSetProps) => {
  const { isLoading } = props
  const { values } = useFormikContext<EmployeeTimeKeepingSpan>()

  const { year, month } = values

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

  //todo: we request employees x2. need to check it
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

  //todo: update check for values.employee
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
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
        />
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isLoading || values.employee.id === 0}
        >
          {t('hr:getDraft')}
        </Button>
      </Box>
    </>
  )
}
