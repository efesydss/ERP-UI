import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { CashAccount, CashAccountBaseProps } from './typesCashAccount'
import { CashAccountGrid } from '../Common/DataGrid/CashAccountGrid'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/accounting/cashAccounts/new'//TODO ef : bunu formun yoluyla değiştirirsen biticek galiba.
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@mui/material'


export const CashAccountList = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()


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
  const CashAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newCashAccount')}
        </Button>
      </>
    )
  }

  return (
    <>
      <PageTitle title={t('Cash Accounts')}
      actions={<CashAccountListActions />} 
      />
      <BaseTable<CashAccountBaseProps>
        endpoint={'cashAccounts'}
        columns={columns}
        renderSubComponent={(props) => <CashAccountGrid cashAccountId={props.row.original.id} />}
      />
    </>
  )
}
