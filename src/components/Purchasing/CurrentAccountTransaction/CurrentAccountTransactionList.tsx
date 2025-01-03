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
import {
  CurrentAccountTransaction
} from '@/components/Purchasing/CurrentAccountTransaction/types/typesCurrentAccountTransaction'
import { Route } from '@/routes/_authenticated/purchasing/currentAccountTransactions/new'

export const CurrentAccountTransactionList = () => {
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

  const { mutate: deleteCurrentAccountTransaction } = useMutation({
    mutationFn: async (currentAccountTransactionId: string) => {
      return await apiRequest({
        endpoint: 'currentAccountTransactionDelete',
        method: 'DELETE',
        params: { currentAccountTransactionId: currentAccountTransactionId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAccountTransactions'] })
      toast.success('Current Account Transaction Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteCurrentAccountTransaction(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteCurrentAccountTransaction])
  const columns = useMemo<ColumnDef<CurrentAccountTransaction>[]>(
    () => [
      {
        header: t('date'),
        accessorFn: safeAccessor((row) => row.date, 'date')
      },
      {
        header: t('currentAccount'),
        accessorFn: safeAccessor((row) => row.currentAccount?.title ?? '', 'currentAccount')
      },
      {
        header: t('description'),
        accessorFn: safeAccessor((row) => row.description, 'description')
      },
      {
        header: t('transactionType'),
        accessorFn: safeAccessor((row) => row.transactionType, 'transactionType')
      },
      {
        header: t('paymentType'),
        accessorFn: safeAccessor((row) => row.paymentType, 'paymentType')
      },
      {
        header: t('bankAccount'),
        accessorFn: safeAccessor((row) => row.bankAccount?.accountNumber ?? '', 'bankAccount')
      },
      {
        header: t('transactionFee'),
        accessorFn: safeAccessor((row) => row.transactionFee, 'transactionFee')
      },
      {
        header: t('debtType'),
        accessorFn: safeAccessor((row) => row.debtType, 'debtType')
      },
      {
        header: t('amount'),
        accessorFn: safeAccessor((row) => row.amount, 'amount')
      },
      {
        header: t('currency'),
        accessorFn: safeAccessor((row) => row.currency, 'currency')
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

  const CurrentAccountTransactionListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCurrentAccountTransaction')}
        </Button>
      </>
    )
  }
  const endpoint = 'currentAccountTransactions'

  return (
    <>
      <PageTitle
        title={t('CurrentAccountTransactionList')}
        actions={<CurrentAccountTransactionListActions />}
      />

      <BaseTable<CurrentAccountTransaction> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}