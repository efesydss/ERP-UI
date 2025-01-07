import { useTranslation } from 'react-i18next'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { GridRowId } from '@mui/x-data-grid'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { ColumnDef } from '@tanstack/react-table'
import { AssignmentTransaction } from '@/components/Storage/assignmentTransaction/types/typesAssignmentTransaction'
import { useMemo, useCallback } from 'react'
import { Button } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/storage/assignmentTransactions/new'

export const AssignmentTransactionList = () => {
  const { t } = useTranslation()
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()
  const navigate = useNavigate()


  const { mutate: deleteAssignmentTransaction } = useMutation({
    mutationFn: async (assignmentTransactionId: string) => {
      return await apiRequest({
        endpoint: 'assignmentTransactionDelete',
        method: 'DELETE',
        params: { assignmentTransactionId: assignmentTransactionId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignmentTransactions'] })
      toast.success('AssignmentTransaction Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteAssignmentTransaction(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteAssignmentTransaction])
  const safeAccessor = <T, >(accessorFn: (row: T) => unknown, columnName: string) => {
    return (row: T) => {
      try {
        return accessorFn(row)
      } catch (error) {
        console.error(`Error in column "${columnName}"`, error, row)
        return 'Error'
      }
    }
  }
  const columns = useMemo<ColumnDef<AssignmentTransaction>[]>(
    () => [
      {
        header: t('assignmentCard'),
        accessorFn: safeAccessor((row) => row.assignmentCard || t('-'), 'assignmentCard')
      },
      {
        header: t('employee'),
        accessorFn: safeAccessor((row) => row.employee || t('-'), 'employee')
      },
      {
        header: t('transactionDate'),
        accessorFn: safeAccessor((row) => row.transactionDate || t('-'), 'transactionDate')
      },
      {
        header: t('assignmentStatusEnum'),
        accessorFn: safeAccessor((row) => row.assignmentStatusEnum || t('-'), 'assignmentStatusEnum')
      },

      {
        header: t('actions'),
        id: 'actions',
        cell: ({ row }) => (

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDeleteClick(row.original.id)}
          >
            {t('delete')}
            console.log('Satır verisi:', row.original);

          </Button>
        )
      }
    ],
    [t, handleDeleteClick]
  )
  console.log('Columns tanımı:', columns)


  const AssignmentTransactionListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newAssignmentTransaction')}
        </Button>
      </>
    )
  }
  const endpoint = 'assignmentTransactions'
  console.log(`Fetching data from endpoint: ${endpoint}`)

  return (
    <>
      <PageTitle
        title={t('common:assignmentTransactionList')}
        actions={<AssignmentTransactionListActions />}
      />

      <BaseTable<AssignmentTransaction> endpoint={endpoint} columns={columns}
        /* renderSubComponent={(props) => (
           <MachineSubRow

             employeeId={props.row.original.id}
             row={props.row}
             handleExpandRow={props.handleExpandRow}
           />
         )}*/
      ></BaseTable>

    </>
  )
}