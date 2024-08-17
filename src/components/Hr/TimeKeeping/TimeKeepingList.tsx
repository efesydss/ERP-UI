import { EmployeeTimeKeepingProps } from '@/components/Hr/TimeKeeping/typesTimeKeeping'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { TimeKeepingListActions } from '@/components/Hr/TimeKeeping/components/TimeKeepingListActions'

export const TimeKeepingList = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')

  const columns = useMemo<ColumnDef<EmployeeTimeKeepingProps>[]>(
    () => [
      { header: common('name'), accessorKey: 'employee.name' },
      { header: common('surname'), accessorKey: 'employee.surname' },
      { header: common('companyBranch'), accessorKey: 'employee.companyBranch.name' },
      { header: common('department'), accessorKey: 'employee.department.name' },
      {
        header: common('date'),
        enableSorting: false,
        accessorKey: 'year',
        cell: ({ row }) => {
          const { year, month } = row.original
          return `${month} / ${year}`
        }
      },
      { header: hr('netSalary'), accessorKey: 'netSalary' },
      { header: hr('total'), accessorKey: 'total' },
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
    [common, hr]
  )

  return (
    <BaseTable<EmployeeTimeKeepingProps>
      columns={columns}
      endpoint={'timeKeepings'}
    />
  )
}
