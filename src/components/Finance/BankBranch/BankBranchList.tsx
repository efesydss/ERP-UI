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
import { BankBranch } from '@/components/Finance/BankBranch/types/typesBankBranch'
import { Route } from '@/routes/_authenticated/finance/bankBranches/new'

export const BankBranchList = () => {
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

  const { mutate: deleteBankBranch } = useMutation({
    mutationFn: async (bankBranchId: string) => {
      return await apiRequest({
        endpoint: 'bankBranchDelete',
        method: 'DELETE',
        params: { bankBranchId: bankBranchId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankBranches'] })
      toast.success('BankBranch Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteBankBranch(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteBankBranch])
  const columns = useMemo<ColumnDef<BankBranch>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name, 'name')
      },
      {
        header: t('bank'),
        accessorFn: safeAccessor((row) => row.bank?.bankName, 'bank')
      },
      {
        header: t('relatedEmployee'),
        accessorFn: safeAccessor((row) => row.relatedEmployee, 'relatedEmployee')
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

  const BankBranchListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newBankBranch')}
        </Button>
      </>
    )
  }
  const endpoint = 'bankBranches'

  return (
    <>
      <PageTitle
        title={t('BankBranchList')}
        actions={<BankBranchListActions />}
      />

      <BaseTable<BankBranch> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}