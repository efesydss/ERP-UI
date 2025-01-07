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
import { Invoice } from '@/components/Purchasing/Invoice/types/typesInvoice'
import { Route } from '@/routes/_authenticated/purchasing/invoices/new'

export const InvoiceList = () => {

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

  const { mutate: deleteInvoice } = useMutation({
    mutationFn: async (invoiceId: string) => {
      return await apiRequest({
        endpoint: 'invoiceDelete',
        method: 'DELETE',
        params: { invoiceId: invoiceId?.toString() ?? '0' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success('Invoice Deleted')
    }
  })
  const handleDeleteClick = useCallback(
    (id: GridRowId) => () =>
      openDialog(
        'Confirm Deletion',
        'Are you sure you want to delete this item?',
        () => {
          deleteInvoice(id.toString())
        },
        () => {
          console.log('Deletion cancelled')
        }
      ),
    [openDialog, deleteInvoice])
  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        header: t('code'),
        accessorFn: safeAccessor((row) => row.code, 'code')
      },
      {
        header: t('date'),
        accessorFn: safeAccessor((row) => row.date, 'date')
      },
      {
        header: t('warehouseBranch'),
        accessorFn: safeAccessor((row) => row.warehouseBranch, 'warehouseBranch')
      },
      {
        header: t('specialCode'),
        accessorFn: safeAccessor((row) => row.specialCode, 'specialCode')
      },
      {
        header: t('currency'),
        accessorFn: safeAccessor((row) => row.currency, 'currency')
      },
      {
        header: t('fixedCurrency'),
        accessorFn: safeAccessor((row) => row.fixedCurrency, 'fixedCurrency')
      },
      {
        header: t('fixedCurrencyValue'),
        accessorFn: safeAccessor((row) => row.fixedCurrencyValue, 'fixedCurrencyValue')
      },
      {
        header: t('invoiceItems'),
        accessorFn: safeAccessor((row) => row.invoiceItems, 'invoiceItems')
      },
      {
        header: t('generalDiscount'),
        accessorFn: safeAccessor((row) => row.generalDiscount, 'generalDiscount')
      },
      {
        header: t('unitDiscount'),
        accessorFn: safeAccessor((row) => row.unitDiscount, 'unitDiscount')
      },
      {
        header: t('totalVat'),
        accessorFn: safeAccessor((row) => row.totalVat, 'totalVat')
      },
      {
        header: t('totalAdditionalCosts'),
        accessorFn: safeAccessor((row) => row.totalAdditionalCosts, 'totalAdditionalCosts')
      },
      {
        header: t('subTotal'),
        accessorFn: safeAccessor((row) => row.subTotal, 'subTotal')
      },
      {
        header: t('finalTotal'),
        accessorFn: safeAccessor((row) => row.finalTotal, 'finalTotal')
      },
      {
        header: t('invoiceTypeEnum'),
        accessorFn: safeAccessor((row) => row.invoiceTypeEnum, 'invoiceTypeEnum')
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

  const InvoiceListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newInvoice')}
        </Button>
      </>
    )
  }
  const endpoint = 'invoices'

  return (
    <>
      <PageTitle
        title={t('InvoiceList')}
        actions={<InvoiceListActions />}
      />

      <BaseTable<Invoice> endpoint={endpoint} columns={columns}

      ></BaseTable>

    </>
  )
}