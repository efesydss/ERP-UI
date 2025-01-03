import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import React, { useMemo, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useConfirmDialog } from '@/utils/hooks/useConfirmDialogContext'
import { apiRequest } from '@/utils/apiDefaults'
import { useMutation } from '@tanstack/react-query'
import { GridRowId } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import { ColumnDef } from '@tanstack/react-table'
import { AdditionalCost } from '@/components/Purchasing/AdditionalCost/types/typesAdditionalCost'
import { Route } from '@/routes/_authenticated/purchasing/additionalCosts/new'

export const AdditionalCostList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()
  const navigate = useNavigate()


  const safeAccessor = <T, >(accessorFn: (row: T) => unknown, columnName: string) => {
    return (row: T) => {
      try {
        console.log(columnName)
        return accessorFn(row)
      } catch (error) {

        return 'Error'
      }
    }
  }

  const { mutate: deleteAdditionalCost } = useMutation({
    mutationFn: async (additionalCostId: string) => {
      return await apiRequest({
        endpoint: 'additionalCostDelete',
        method: 'DELETE',
        params: { additionalCostId: additionalCostId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['additionalCosts'] })
      toast.success('AdditionalCost Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteAdditionalCost(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteAdditionalCost])
  const columns = useMemo<ColumnDef<AdditionalCost>[]>(
    () => [
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code, 'code')
      },
      {
        header: t('description'),
        accessorFn: safeAccessor((row) => row.description, 'description')
      },
      {
        header: t('unit'),
        accessorFn: safeAccessor((row) => row.unit, 'unit')
      },
      {
        header: t('specialCode'),
        accessorFn: safeAccessor((row) => row.specialCode, 'specialCode')
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

  const AdditionalCostListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newAdditionalCost')}
        </Button>
      </>
    )
  }
  const endpoint = 'additionalCosts'

  return (
    <>
      <PageTitle
        title={t('AdditionalCostList')}
        actions={<AdditionalCostListActions />}
      />

      <BaseTable<AdditionalCost> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}