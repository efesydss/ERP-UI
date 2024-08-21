import { BaseTable } from '@/components/Common/Table/BaseTable'
import { VacationStatus } from 'components/Hr/Vacations/typeVacations'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { VacationGrid } from '@/components/Common/DataGrid/VacationGrid'

export const VacationList = () => {
  const { t } = useTranslation()

  const columns = useMemo<ColumnDef<VacationStatus>[]>(
    () => [
      {
        header: t('common:name'),
        accessorKey: 'employee.name'
      },
      {
        header: t('common:surname'),
        accessorKey: 'employee.surname'
      },
      {
        header: t('common:profession'),
        accessorKey: 'profession'
      },
      {
        header: t('common:department'),
        accessorKey: 'employee.department',
        accessorFn: (row) => row.employee.department.name,
        meta: {
          filterVariant: 'select',
          filterOptionsEndpoint: 'departments'
        }
      },
      {
        header: t('common:transferred'),
        accessorKey: 'transferred',
        enableSorting: false
      },
      {
        header: t('common:usedCurrentYear'),
        accessorKey: 'usedCurrentYear',
        enableSorting: false
      },
      {
        header: t('common:usable'),
        accessorKey: 'usable',
        enableSorting: false
      }
    ],
    [t]
  )
  return (
    <>
      <PageTitle title={t('nav:vacations')} />

      <BaseTable<VacationStatus>
        endpoint={'employeeVacationStatuses'}
        columns={columns}
        renderSubComponent={(props) => <VacationGrid employeeId={props.row.original.employee.id} />}
      />
    </>
  )
}
