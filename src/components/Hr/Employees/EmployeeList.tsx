import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useNavigate } from '@tanstack/react-router'
import { EmployeeListEditActions } from '@/components/Hr/Employees/components/EmployeeListEditActions'
import { Route } from '@/routes/_authenticated/hr/employees/new'

export const EmployeeList = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<EmployeeResponse>[]>(
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
        header: common('department'),
        accessorKey: 'department',
        accessorFn: (row) => row.department.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'
        }
      },
      {
        header: common('companyBranch'),
        accessorKey: 'companyBranch',
        accessorFn: (row) => row.companyBranch.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'branches'
        }
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
    [common]
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
      <PageTitle
        title={hr('personnelList')}
        actions={<PersonnelListActions />}
      />

      <BaseTable<EmployeeResponse>
        columns={columns}
        endpoint={'employees'}
      />
    </>
  )
}