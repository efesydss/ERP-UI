import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { CashAccount, CashAccountBaseProps } from './typesCashAccount'
import { CashAccountGrid } from '../Common/DataGrid/CashAccountGrid'

export const CashAccountList = () => {
  const { t } = useTranslation()

  const columns = useMemo<ColumnDef<CashAccount>[]>(
    () => [
      {
        header: t('accountName'),
        accessorKey: 'accountName'
      },
      {
        header: t('balance'),
        accessorKey: 'balance'
      },
      {
        header: t('common:name'),
        accessorKey: 'name',
        enableSorting: false
      }
    ],
    [t]
  )
  return (
    <>
      <PageTitle title={t('nav:cashAccounts')} />

      <BaseTable<CashAccountBaseProps>//CashAccount nesnesi ile VacationStatus nesnesi temsili olarak eşittir kontrol et!
        endpoint={'cashAccounts'}
        columns={columns}
        renderSubComponent={(props) => <CashAccountGrid cashAccountId={props.row.original.id} />}
      />
    </>
  )
}
