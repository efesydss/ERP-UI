import { BaseTable } from '@/components/Common/Table/BaseTable'
import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { useQuery } from '@tanstack/react-query'
import { PersonnelData } from '@/components/Hr/Personnel/typesPersonnel'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { apiRoutes } from '@/utils/apiRoutes'
import { Link } from '@tanstack/react-router'

export const Personnel = () => {
  const { t: common } = useTranslation('common')
  const { t: hr } = useTranslation('hr')

  const { data } = useQuery({
    queryKey: ['personnelData'],
    queryFn: () => apiRequest<ApiResponse<PersonnelData>>(apiRoutes.personnelList),
    enabled: false
  })

  const columns = useMemo<ColumnDef<PersonnelData>[]>(
    () => [
      {
        header: common('fullName'),
        accessorFn: (originalRow) => `${originalRow.name} ${originalRow.surname}`
      },
      {
        header: hr('department'),
        accessorKey: 'department'
      }
    ],
    []
  )

  const PersonnelListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          startIcon={<PersonAddAlt1Icon />}
        >
          {hr('newPersonnel')}
        </Button>
      </>
    )
  }

  return (
    <div>
      <div>
        <PageTitle
          title={hr('personnelTitle')}
          actions={<PersonnelListActions />}
        />
      </div>
      <Link
        to={'/hr/personnel/$id'}
        params={{
          id: 1
        }}
      >
        p.detail
      </Link>
      <BaseTable
        columns={columns}
        data={data?.data}
      />
    </div>
  )
}
