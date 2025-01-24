import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useNavigate } from '@tanstack/react-router'
import { Box, Button, Typography } from '@mui/material'
import { Route } from '@/routes/_authenticated/purchasing/purchaseOrders/new'
import { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { PurchaseOrder } from '@/components/Purchasing/PurchaseOrder/types/typesPurchaseOrder'

export const PurchaseOrderList = () => {
  const { t } = useTranslation('common')

  const navigate = useNavigate()

  const endpoint = 'purchaseOrders'
  const [pagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting] = useState<MRT_SortingState>([])
  const method = 'POST'
  const sortingOptions = () => {
    if (sorting.length) {
      return sorting.map(({ id, desc }) => `${id},${desc ? 'desc' : 'asc'}`).join(';')
    }
    return 'id,desc'
  }

  const { data: apiResponse } = useQuery({
    queryKey: [endpoint, pagination, sorting],
    queryFn: () =>
      apiRequest<ApiResponse<PurchaseOrder>>({
        endpoint,
        method,
        payload: {
          filter: '',
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize
        }

      })

  })
  useEffect(() => {
    if (apiResponse) {
      console.log('API Response:', apiResponse)
    }
  }, [apiResponse])

  const data = apiResponse?.data || []
  //createData

  const columns = useMemo<MRT_ColumnDef<PurchaseOrder>[]>(
    //column definitions...
    () => [

      {
        accessorFn: (row) => row.name,
        header: 'Name'
      },
      {
        accessorFn: (row) => row.description,
        header: 'Description'
      },
      {
        accessorFn: (row) => row.date,
        header: 'Date'
      },
      {
        accessorFn: (row) => row.employee?.name,
        header: 'Employee'
      },
      {
        accessorFn: (row) => row.project?.name,
        header: 'Project'
      }
    ],
    []
    //end
  )

  const PurchaseOrderListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {t('newPurchaseOrder')}
        </Button>
      </>
    )
  }


  return (
    <>
      <PageTitle
        title={t('PurchaseOrderList')}
        actions={<PurchaseOrderListActions />}
      />

      <MaterialReactTable
        columns={columns}
        data={data}
        enableExpanding
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
              padding: '1rem',
              backgroundColor: 'rgba(0,0,0,0.05)'
            }}
          >
            <Typography><strong>Address:</strong> {row.original.currentAccount?.code}</Typography>
            <Typography><strong>City:</strong> {row.original.currentAccount?.title}</Typography>
            <Typography><strong>State:</strong> {row.original.currentAccount?.sector}</Typography>
          </Box>
        )}
        muiExpandButtonProps={({ row }) => ({
          sx: {
            transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
            transition: 'transform 0.2s'
          }
        })}
      />

    </>
  )
}