import { BaseTable } from '@/components/Common/Table/BaseTable'
import { EmployeeVacationProps } from '@/components/Hr/Vacations/typeVacations'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { formatToDateReadable } from '@/utils/transformers'
import { Route } from '@/routes/_authenticated/hr/employees/$id'
import { IconButton } from '@mui/material'
import { FaRegTrashCan } from 'react-icons/fa6'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'

export const EmployeeVacations = () => {
  const { t: hr } = useTranslation('hr')
  const { id } = Route.useParams()
  const queryClient = useQueryClient()
  const { openDialog } = useConfirmDialog()

  const { mutate } = useMutation({
    mutationFn: async (timeOffId: string) => {
      return await apiRequest({
        endpoint: 'employeeVacationDelete',
        method: 'DELETE',
        params: { employeeId: id.toString(), timeOffId }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeVacation'] })
      toast.success('Vacation Deleted')
    }
  })

  const columns = useMemo<ColumnDef<EmployeeVacationProps>[]>(
    () => [
      {
        header: hr('vacationStart'),
        accessorKey: 'startDateTime',
        accessorFn: (row) => (row.startDateTime ? formatToDateReadable(row.startDateTime) : '')
      },
      {
        header: hr('vacationEnd'),
        accessorKey: 'endDateTime',
        accessorFn: (row) => (row.endDateTime ? formatToDateReadable(row.endDateTime) : '')
      },
      {
        header: hr('timeOffType'),
        accessorKey: 'timeOffType',
        accessorFn: (row) => hr(row.timeOffType)
      },
      {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          const leaveId = row.original.id

          return (
            <IconButton
              size='small'
              onClick={() => {
                openDialog(
                  'Confirm Deletion',
                  'Are you sure you want to delete this item?',
                  () => {
                    mutate(leaveId.toString())
                  },
                  () => {
                    console.log('Deletion cancelled')
                  }
                )
              }}
            >
              <FaRegTrashCan />
            </IconButton>
          )
        }
      }
    ],
    [hr, mutate, openDialog]
  )

  return (
    <BaseTable<EmployeeVacationProps>
      endpoint={'employeeVacation'}
      params={{ employeeId: id.toString() }}
      columns={columns}
    />
  )
}