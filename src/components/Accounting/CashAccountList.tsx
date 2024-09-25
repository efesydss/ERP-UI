import { BaseTable } from '@/components/Common/Table/BaseTable';
import { ChangeEvent, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import { PageTitle } from '@/components/Common/PageTitle/PageTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/_authenticated/accounting/cashAccounts';  
import { CashAccount } from './typesCashAccount';  

export const CashAccounts = () => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

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
        enableSorting:false
      }
    ],
    [t]
  );

  const CashAccountListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate({ to: Route.fullPath })}  // Route kısmını düzenlemelisin
        >
          {t('newCashAccount')}
        </Button>
      </>
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <PageTitle title={t('nav:vacations')} />

      <BaseTable<CashAccount>
        endpoint={'cashAccount'}
        columns={columns}
        renderSubComponent={(props) => <CashAccounts cashAccountId={props.row.original.cashAccount.id} />}
      />
    </>
  )
}

