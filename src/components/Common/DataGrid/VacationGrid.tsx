import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { t } from 'i18next'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { EmployeeVacationProps } from '@/components/Hr/Vacations/typeVacations'
import { formatToDateReadable } from '@/utils/transformers'
import { Box } from '@mui/material'

interface BaseGridProps {
  employeeId?: number
}

export const VacationGrid = (props: BaseGridProps) => {
  const { employeeId } = props

  const { data, isLoading } = useQuery({
    queryKey: ['employeeVacation', employeeId],
    queryFn: () =>
      apiRequest<ApiResponse<EmployeeVacationProps>>({
        endpoint: 'employeeVacation',
        payload: {
          filter: '',
          page: 0,
          pageSize: 200
        },
        params: { employeeId: employeeId?.toString() ?? '' }
      }),
    enabled: !!employeeId
  })

  const columns: GridColDef[] = [
    {
      field: 'startDateTime',
      valueGetter: (value) => formatToDateReadable(value),
      headerName: t('common:vacationStart'),
      type: 'string',
      width: 200
    },
    {
      field: 'endDateTime',
      valueGetter: (value) => formatToDateReadable(value),
      headerName: t('common:vacationEnd'),
      type: 'string',
      width: 200
    },
    {
      field: 'timeOffType',
      headerName: t('common:timeOffType'),
      valueGetter: (value: string) => t(`common:${value}`),
      type: 'string',
      width: 120
    }
  ]

  return (
    <Box sx={{ backgroundColor: '#fff' }}>
      <DataGrid
        rows={data?.data}
        loading={isLoading}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress'
          }
        }}
        columns={columns}
        editMode='row'
      />
    </Box>
  )
}
