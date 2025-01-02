import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/storage/unit/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import React, { useMemo,useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { GridRowId } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { Unit } from '@/components/Storage/unit/types/typesUnit'
import { ColumnDef } from '@tanstack/react-table'
export const UnitList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()


  const { mutate: deleteUnit } = useMutation({
    mutationFn: async (UnitId: string) => {
      return await apiRequest({
        endpoint: 'unitDelete',
        method: 'DELETE',
        params: { UnitId: UnitId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] })
      toast.success('Unit Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteUnit(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteUnit])
  // 2. Tablo sütunlarını tanımlama
  const columns = useMemo<ColumnDef<Unit>[]>(
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
    [t,handleDeleteClick]
  )

  const UnitListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newUnit')}
        </Button>
      </>
    )
  }
  const endpoint = 'units'
  console.log(`Fetching data from endpoint: ${endpoint}`)

  return (
    <>
      <PageTitle
        title={t('UnitList')}
        actions={<UnitListActions />}
      />

      <BaseTable<Unit> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}