import { BaseTable } from '@/components/Common/Table/BaseTable'//Bu bileşen, tabloyu oluşturmak için kullanılan genel bir bileşen. Diğer bileşenlerden ve props'lardan aldığı verilerle tabloyu render eder.
import { ChangeEvent, useMemo, useState } from 'react'//Performans optimizasyonu için kullanılan bir hook. Tablonun sütunlarını yeniden hesaplamaktan kaçınmak için kullanılır.
import { ColumnDef } from '@tanstack/react-table'//Her bir sütunun tanımlandığı yapı. Sütun başlıkları, veri anahtarları ve özel işlevler bu yapıda tanımlanır.
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { useTranslation } from 'react-i18next'// Çoklu dil desteği sağlamak için kullanılan hook.
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
        accessorFn: (row) => row.department.name,//: Verinin nasıl işleneceğini tanımlayan bir fonksiyondur. Örneğin, department.name verisine erişmek için kullanılır.
        meta: {//meta alanı, filtreleme ve diğer özellikler için ek bilgiler içerir.
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
  }//buradan devam edecek

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
      /***endpoint: Veri kaynağını belirtir. Bu örnekte, employees API endpoint'i kullanılıyor. */
      <BaseTable<EmployeeResponse>
        endpoint={'employees'}
        /***namedFilters: Eğer checked true ise show_passives filtresi uygulanıyor. */
        namedFilters={checked ? ['show_passives'] : []}
        columns={columns}//columns: Önceden tanımlanmış sütun yapılandırmaları burada kullanılıyor.
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
