import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { TimeKeepingListActions } from '@/components/Hr/TimeKeeping/components/TimeKeepingListActions'
import { t } from 'i18next'

export const TimeKeepingList = () => {
  const columns = useMemo<ColumnDef<EmployeeTimeKeepingProps>[]>(
    () => [
      { header: t('common:name'), accessorKey: 'employee.name' },
      { header: t('common:surname'), accessorKey: 'employee.surname' },
      {
        header: t('common:companyBranch'),
        accessorKey: 'companyBranch',
        accessorFn: (row) => row.employee.companyBranch.name,
        enableColumnFilter: false,
        enableSorting: false,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'branches'
        }
      },
      {
        header: t('common:department'),
        accessorKey: 'employee.department',
        accessorFn: (row) => row.employee.department.name,
        enableColumnFilter: false,
        enableSorting: false,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'
        }
      },

      {
        header: t('common:date'),
        enableSorting: false,
        accessorKey: 'year',
        cell: ({ row }) => {
          const { year, month } = row.original
          return `${month} / ${year}`
        }
      },
      { header: t('common:netSalary'), accessorKey: 'netSalary' },
      { header: t('common:total'), accessorKey: 'total' },
      {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const timeKeepingId = row.original.id

          if (!timeKeepingId) {
            return null
          }
          return <TimeKeepingListActions timeKeepingId={timeKeepingId} />
        }
      }
    ],
    []
  )

  return (
    <BaseTable<EmployeeTimeKeepingProps>
      columns={columns}
      endpoint={'timeKeepings'}
    />
  )
}
