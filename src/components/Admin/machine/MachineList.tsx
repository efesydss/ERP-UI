import { useTranslation } from 'react-i18next'
import { Machines } from '@/components/Admin/typesMachines'
import { ColumnDef } from '@tanstack/react-table'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { DetailsSubRow } from '@/components/Hr/Employees/components/DetailsSubRow'
import { Button } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/admin/machines/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import {  GridRowId } from '@mui/x-data-grid'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'

export const MachineList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteMachine(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
  const { mutate: deleteMachine } = useMutation({
    mutationFn: async (machineId: string) => {
      return await apiRequest({
        endpoint: 'machineDelete',
        method: 'DELETE',
        params: { machineId: machineId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['machines'] })
      toast.success('Machine Deleted')
    }
  })
  // 2. Tablo sütunlarını tanımlama
  const columns = useMemo<ColumnDef<Machines>[]>(
    () => [
      {
        header: t('code'),
        accessorKey: 'code'
      },
      {
        header: t('description'),
        accessorKey: 'description'
      },
      {
        header: t('employee'),
        accessorFn: (row) => row.employee?.name || t('noEmployee')
      },
      {
        header: t('actions'),  // Actions başlığı
        id: 'actions',
        cell: ({ row }) => (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDeleteClick(row.original.id)}
          >
            {t('delete')}
          </Button>
        )
      }
    ],
    [t]
  )

  const MachineListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newMachine')}
        </Button>
      </>
    )
  }
  const endpoint = 'machines'
  console.log(`Fetching data from endpoint: ${endpoint}`)

  return (
    <>
      <PageTitle
        title={t('machineList')}
        actions={<MachineListActions />}
      />

    <BaseTable<Machines> endpoint={endpoint} columns={columns}
                         renderSubComponent={(props) => (
                           <DetailsSubRow

                             employeeId={props.row.original.id}
                             row={props.row}
                             handleExpandRow={props.handleExpandRow}
                           />
                         )}
    ></BaseTable>

    </>
  )
}