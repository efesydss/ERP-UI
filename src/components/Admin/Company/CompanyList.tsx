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
import { Company } from '@/components/Admin/Company/types/typesCompany'
import { Route } from '@/routes/_authenticated/admin/companies/new'

export const CompanyList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deleteCompany(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
  const { mutate: deleteCompany } = useMutation({
    mutationFn: async (companyId: string) => {
      return await apiRequest({
        endpoint: 'companyDelete',
        method: 'DELETE',
        params: { companyId: companyId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
      toast.success('Company Deleted')
    }
  })
  const safeAccessor = (accessorFn: (row: any) => any, columnName: string) => {
    return (row: any) => {
      try {
        const result = accessorFn(row);
        return result;
      } catch (error) {
        console.error(`Error in column "${columnName}"`, error, row);
        return 'Error';
      }
    };
  };
  const columns = useMemo<ColumnDef<Company>[]>(
    () => [
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code || t('-'), 'code'),
      },
      {
        header: t('title'),
        accessorFn: safeAccessor((row) => row.title || t('-'), 'title'),
      },
      {
        header: t('address'),
        accessorFn: safeAccessor((row) => row.address || t('-'), 'address'),
      },
      {
        header: t('phone'),
        accessorFn: safeAccessor((row) => row.phone || t('-'), 'phone'),
      },
      {
        header: t('phoneBackup'),
        accessorFn: safeAccessor((row) => row.phoneBackup || t('-'), 'phoneBackup'),
      },
      {
        header: t('taxAdmin'),
        accessorFn: safeAccessor((row) => row.taxAdmin || t('-'), 'taxAdmin'),
      },
      {
        header: t('taxNumber'),
        accessorFn: safeAccessor((row) => row.taxNumber || t('-'), 'taxNumber'),
      },
      {
        header: t('branch'),
        accessorFn: (row) => row.branch?.title || t('noBranch')
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


  const CompanyListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCompany')}
        </Button>
      </>
    )
  }
  const endpoint = 'companies'

  return (
    <>
      <PageTitle
        title={t('CompanyList')}
        actions={<CompanyListActions />}
      />

      <BaseTable<Company> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}