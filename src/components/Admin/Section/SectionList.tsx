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
import { Section } from '@/components/Admin/Section/types/typesSection'
import { Route } from '@/routes/_authenticated/admin/sections/new'

export const SectionList = () => {
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
  const { mutate: deleteSection } = useMutation({
    mutationFn: async (sectionId: string) => {
      return await apiRequest({
        endpoint: 'sectionDelete',
        method: 'DELETE',
        params: { sectionId: sectionId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] })
      toast.success('Section Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteSection(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteSection])
  const columns = useMemo<ColumnDef<Section>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name, 'name')
      },

      {
        header: t('employee'),
        accessorFn: safeAccessor((row) => row.employee?.name || t('noEmployee'), 'employee')
      },
      {
        header: t('department'),
        accessorFn: safeAccessor((row) => row.department?.name || t('noDepartment'), 'department')
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

  const SectionListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newSection')}
        </Button>
      </>
    )
  }
  const endpoint = 'sections'

  return (
    <>
      <PageTitle
        title={t('SectionList')}
        actions={<SectionListActions />}
      />

      <BaseTable<Section> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}