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
        header: t('Name'),
        accessorKey: 'name'
      },
      {
        header: t('Code'),
        accessorKey: 'code'
      },
      {
        header: t('currency'),
        accessorKey: 'currency',
        enableSorting: true
      }
    ],
    [t]
  )
  return (
    <>
      <PageTitle title={t('Cash Accounts')} />

      <BaseTable<CashAccountBaseProps>
        endpoint={'cashAccounts'}
        columns={columns}
        renderSubComponent={(props) => <CashAccountGrid cashAccountId={props.row.original.id} />}
      />
    </>
  )
}
