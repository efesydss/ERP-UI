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
import { PublicHoliday } from '@/components/Admin/PublicHoliday/types/typesPublicHoliday'
import { Route } from '@/routes/_authenticated/admin/publicHolidays/new'

export const PublicHolidayList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()


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
  const { mutate: deletePublicHoliday } = useMutation({
    mutationFn: async (publicHolidayId: string) => {
      return await apiRequest({
        endpoint: 'publicHolidayDelete',
        method: 'DELETE',
        params: { publicHolidayId: publicHolidayId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicHolidays'] })
      toast.success('Public Holiday Deleted')
    }
  })

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deletePublicHoliday(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deletePublicHoliday])
  const columns = useMemo<ColumnDef<PublicHoliday>[]>(
    () => [
      {
        header: t('year'),
        accessorFn: safeAccessor((row) => row.year || t('-'), 'year')
      },
      {
        header: t('startDate'),
        accessorFn: safeAccessor((row) => row.startDate || t('-'), 'startDate')
      },
      {
        header: t('endDate'),
        accessorFn: safeAccessor((row) => row.endDate || t('-'), 'endDate')
      },
      {
        header: t('description'),
        accessorFn: safeAccessor((row) => row.description || t('-'), 'description')
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

  const PublicHolidayListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newPublicHoliday')}
        </Button>
      </>
    )
  }
  const endpoint = 'publicHolidays'

  return (
    <>
      <PageTitle
        title={t('PublicHolidayList')}
        actions={<PublicHolidayListActions />}
      />

      <BaseTable<PublicHoliday> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}