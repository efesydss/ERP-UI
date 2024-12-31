
import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'

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
import { ColumnDef } from '@tanstack/react-table'
import {ExpenseCard} from '@/components/Accounting/ExpenseCard/types/typesExpenseCard'
import { Route } from '@/routes/_authenticated/accounting/expenseCards/new'
export const ExpenseCardList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteExpenseCard(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
    const safeAccessor = (accessorFn: (row: any) => any, columnName: string) => {
    return (row: any) => {
      try {
        const result = accessorFn(row)
        console.log(columnName, result)
        return result
      } catch (error) {
        console.error(error)
        return 'Error'
      }
    }
  }
  const { mutate: deleteExpenseCard } = useMutation({
    mutationFn: async (expenseCardId: string) => {
      return await apiRequest({
        endpoint: 'expenseCardDelete',
        method: 'DELETE',
        params: { expenseCardId: expenseCardId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenseCards'] })
      toast.success('ExpenseCard Deleted')
    }
  })
  
  const columns = useMemo<ColumnDef<ExpenseCard>[]>(
    () => [

      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code || t('-'), 'code'),
      },
      {
        header: t('description'),
        accessorFn: safeAccessor((row) => row.description || t('-'), 'description'),
      },
      {
        header: t('unit'),
        accessorFn: safeAccessor((row) => row.unit?.name || t('noUnit'), 'unit'),
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

  const ExpenseCardListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newExpenseCard')}
        </Button>
      </>
    )
  }
  const endpoint = 'expenseCards'

  return (
    <>
      <PageTitle
        title={t('ExpenseCardList')}
        actions={<ExpenseCardListActions />}
      />

      <BaseTable<ExpenseCard> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}