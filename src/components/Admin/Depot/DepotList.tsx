import { useNavigate } from '@tanstack/react-router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DepotResponse } from './typesDepot'
import { ColumnDef } from '@tanstack/react-table'
import { Box, Button, FormControlLabel, Switch } from '@mui/material'
import { PersonAddAlt1Sharp } from '@mui/icons-material'
import { Route } from '@/routes/_authenticated/admin'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { DetailsSubRow } from '@/components/Admin/Depot/DetailSubRow'

export const DepotList = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  const columns = useMemo<ColumnDef<DepotResponse>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name'
      }
    ],
    [t]
  )

  const DepotListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Sharp />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newDepot')}
        </Button>
      </>
    )
  }

  ///Buradan devam edecek  // EmployeeList.tsx satır:66
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <>
      <PageTitle
        title={t('DepotList')}
        actions={<DepotListActions />}
      />
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              size="small"
            />

          }
          label={t('togglePassive')}
        />
      </Box>

      <BaseTable<DepotResponse>
        endpoint={'depots'}
        namedFilters={checked ? ['show_passives'] : []}
        columns={columns}
        renderSubComponent={(props) => (
          <DetailsSubRow
            depotId={props.row.original.id}
            row={props.row}
          />
        )}
      />
    </>
  )

}