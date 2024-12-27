import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { PaymentMethod } from '@/components/Admin/PaymentMethod/types/typesPaymentMethod'
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
import { Route } from '@/routes/_authenticated/admin/paymentMethods/new'
export const PaymentMethodList = () => {
  const { t } = useTranslation('common')
  const { openDialog } = useConfirmDialog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const handleDeleteClick = (id: GridRowId) => () =>
    openDialog(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      () => {
        deletePaymentMethod(id.toString())
      },
      () => {
        console.log('Deletion cancelled')
      }
    )
  const { mutate: deletePaymentMethod } = useMutation({
    mutationFn: async (PaymentMethodId: string) => {
      return await apiRequest({
        endpoint: 'paymentMethodDelete',
        method: 'DELETE',
        params: { PaymentMethodId: PaymentMethodId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] })
      toast.success('PaymentMethod Deleted')
    }
  })
  const safeAccessor = (accessorFn: (row: any) => any, columnName: string) => {
    return (row: any) => {
      try {
        const result = accessorFn(row)
        return result
      } catch (error) {
        console.error(`Error in column "${columnName}"`, error, row)
        return 'Error'
      }
    }
  }
  const columns = useMemo<ColumnDef<PaymentMethod>[]>(
    () => [
      {
        header: t('name'),
        accessorFn: safeAccessor((row) => row.name || t('-'), 'name'),
      },
      {
        header: t('code'),
       accessorFn: safeAccessor((row) => row.code || t('-'), 'code'),
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

  const PaymentMethodListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newPaymentMethod')}
        </Button>
      </>
    )
  }
  const endpoint = 'paymentMethods'

  return (
    <>
      <PageTitle
        title={t('PaymentMethodList')}
        actions={<PaymentMethodListActions />}
      />

      <BaseTable<PaymentMethod> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}