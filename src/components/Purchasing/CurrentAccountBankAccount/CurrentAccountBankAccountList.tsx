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
  CurrentAccountBankAccount
} from '@/components/Purchasing/CurrentAccountBankAccount/types/typesCurrentAccountBankAccount'
import { Route } from '@/routes/_authenticated/purchasing/currentAccountBankAccounts/new'


export const CurrentAccountBankAccountList = () => {
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

        console.log(columnName + ' error')
        return 'Error'
      }
    }
  }

  const { mutate: deleteCurrentAccountBankAccount } = useMutation({
    mutationFn: async (currentAccountBankAccountId: string) => {
      return await apiRequest({
        endpoint: 'currentAccountBankAccountDelete',
        method: 'DELETE',
        params: { currentAccountBankAccountId: currentAccountBankAccountId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAccountBankAccounts'] })
      toast.success('Current Account Bank Account Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteCurrentAccountBankAccount(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteCurrentAccountBankAccount])

  const columns = useMemo<ColumnDef<CurrentAccountBankAccount>[]>(
    () => [
      {
        header: t('iban'),
        accessorFn: safeAccessor((row) => row.iban, 'iban')
      },
      {
        header: t('accountNumber'),
        accessorFn: safeAccessor((row) => row.accountNumber, 'accountNumber')
      },
      {
        header: t('currency'),
        accessorFn: safeAccessor((row) => row.currency, 'currency')
      },
      {
        header: t('bank'),
        accessorFn: safeAccessor((row) => row.bank?.bankName, 'bank')
      },
      {
        header: t('branch'),
        accessorFn: safeAccessor((row) => row.branch, 'branch')
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

  const CurrentAccountBankAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCurrentAccountBankAccount')}
        </Button>
      </>
    )
  }
  const endpoint = 'currentAccountBankAccounts'

  return (
    <>
      <PageTitle
        title={t('CurrentAccountBankAccountList')}
        actions={<CurrentAccountBankAccountListActions />}
      />

      <BaseTable<CurrentAccountBankAccount> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}