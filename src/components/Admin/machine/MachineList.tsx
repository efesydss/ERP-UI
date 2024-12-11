import { useTranslation } from 'react-i18next'
import { Machines } from '@/components/Admin/typesMachines'
import { ColumnDef } from '@tanstack/react-table'
import { BaseTable } from '@/components/Common/Table/BaseTable'
import { ChangeEvent, useMemo } from 'react'
import { DetailsSubRow } from '@/components/Hr/Employees/components/DetailsSubRow'
import { Box, Button, FormControlLabel, Switch } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/admin/machines/new'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'

export const MachineList = () => {
  const { t } = useTranslation('common')

  const navigate = useNavigate()

  const [checked, setChecked] = useState(false)

  // 2. Tablo sütunlarını tanımlama
  const columns = useMemo<ColumnDef<Machines>[]>(
    () => [
      {
        header: t('code'),
        accessorKey: 'code'
      },
      {
        header: t('description'),
        accessorKey: 'description'
      },
      {
        header: t('employee'),
        accessorFn: (row) => row.employee?.name || t('noEmployee') // Eğer `employee` null ise fallback kullan
      }
    ],
    [t]
  )

  const MachineListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newMachine')}
        </Button>
      </>
    )
  }
  const endpoint = 'machines'
  console.log(`Fetching data from endpoint: ${endpoint}`)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <>
      <PageTitle
        title={t('machineList')}
        actions={<MachineListActions />}
      />
    <Box>
      {/*<FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            size='small'
          />
        }
        label={t('togglePassive')}
      />*/
      }
    </Box>
    <BaseTable<Machines> endpoint={endpoint} columns={columns}
                         renderSubComponent={(props) => (
                           <DetailsSubRow

                             employeeId={props.row.original.id}//props.row.original, tabloya sağlanan verinin orijinal haliyle temsil edildiği bir nesnedir.
                             row={props.row}
                             handleExpandRow={props.handleExpandRow}
                           />
                         )}
    ></BaseTable>

    </>
  )
}