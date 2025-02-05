
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
export const ProposalsList = () => {
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
  
  const { mutate: deleteProposals } = useMutation({
    mutationFn: async (ProposalsId: string) => {
      return await apiRequest({
        endpoint: 'ProposalsDelete',
        method: 'DELETE',
        params: { ProposalsId: ProposalsId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Proposalss'] })
      toast.success('Proposals Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteProposals(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteProposals])
  const columns = useMemo<ColumnDef<Proposals>[]>(
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

  const ProposalsListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newProposals')}
        </Button>
      </>
    )
  }
  const endpoint = 'Proposalss'

  return (
    <>
      <PageTitle
        title={t('ProposalsList')}
        actions={<ProposalsListActions />}
      />

      <BaseTable<Proposals> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}