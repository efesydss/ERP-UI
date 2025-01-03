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
import { CurrentAccount } from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount'
import { Route } from '@/routes/_authenticated/purchasing/currentAccounts/new'

export const CurrentAccountList = () => {
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

  const { mutate: deleteCurrentAccount } = useMutation({
    mutationFn: async (currentAccountId: string) => {
      return await apiRequest({
        endpoint: 'currentAccountDelete',
        method: 'DELETE',
        params: { currentAccountId: currentAccountId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAccounts'] })
      toast.success('Current Account Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteCurrentAccount(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteCurrentAccount])
  const columns = useMemo<ColumnDef<CurrentAccount>[]>(
    () => [
      {
        header: t('title'),
        accessorFn: safeAccessor((row) => row.title, 'title')
      },
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code, 'code')
      },
      {
        header: t('active'),
        accessorFn: safeAccessor((row) => row.active, 'active')
      },
      {
        header: t('sector'),
        accessorFn: safeAccessor((row) => row.sector, 'sector')
      },
      {
        header: t('contactInformation'),
        accessorFn: safeAccessor((row) => row.contactInformation, 'contactInformation')
      },
      {
        header: t('bankAccount'),
        accessorFn: safeAccessor((row) => row.bankAccount, 'bankAccount')
      },
      {
        header: t('currentAccountBankAccounts'),
        accessorFn: safeAccessor((row) => row.currentAccountBankAccounts, 'currentAccountBankAccounts')
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

  const CurrentAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCurrentAccount')}
        </Button>
      </>
    )
  }
  const endpoint = 'currentAccounts'

  return (
    <>
      <PageTitle
        title={t('CurrentAccountList')}
        actions={<CurrentAccountListActions />}
      />

      <BaseTable<CurrentAccount> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}