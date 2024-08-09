import { EmployeeTimeKeepingProps } from '@/components/Hr/Tally/typesTimeKeeping'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { BaseTable } from '@/components/Common/Table/BaseTable'

export const TimeKeepingList = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')

  const columns = useMemo<ColumnDef<EmployeeTimeKeepingProps>[]>(
    () => [
      { header: common('name'), accessorKey: 'employee.name' },
      { header: common('surname'), accessorKey: 'employee.surname' },
      {
        header: common('date'),
        accessorKey: 'year',
        cell: ({ row }) => {
          const { year, month } = row.original
          return `${month} / ${year}`
        }
      },
      { header: hr('netSalary'), accessorKey: 'netSalary' },
      { header: hr('total'), accessorKey: 'total' }
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
