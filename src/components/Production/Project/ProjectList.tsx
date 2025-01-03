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
import { Project } from '@/components/Production/Project/types/typesProject'
import { Route } from '@/routes/_authenticated/production/projects/new'

export const ProjectList = () => {
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

  const { mutate: deleteProject } = useMutation({
    mutationFn: async (projectId: string) => {
      return await apiRequest({
        endpoint: 'projectDelete',
        method: 'DELETE',
        params: { projectId: projectId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteProject(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteProject])
  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.code, 'bankName')
      },
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.name, 'bankName')
      },
      {
        header: t('currentAccount'),
        accessorFn: safeAccessor((row) => row.currentAccount?.title, 'currentAccount')
      },
      {
        header: t('employee'),
        accessorFn: safeAccessor((row) => row.employee?.name, 'employee')
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

  const ProjectListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newProject')}
        </Button>
      </>
    )
  }
  const endpoint = 'projects'

  return (
    <>
      <PageTitle
        title={t('ProjectList')}
        actions={<ProjectListActions />}
      />

      <BaseTable<Project> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}