import { BaseTable } from '@/components/Common/Table/BaseTable'
import { LeavesBaseProps } from '@/components/Hr/Leaves/typesLeaves'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export const EmployeeVacations = () => {
  const columns = useMemo<ColumnDef<LeavesBaseProps>[]>(
    () => [
      {
        header: 'test',
        accessorKey: 'timeOffType'
      }
    ],
    []
  )

  return (
    <BaseTable
      endpoint={'employeeVacation'}
      params={{ employeeId: '2' }}
      columns={columns}
    />
  )
}
