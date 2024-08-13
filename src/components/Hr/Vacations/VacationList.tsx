import { BaseTable } from '@/components/Common/Table/BaseTable'
import { VacationStatus } from 'components/Hr/Vacations/typeVacations'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { Route as NewVacationRoute } from '@/routes/_authenticated/hr/vacations/new'
import { useNavigate } from '@tanstack/react-router'
import { MdAdd } from 'react-icons/md'
import { BaseGrid } from '@/components/Common/DataGrid/BaseGrid'

export const VacationList = () => {
  const { t: nav } = useTranslation('nav')
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const navigate = useNavigate()

  const VacationListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          startIcon={<MdAdd />}
          onClick={() => navigate({ to: NewVacationRoute.fullPath })}
        >
          {hr('leaveAdd')}
        </Button>
      </>
    )
  }

  const columns = useMemo<ColumnDef<VacationStatus>[]>(
    () => [
      {
        header: common('name'),
        accessorKey: 'employee.name'
      },
      {
        header: common('surname'),
        accessorKey: 'employee.surname'
      },
      {
        header: common('profession'),
        accessorKey: 'profession'
      },
      {
        header: hr('department'),
        accessorKey: 'employee.department',
        accessorFn: (row) => row.employee.department.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'
        }
      },
      {
        header: hr('transferred'),
        accessorKey: 'transferred'
      },
      {
        header: hr('usedCurrentYear'),
        accessorKey: 'usedCurrentYear'
      },
      {
        header: hr('usable'),
        accessorKey: 'usable'
      }
    ],
    [common, hr]
  )
  return (
    <>
      <PageTitle
        title={nav('vacations')}
        actions={<VacationListActions />}
      />

      <BaseTable<VacationStatus>
        endpoint={'employeeVacationStatuses'}
        columns={columns}
        renderSubComponent={(props) => <BaseGrid employeeId={props.row.original.employee.id} />}
        //getRowCanExpand={() => true}
      />
    </>
  )
}
