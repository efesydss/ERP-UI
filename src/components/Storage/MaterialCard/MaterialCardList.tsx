import React, { useState, useMemo } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState
} from 'material-react-table'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import RefreshIcon from '@mui/icons-material/Refresh'
import { DepotResponse } from '@/components/Admin/Depot/typesDepot'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'


//işte bu backend den gelecek..
//nested data is ok, see accessorKeys in ColumnDef below

const MaterialCardList = () => {
  const endpoint = 'depots'
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const method = 'POST'

  const sortingOptions = () => {
    if (!sorting.length) {
      return 'id,desc'
    }
  }


  //todo ef şu anda bunu tamamlamak gerekiyor önce ...
  //bu kısım api backend göre bana özel olmalı örneklerdeki de öyle diyor size özel olmalı diyor ..!!
  const { data, isLoading } = useQuery({
    queryKey: [endpoint, pagination, columnFilters, sorting],// bu tamam
    queryFn: () =>
      apiRequest<ApiResponse<DepotResponse>>({
        endpoint,
        // params,// erkan abi : bunu anlamadım abi ne işe yarıyor nedir falan..
        method,
        payload: {//page size gitmiyor sayfa boyuu hatası ...
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize:pagination.pageSize,
        }

      })

  })


  const columns = useMemo<MRT_ColumnDef<DepotResponse>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: 'First Name',
        size: 150
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              console.log(`Silinen ID: ${row.original.id}`) // Satırdaki id'yi konsola yazdırır. todo ef : bunu düzelt..
            }}
          >
            Delete
          </Button>
        )
      }
    ],
    []
  )
  const table = useMaterialReactTable({
    data: data?.data ?? [],
    columns,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="Refresh Data">
        <IconButton onClick={() => console.log('efe bunu todo listesine ekledi, elbet bir gün kodlayacak..')}>
          <RefreshIcon />

        </IconButton>

      </Tooltip>),

    rowCount: pagination.pageSize,
    state: {
      columnFilters,
      isLoading,//todo ef bunu yap base table da var kolayca eklenebilir.. galiba yaptım denemek lazım..
      pagination,
      sorting
    }
  })

  return <MaterialReactTable table={table} />


}
export  { MaterialCardList }

