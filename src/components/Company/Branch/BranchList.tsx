
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
import { Branch } from '@/components/Company/Branch/types/typesBranch'
import {Route } from '@/routes/_authenticated/company/branches/new'
export const BranchList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteBranch(id.toString())
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
  const { mutate: deleteBranch } = useMutation({
    mutationFn: async (branchId: string) => {
      return await apiRequest({
        endpoint: 'branchDelete',
        method: 'DELETE',
        params: { branchId: branchId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['branches'] })
      toast.success('Branch Deleted')
    }
  })
  
  const columns = useMemo<ColumnDef<Branch>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name || t('-'), 'name'),
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

  const BranchListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newBranch')}
        </Button>
      </>
    )
  }
  const endpoint = 'branches'

  return (
    <>
      <PageTitle
        title={t('BranchList')}
        actions={<BranchListActions />}
      />

      <BaseTable<Branch> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}