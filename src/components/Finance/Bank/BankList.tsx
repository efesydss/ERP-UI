
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
import { Bank } from '@/components/Finance/Bank/types/typesBank'
import { Route } from '@/routes/_authenticated/finance/banks/new'
export const BankList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteBank(id.toString())
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
  const { mutate: deleteBank } = useMutation({
    mutationFn: async (bankId: string) => {
      return await apiRequest({
        endpoint: 'bankDelete',
        method: 'DELETE',
        params: { bankId: bankId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Banks'] })
      toast.success('Bank Deleted')
    }
  })
  
  const columns = useMemo<ColumnDef<Bank>[]>(
    () => [
      {
        header: t('bankName'),
        accessorFn: safeAccessor((row) => row.bankName, 'bankName')
      },
      {
        header: t('bankShortName'),
        accessorFn: safeAccessor((row) => row.bankShortName, 'bankShortName')
      },
      {
        header: t('swiftCode'),
        accessorFn: safeAccessor((row) => row.swiftCode, 'swiftCode')
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

  const BankListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newBank')}
        </Button>
      </>
    )
  }
  const endpoint = 'banks'

  return (
    <>
      <PageTitle
        title={t('BankList')}
        actions={<BankListActions />}
      />

      <BaseTable<Bank> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}