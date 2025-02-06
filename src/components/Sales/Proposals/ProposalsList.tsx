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

  // todo ef complete column definitions..
  const columns = useMemo<MRT_ColumnDef<Proposals>[]>(
    () => [
      {
        header: 'proposals',
        columns: [
          {
            accessorFn: (row) => row.proposalNo, //accessorFn used to join multiple data into a single cell
            header: 'Proposal No.',
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>{row.original.proposalState}</div>
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            )
          }
        ]
      },
      {
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'description',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            header: 'Salary',
            size: 200,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  maxWidth: '9ch',
                  p: '0.25rem'
                })}
              >
              </Box>
            )
          },
          {
            accessorKey: 'finalTotal', //hey a simple column for once
            header: 'Job Title',
            size: 350
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
        View Profile
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
