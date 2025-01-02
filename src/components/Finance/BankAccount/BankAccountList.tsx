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
import { BankAccount } from '@/components/Finance/BankAccount/types/typesBankAccount'
import { Route } from '@/routes/_authenticated/finance/bankAccounts/new'

export const BankAccountList = () => {
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
  const { mutate: deleteBankAccount } = useMutation({
    mutationFn: async (bankAccountId: string) => {
      return await apiRequest({
        endpoint: 'bankAccountDelete',
        method: 'DELETE',
        params: { bankAccountId: bankAccountId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('BankAccount Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteBankAccount(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteBankAccount])
  const columns = useMemo<ColumnDef<BankAccount>[]>(
    () => [

      {
        header: t('accountNumber'),
        accessorFn: safeAccessor((row) => row.accountNumber, 'accountNumber')
      },
      {
        header: t('iban'),
        accessorFn: safeAccessor((row) => row.iban, 'iban')
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

  const BankAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newBankAccount')}
        </Button>
      </>
    )
  }
  const endpoint = 'bankAccounts'

  return (
    <>
      <PageTitle
        title={t('BankAccountList')}
        actions={<BankAccountListActions />}
      />

      <h1>Burada böyle bir path var nasıl olacak /api/finance/bankBranch/id/accounts </h1>
      <BaseTable<BankAccount> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}