import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Employee } from '@/components/Hr/Employee/typesEmployee'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useNavigate } from '@tanstack/react-router'
import { EmployeeListEditActions } from '@/components/Hr/Employee/components/EmployeeListEditActions'
import { Route } from '@/routes/_authenticated/hr/employees/create'

export const EmployeeList = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        header: common('name'),
        accessorKey: 'name'
      },
      {
        header: common('surname'),
        accessorKey: 'surname'
      },
      {
        header: hr('department'),
        accessorKey: 'department'
      },
      {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const personnelId = row.original.id

          if (!personnelId) {
            return null
          }
          return <EmployeeListEditActions personnelId={personnelId} />
        }
      }
    ],
    [common, hr]
  )

  const PersonnelListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {hr('newPersonnel')}
        </Button>
      </>
    )
  }

  return (
    <>
      <div>
        <PageTitle
          title={hr('personnelTitle')}
          actions={<PersonnelListActions />}
        />
      </div>

      <BaseTable<Employee>
        columns={columns}
        endpoint={'employees'}
      />
    </>
  )
}
