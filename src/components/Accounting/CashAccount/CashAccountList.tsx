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
import { CashAccount } from '@/components/Accounting/CashAccount/types/typesCashAccount'
import { Route } from '@/routes/_authenticated/accounting/cashAccounts/new'

export const CashAccountList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: deleteCashAccount } = useMutation({
    mutationFn: async (cashAccountId: string) => {
      return await apiRequest({
        endpoint: 'cashAccountDelete',
        method: 'DELETE',
        params: { cashAccountId: cashAccountId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cashAccounts'] })
      toast.success('Cash Account Deleted')
    }
  })

  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteCashAccount(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteCashAccount])
  const safeAccessor = <T, >(accessorFn: (row: T) => unknown) => {
    return (row: T) => {
      try {
        return accessorFn(row)
      } catch (error) {

        return 'Error'
      }
    }
  }


  const columns = useMemo<ColumnDef<CashAccount>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name)
      },
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code)
      },
      {
        header: t('currency'),
        accessorFn: safeAccessor((row) => row.currency)
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

  const CashAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCashAccount')}
        </Button>
      </>
    )
  }
  const endpoint = 'cashAccounts'

  return (
    <>
      <PageTitle
        title={t('CashAccountList')}
        actions={<CashAccountListActions />}
      />

      <BaseTable<CashAccount> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}