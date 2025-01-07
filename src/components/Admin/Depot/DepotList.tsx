import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { DepotResponse } from '@/components/Admin/Depot/typesDepot'
import { Button } from '@mui/material'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/admin/depots/new'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { GridRowId } from '@mui/x-data-grid'
import { apiRequest } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { useCallback } from 'react'

export const DepotList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate: deleteDepot } = useMutation({
    mutationFn: async (depotId: string) => {
      return await apiRequest({
        endpoint: 'depotDelete',
        method: 'DELETE',
        params: { depotId: depotId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['depots'] })
      toast.success('DepotResponse Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteDepot(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteDepot]
  )


  const columns = useMemo<ColumnDef<DepotResponse>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name'
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
          </Button>
        )
      }
    ],
    [t, handleDeleteClick]
  )

  const DepotListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newDepot')}
        </Button>
      </>
    )
  }
  const endpoint = 'depots'
  console.log(`Fetching data from endpoint: ${endpoint}`)

  return (
    <>
      <PageTitle
        title={t('depotList')}
        actions={<DepotListActions />}
      />

      <BaseTable<DepotResponse> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}