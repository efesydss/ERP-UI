
import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
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
import { ColumnDef } from '@tanstack/react-table'
import { CashAccountTransaction } from '@/components/Accounting/CashAccountTransaction/types/typesCashAccountTransaction'
import { Route } from '@/routes/_authenticated/accounting/cashAccountTransactions/new'


export const CashAccountTransactionList = () => {
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
  
  const { mutate: deleteCashAccountTransaction } = useMutation({
    mutationFn: async (CashAccountTransactionId: string) => {
      return await apiRequest({
        endpoint: 'cashAccountTransactionDelete',
        method: 'DELETE',
        params: { CashAccountTransactionId: CashAccountTransactionId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashAccountTransactions'] })
      toast.success('CashAccountTransaction Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteCashAccountTransaction(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteCashAccountTransaction])
  const columns = useMemo<ColumnDef<CashAccountTransaction>[]>(
    () => [

      {
        header: t('date'),
        accessorFn: safeAccessor((row) => row.date, 'date')
      },
      {
        header: t('cashAccount'),
        accessorFn: safeAccessor((row) => row.cashAccount?.name, 'cashAccount')
      },
      {
        header: t('currentAccount'),
        accessorFn: safeAccessor((row) => row.currentAccount?.title, 'currentAccount')
      },
      {
        header: t('description'),
        accessorFn: safeAccessor((row) => row.description, 'description')
      },
      {
        header: t('debtStatus'),
        accessorFn: safeAccessor((row) => row.debtStatus, 'debtStatus')
      },
      {
        header: t('total'),
        accessorFn: safeAccessor((row) => row.total, 'total')
      },
      {
        header: t('balance'),
        accessorFn: safeAccessor((row) => row.balance, 'balance')
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

  const CashAccountTransactionListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCashAccountTransaction')}
        </Button>
      </>
    )
  }
  const endpoint = 'cashAccountTransactions'

  return (
    <>
      <PageTitle
        title={t('CashAccountTransactionList')}
        actions={<CashAccountTransactionListActions />}
      />

      <BaseTable<CashAccountTransaction> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}