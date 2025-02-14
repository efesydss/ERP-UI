import { useTranslation } from 'react-i18next'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useNavigate } from '@tanstack/react-router'
import { Box, Button, List, ListItemText, Tab, Tabs, Typography } from '@mui/material'
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

  const [tabIndexes, setTabIndexes] = useState<Record<number, number>>({});




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

  const handleTabChange = (rowId: number, newValue: number) => {
    setTabIndexes((prev) => ({
      ...prev,
      [rowId]: newValue,
    }));
  };
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
        renderDetailPanel={({ row }) => {
          const currentTabIndex = tabIndexes[row.id as any] || 0;
          return (
            <Box
              sx={{
                display: 'grid',
                margin: 'auto',
                gridTemplateColumns: '1fr 1fr',
                width: '100%',
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.05)',
              }}
            >
              {/* Tabs */}
              <Tabs
                value={currentTabIndex}
                onChange={(event, newValue) => handleTabChange(row.id as any, newValue)} // Satıra özgü tab değişimi
                aria-label="Detail Panel Tabs"
              >
                <Tab label="Group 1" />
                <Tab label="Group 2" />
              </Tabs>

              {/* Tab Panels */}
              <Box
                role="tabpanel"
                hidden={currentTabIndex !== 0}
                sx={{
                  padding: '1rem',
                  display: currentTabIndex === 0 ? 'block' : 'none',
                }}
              >
                <Typography>
                  <strong>Address:</strong> {row.original.currentAccount?.code}
                </Typography>
                <Typography>
                  <strong>City:</strong> {row.original.currentAccount?.title}
                </Typography>
                <Typography>
                  <strong>State:</strong> {row.original.currentAccount?.sector}
                </Typography>
              </Box>

              <Box
                role="tabpanel"
                hidden={currentTabIndex !== 1}
                sx={{
                  padding: '0.5rem',
                  display: currentTabIndex === 1 ? 'block' : 'none',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <strong>Purchase Order Items:</strong>
                </Typography>
                <List>
                  {row.original.purchaseOrderItems?.length ? (
                    row.original.purchaseOrderItems?.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          marginBottom: '1rem',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                          paddingBottom: '0.5rem',
                        }}
                      >
                        <ListItemText
                          primary={`Item ${index + 1}: ${item.quantity}`}
                          secondary={
                            <Box>
                              <Typography>
                                <strong>Quantity:</strong> {item.quantity}
                              </Typography>
                              <Typography>
                                <strong>Price:</strong> $
                                {item.materialCard?.materialName}
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography>No items available</Typography>
                  )}
                </List>
              </Box>
            </Box>
          );
        }}
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