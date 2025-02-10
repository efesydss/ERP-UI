import { useMemo, useState } from 'react'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { Proposals } from '@/components/Sales/Proposals/types/typesProposals'
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton, MRT_SortingState, MRT_PaginationState
} from 'material-react-table'

//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten
} from '@mui/material'

//Icons Imports
import { AccountCircle, Send } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'


const ProposalsList = () => {

  /*
  *date: string;*
  proposalState: string;*
  proposalNo: number;*
  currentAccount: CurrentAccount;*
  * Prices
  discount: number;*
  expense: number;*
  tax: number;*
  total: number;*
  description: string;*
  products: ProductRowItem[];*
  laborCosts: LaborCost[];*
  materialCards: MaterialCard[];
  unitDiscount: number;
  totalTax: number;
  additionalCosts: number;
  finalTotal: number;
  extras: Extras;
  * */
  // todo ef complete column definitions..
  const columns = useMemo<MRT_ColumnDef<Proposals>[]>(
    () => [
      {
        header: 'Proposals',
        columns: [
          {
            accessorFn: (row) => row.proposalNo, //accessorFn used to join multiple data into a single cell
            header: 'Proposal Date',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  gap: '1rem'
                }}
              >
                <div>{row.original.date}</div>{/*todo ef buraya date picker elementi koy*/}
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>Proposal No: {renderedCellValue}</span>
              </Box>
            )
          },
          {
            accessorKey: 'proposalState',
            header: 'State',
          },
          {
            accessorKey: 'description',
            header: 'Description',
          },

        ]
      },
      {
        header: 'Prices',
        columns: [
          {
            accessorFn: (row) => row.discount, //accessorFn used to join multiple data into a single cell
            header: 'Discount',
          },
          {
            accessorFn: (row) => row.tax, //accessorFn used to join multiple data into a single cell
            header: 'Tax',
          },
          {
            accessorFn: (row) => row.expense, //accessorFn used to join multiple data into a single cell
            header: 'Expense',
          },
          {
            accessorFn: (row) => row.total, //accessorFn used to join multiple data into a single cell
            header: 'Total',
          },

        ]
      }
    ],
    []
  )
  const endpoint = 'proposals'
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
      apiRequest<ApiResponse<Proposals>>({
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
  const data = apiResponse?.data || []

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: false,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions']
      }
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined'
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined'
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column', // Üstte currentAccount, altta products olacak
          gap: 2,
          padding: 2,
          maxWidth: '1000px',
          width: '100%',
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#e3e0e0'
        }}
      >
        {/* Üst satır: Current Account bilgileri */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2
          }}
        >
          <Box sx={{ paddingX: 2, borderRight: '2px solid #ccc' }}>
            <Typography variant="h6">
              <strong>Hesap Adı:</strong> {row.original.currentAccount?.title}
            </Typography>
          </Box>

          <Box sx={{ paddingX: 2, borderRight: '2px solid #ccc' }}>
            <Typography variant="h6">
              <strong>Sektör:</strong> {row.original.currentAccount?.sector}
            </Typography>
          </Box>

          <Box sx={{ paddingX: 2 }}>
            <Typography variant="h6">
              <strong>Kod:</strong> {row.original.currentAccount?.code}
            </Typography>
          </Box>
        </Box>

        {/* Alt satır: Products bilgileri */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap', // Ürünler yan yana sıralansın ama taşarsa alta geçsin
            gap: 2,
            paddingTop: 2
          }}
        >
          {row.original.products?.length > 0 ? (
            row.original.products.map((product, index) => (
              <Box
                key={index}
                sx={{
                  paddingX: 2,
                  borderRight: index !== row.original.products.length - 1 ? '2px solid #ccc' : 'none'
                }}
              >
                <Typography variant="h6">
                  <strong>Ürün ID:</strong> {product.productCard?.id}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> {product.price}₺
                </Typography>
                <Typography variant="body2">
                  <strong>Expense:</strong> {product.expense}
                </Typography>
                <Typography variant="body2">
                  <strong>Discount:</strong> {product.discount}
                </Typography>
                <Typography variant="body2">
                  <strong>Profit:</strong> {product.profit}₺
                </Typography>
                <Typography variant="body2">
                  <strong>Profit Margin:</strong> {product.profitMargin}₺
                </Typography>
                <Typography variant="body2">
                  <strong>RowTotal:</strong> {product.rowTotal}₺
                </Typography>
              </Box>

            ))
          ) : (
            <Typography variant="h6" sx={{ color: 'gray' }}>
              Ürün bulunamadı
            </Typography>
          )}
        </Box>
        {/* Finansal Detaylar */}
        <Box sx={{ paddingX: 2 }}>
          <Typography variant="h6"><strong>Labor Costs</strong></Typography>
          {row.original.laborCosts?.map((laborCosts, index) => (
            <Box key={index} sx={{ marginTop: 1 }}>
              <Typography>Description: {laborCosts.description}</Typography>
              <Typography>Employee Name: {laborCosts.employee?.name}</Typography>
              <Typography>Man Hour: {laborCosts.manHour}</Typography>
              <Typography><strong>ManHourCost:</strong> {laborCosts.manHourCost}₺</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ),


    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
          closeMenu()
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Additional Action
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu()
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>
    ],
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'))
        })
      }

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'))
        })
      }

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('name'))
        })
      }

      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between'
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Box>
      )
    }
  })

  return <MaterialReactTable table={table} />
}


export { ProposalsList}
