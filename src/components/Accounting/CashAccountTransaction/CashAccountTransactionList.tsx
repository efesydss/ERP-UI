
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
export const CashAccountTransactionList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteCashAccountTransaction(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
    const safeAccessor = <T, >(accessorFn: (row: T) => unknown, columnName: string) => {
    return (row: T) => {
      try {
        return accessorFn(row)
      } catch (error) {
        
        return 'Error'
      }
    }
  }
  
  const { mutate: deleteCashAccountTransaction } = useMutation({
    mutationFn: async (CashAccountTransactionId: string) => {
      return await apiRequest({
        endpoint: 'CashAccountTransactionDelete',
        method: 'DELETE',
        params: { CashAccountTransactionId: CashAccountTransactionId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CashAccountTransactions'] })
      toast.success('CashAccountTransaction Deleted')
    }
  })
  
  const columns = useMemo<ColumnDef<CashAccountTransaction>[]>(
    () => [
      {
        header: t('name'),
         accessorFn: safeAccessor((row) => row.bankName, 'bankName')
      },
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.bankName, 'bankName')
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
  const endpoint = 'CashAccountTransactions'

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