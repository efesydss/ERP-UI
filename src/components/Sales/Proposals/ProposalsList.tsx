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
  *date: string;
  proposalState: string;
  proposalNo: number;
  currentAccount: CurrentAccount;
  discount: number;
  expense: number;
  tax: number;
  total: number;
  description: string;
  products: ProductRowItem[];
  laborCosts: LaborCost[];
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
        header: 'proposals',
        columns: [
          {
            accessorFn: (row) => row.proposalNo, //accessorFn used to join multiple data into a single cell
            header: 'Proposal Date',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
            accessorKey: 'currentAccount.title',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            header: 'Current Account',
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>{row.original.currentAccount.title}</div>
                <div>{row.original.currentAccount.code}</div>
                <div>{row.original.currentAccount.sector}</div>
              </Box>
            )
          },
          {
            accessorKey: 'proposalState',
            header: 'State',
          },
        ]
      },
      {
        header: 'Prices',
        columns: [
          {
            accessorFn: (row) => row.proposalNo, //accessorFn used to join multiple data into a single cell
            header: 'Proposal Date',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>{row.original.date}</div>{/*todo ef buraya date picker elementi koy*/}
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>Proposal No: {renderedCellValue}</span>
              </Box>
            )
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
    enableColumnOrdering: true,
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
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          maxWidth: '1000px',
          position: 'sticky',
          width: '100%'
        }}
      >

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">Signature Catch Phrase:</Typography>
          <Typography variant="h1">
            &quot;{row.original.unitDiscount}&quot;
          </Typography>
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
