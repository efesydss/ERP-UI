import { BaseTable } from '@/components/Common/Table/BaseTable'
import { VacationStatus } from 'components/Hr/Vacations/typeVacations'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { Box, IconButton } from '@mui/material'
import { Route as NewVacationRoute } from '@/routes/_authenticated/hr/vacations/new/$id'
import { useNavigate } from '@tanstack/react-router'
import { VacationGrid } from '@/components/Common/DataGrid/VacationGrid'
import { GrNewWindow } from 'react-icons/gr'
import { t } from 'i18next'

export const VacationList = () => {
  const { t: nav } = useTranslation('nav')
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<VacationStatus>[]>(
    () => [
      {
        header: t('common:name'),
        accessorKey: 'employee.name'
      },
      {
        header: t('common:surname'),
        accessorKey: 'employee.surname'
      },
      {
        header: t('common:profession'),
        accessorKey: 'profession'
      },
      {
        header: t('common:department'),
        accessorKey: 'employee.department',
        accessorFn: (row) => row.employee.department.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'
        }
      },
      {
        header: t('common:transferred'),
        accessorKey: 'transferred',
        enableSorting: false
      },
      {
        header: t('common:usedCurrentYear'),
        accessorKey: 'usedCurrentYear',
        enableSorting: false
      },
      {
        header: t('common:usable'),
        accessorKey: 'usable',
        enableSorting: false
      },
      {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const employeeId = row.original.employee.id

          if (!employeeId) {
            return null
          }

          return (
            <Box sx={{ textAlign: 'right' }}>
              <IconButton
                size={'small'}
                onClick={(e) => {
                  e.stopPropagation()
                  navigate({ to: NewVacationRoute.fullPath, params: { id: employeeId } })
                }}
              >
                <GrNewWindow />
              </IconButton>
            </Box>
          )
        }
      }
    ],
    [navigate]
  )
  return (
    <>
      <PageTitle title={nav('vacations')} />

      <BaseTable<VacationStatus>
        endpoint={'employeeVacationStatuses'}
        columns={columns}
        renderSubComponent={(props) => <VacationGrid employeeId={props.row.original.employee.id} />}
      />
    </>
  )
}
