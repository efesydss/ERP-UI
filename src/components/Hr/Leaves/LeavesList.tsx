import { BaseTable } from '@/components/Common/Table/BaseTable'
import { VacationStatus } from './typesLeaves'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { Route } from '@/routes/_authenticated/hr/leaves/new-leave'
import { useNavigate } from '@tanstack/react-router'
import { MdAdd } from 'react-icons/md'

export const LeavesList = () => {
  const { t: nav } = useTranslation('nav')
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const navigate = useNavigate()

  const LeavesListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          startIcon={<MdAdd />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {hr('leaveAdd')}
        </Button>
      </>
    )
  }
  const columns = useMemo<ColumnDef<VacationStatus>[]>(
    () => [
      {
        header: common('fullName'),
        accessorKey: 'fullName'
      },
      {
        header: hr('department'),
        accessorKey: 'department'
      },
      {
        header: hr('entitled'),
        accessorKey: 'entitled'
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
        title={nav('leaves')}
        actions={<LeavesListActions />}
      />
      <BaseTable<VacationStatus>
        endpoint={'employeeVacations'}
        columns={columns}
      />
    </>
  )
}
