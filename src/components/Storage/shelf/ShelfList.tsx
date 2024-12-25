import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/storage/shelf/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import React, { useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { GridRowId } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { Shelf } from '@/components/Storage/shelf/types/typesShelf'
import { ColumnDef } from '@tanstack/react-table'
export const ShelfList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteDepot(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
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
      toast.success('Depot Deleted')
    }
  })
  // 2. Tablo sütunlarını tanımlama
  const columns = useMemo<ColumnDef<Shelf>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name'
      },
      {
        header: t('description'),
        accessorKey: 'description'
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
    [t]
  )

  const ShelfListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newShelf')}
        </Button>
      </>
    )
  }
  const endpoint = 'shelves'
  console.log(`Fetching data from endpoint: ${endpoint}`)

  return (
    <>
      <PageTitle
        title={t('shelfList')}
        actions={<ShelfListActions />}
      />

      <BaseTable<Shelf> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}