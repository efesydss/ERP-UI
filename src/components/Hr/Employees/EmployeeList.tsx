import { BaseTable } from '@/components/Common/Table/BaseTable'
import { ChangeEvent, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useTranslation } from 'react-i18next'
import { Box, Button, FormControlLabel, Switch } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/_authenticated/hr/employees/new'
import { DetailsSubRow } from '@/components/Hr/Employees/components/DetailsSubRow'

export const EmployeeList = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)

  
  const columns = useMemo<ColumnDef<EmployeeResponse>[]>(//Tablo Sütunları Tanımlaması
    () => [
      {
        header: t('name'),
        accessorKey: 'name'//accessors verileri bağlamk için kullanılır 
      },
      {
        header: t('surname'),
        accessorKey: 'surname'//Veriyi tablodaki satırlara bağlayan anahtar.
      },
      {
        header: t('department'),
        accessorKey: 'department',
        accessorFn: (row) => row.department.name,
        meta: {
          filterVariant: 'select',//filterVariant: 'select' ile seçmeli filtreleme özelliği sağlanır.
          filterOptionsEndpoint: 'departments'
        }
      },
      {
        header: t('companyBranch'),
        accessorKey: 'companyBranch',
        accessorFn: (row) => row.companyBranch.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'branches'
        }
      }
    ],
    [t]
  )

  const PersonnelListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newPersonnel')}
        </Button>
      </>
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  return (
    <>

      <PageTitle
        title={t('personnelList')}
        actions={<PersonnelListActions />}
      />

      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              size='small'
            />
          }
          label={t('togglePassive')}
        />
      </Box>



      <BaseTable<EmployeeResponse>
        endpoint={'employees'}

        namedFilters={checked ? ['show_passives'] : []}
        columns={columns}
        renderSubComponent={(props) => (
          <DetailsSubRow

            employeeId={props.row.original.id}//props.row.original, tabloya sağlanan verinin orijinal haliyle temsil edildiği bir nesnedir.
            row={props.row}
            handleExpandRow={props.handleExpandRow}
          />
        )}
      />
    </>
  )
}
