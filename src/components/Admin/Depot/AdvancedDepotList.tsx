import { lazy, Suspense, useMemo, useState, useEffect } from 'react'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable, MRT_SortingState, MRT_PaginationState
} from 'material-react-table'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { Depot } from '@/api/model/depot'

export const AdvancedDepotList = () => {

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({})
  const endpoint = 'depots'
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
      apiRequest<ApiResponse<Depot>>({
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

  const columns = useMemo<MRT_ColumnDef<Depot>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        header: 'Id',
        enableEditing: false,
        size: 80
      },
      {
        accessorFn: (row) => row.name,
        header: 'Depot Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          //remove any previous validation errors when depot focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined
            })
          //optionally add validation checking for onBlur or onChange
        }
      }
    ],
    [validationErrors]
  )

  const handleCreateDepot: MRT_TableOptions<Depot>['onCreatingRowSave'] = async ({
                                                                                   values,
                                                                                   table
                                                                                 }) => {
    setValidationErrors({})
    await createDepot(values)
    table.setCreatingRow(null)
  }



  const openDeleteConfirmModal = (row: MRT_Row<Depot>) => {
    if (window.confirm('Are you sure you want to delete this depot?')) {
      //deleteDepot(row.original.id)
    }
  }

  const table = useMaterialReactTable({
    columns,
    data: apiResponse?.data || [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    enableColumnEdit: true,
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px'
      }
    },
    onCreatingRowSave: handleCreateDepot,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Depot</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Depot</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true) //simplest way to open the create row modal with no default values
        }}
      >
        Create New Depot
      </Button>
    )
  })

  return <MaterialReactTable table={table} />
}

//CREATE hook (post new depot to api)
function useCreateDepot() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (depot: Depot) => {
      //todo ef 1

    },
    //client side optimistic update
    onMutate: (newDepotInfo: Depot) => {
      queryClient.setQueryData(
        ['depots'],
        (prevDepots: any) =>
          [
            ...prevDepots,
            {
              ...newDepotInfo,
              id: (Math.random() + 1).toString(36).substring(7)
            }
          ] as Depot[]
      )
    }
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['depots'] }), //refetch depots after mutation, disabled for demo
  })
}

//UPDATE hook (put depot in api)
function useUpdateDepot() {
  //todo ef 2
}

//DELETE hook (delete depot in api)
function useDeleteDepot() {
  //todo ef 3
}

//react query setup in App.tsx
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools
    })
  )
)

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdvancedDepotList />
      <Suspense fallback={null}>
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </QueryClientProvider>
  )
}
