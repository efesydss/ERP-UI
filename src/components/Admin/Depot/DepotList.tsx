import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, DialogActions, DialogContent, IconButton, Tooltip } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { toast } from 'react-toastify'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditIcon from '@mui/icons-material/Edit'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_EditActionButtons,
  MRT_Row, MRT_PaginationState, MRT_SortingState, MRT_TableOptions
} from 'material-react-table'
import { Depot } from '@/api/model/depot'
import { DialogTitle } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import { AxiosError } from 'axios'

export const DepotList = () => {
  const queryClient = useQueryClient()
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
  const handleCreateDepot: MRT_TableOptions<Depot>['onCreatingRowSave'] = async ({ values, table }) => {
    await createDepot(values)
    table.setCreatingRow(null)
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

  const { mutateAsync: createDepot } = useMutation({
    mutationFn: async (values: Depot) => {
      return await apiRequest({
        endpoint: 'depotAdd',
        method: 'POST',
        payload: values
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['depots'] })
      toast.success('Depot Created')
    },
    onError: (err: AxiosError<{ err?: string }>) => {
      if (err.response?.status === 409) {
        toast.error('Depot already exists')
      } else {
        toast.error('Failed to create depot')
      }
    }
  })

  const openDeleteConfirmModal = (row: MRT_Row<Depot>) => {
    if (window.confirm('Are you sure you want to delete this depot?')) {
      deleteDepot(row.original.id)
    }
  }

  const { mutate: deleteDepot } = useMutation({
    mutationFn: async (depotId: string) => {
      return await apiRequest({
        endpoint: 'depotDelete',
        method: 'DELETE',
        params: { depotId: depotId ?? 0 }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['depots'] })
      toast.success('Depot Deleted')
    },
    onError: () => {
      toast.error('Failed to delete depot')
    }
  })
  const columns = useMemo<MRT_ColumnDef<Depot>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Depot Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.firstName,
          helperText: validationErrors?.firstName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              firstName: undefined
            })
        }
      }
    ],
    [validationErrors]
  )
  const { mutateAsync: updateDepot } = useMutation({
    mutationFn: async (values: Depot) => {
      const depotId = Number(values.id ?? 0)
      return await apiRequest({
        endpoint: `/api/admin/depot/${depotId}`,
        method: 'PUT',
        payload: {
          ...values,
          id: depotId
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['depots'] })
      toast.success('Depot Updated')
    },
    onError: (err: AxiosError<{ err?: string }>) => {
      toast.error(
        'Failed to update depot: ' + (err.response?.data?.err || err.message)
      )
    }
  })
  const handleSaveDepot: MRT_TableOptions<Depot>['onEditingRowSave'] = async ({ values, row, table }) => {
    try {
      const updatedValues = {
        ...values,
        id: values.id ?? row.original.id
      }
      updatedValues.id = Number(updatedValues.id)
      await updateDepot(updatedValues)
      table.setEditingRow(null)
    } catch (err) {
      toast.error('Failed to update depot')
      console.error('Update error:', err)
    }
  }

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(apiResponse?.data || [])

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Depots')

    XLSX.writeFile(workbook, 'Depots.xlsx')
  }
  const handleExportRows = (rows: MRT_Row<Depot>[]) => {
    const doc = new jsPDF()
    const tableData = rows.map((row) => Object.values(row.original))
    const tableHeaders = columns.map((c) => c.header)
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData
    })
    doc.save('Depot Table.pdf')
  }
  const table = useMaterialReactTable({
    columns,
    data: apiResponse?.data || [],
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    createDisplayMode: 'modal',
    enableColumnOrdering: true,
    editDisplayMode: 'modal',
    enableEditing: true,
    onEditingRowSave: handleSaveDepot,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px'
      }
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap'
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true)
          }}
        >
          Create New User
        </Button>
        <Button
          onClick={handleExportExcel}
          startIcon={<FileDownloadIcon />}
        >
          Export to Excel
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export to PDF
        </Button>
      </Box>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Edit User</DialogTitle>
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
    onCreatingRowSave: handleCreateDepot,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle>Create New Depot</DialogTitle>
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
    )
  })
  return <MaterialReactTable table={table} />
}