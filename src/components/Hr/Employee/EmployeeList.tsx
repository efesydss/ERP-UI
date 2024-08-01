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
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { Named } from '@/utils/commonTypes'
import { OptionType } from '@/components/Common/Form/BaseSelect'
import { useQuery } from '@tanstack/react-query'

export const EmployeeList = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')
  const navigate = useNavigate()

  const { data: branchList } = useQuery({
    queryKey: ['branchList'],
    queryFn: () =>
      apiRequest<ApiResponse<Named>>({
        endpoint: 'branches',
        payload: {
          filter: '',
          page: 0,
          pageSize: 100
        }
      }),
    select: (res): OptionType[] => {
      return res.data.map((r) => {
        return {
          value: r.id.toString(),
          label: r.name
        }
      })
    }
  })

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
        header: common('department'),
        accessorKey: 'department',
        accessorFn: (row) => row.department.name
      },
      {
        header: common('companyBranch'),
        accessorKey: 'companyBranch',
        accessorFn: (row) => row.companyBranch.name,
        meta: {
          filterVariant: 'select',
          filterOptions: branchList
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
    [branchList, common]
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
          title={hr('personnelList')}
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
