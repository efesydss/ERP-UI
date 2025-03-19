import React, { useState, useMemo, useEffect } from 'react'
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
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { FilterOperators } from '@/utils/filterOperators'
import { labelParser } from '@/utils/transformers'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'

import { DepotResponse } from '@/components/Admin/Depot/typesDepot'

type FilterVariant = 'text' | 'select' | 'enum' | undefined


interface ColumnFilterProps {
  columnId: string
  filterVariant?: FilterVariant
}

const MaterialCardList = () => {
  const endpoint = 'depots'
  const customFilter = ''

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  type FilterVariant = 'text' | 'select' | 'enum'

  const [filterOperators, setFilterOperators] = useState<ColumnFilterProps[]>([])
  const { setItem, getItem } = useLocalStorage(endpoint)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(getItem() || [])

  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const method = 'POST'

  const sortingOptions = () => {
    if (sorting.length) {
      return sorting.map(({ id, desc }) => `${id},${desc ? 'desc' : 'asc'}`).join(';')
    }
    return 'id,desc'
  }

  const createFilterQuery = () => {
    const filters = columnFilters
      .map((filter) => {
        const filterInfo = filterOperators.find((operator) => operator.columnId === filter.id)
        const filterOperator = getFilterOperator(filterInfo?.filterVariant || 'text')
        const originalId = filter.id.replace(/.*_/, '')

        return `${originalId}${filterOperator}${labelParser(filter.value as string, '_', 'before')}`
      })
      .join(';')

    const combinedFilters = customFilter ? (filters ? `${filters};${customFilter}` : customFilter) : filters

    setItem(columnFilters)
    return combinedFilters
  }


  //bu kısım api backend göre bana özel olmalı örneklerdeki de öyle diyor size özel olmalı diyor ..!!
  const { data, isLoading } = useQuery({
    queryKey: [endpoint, pagination, sorting, customFilter],
    queryFn: () =>
      apiRequest<ApiResponse<DepotResponse>>({
        endpoint,
        // params,// erkan abi : bunu anlamadım abi ne işe yarıyor nedir falan..
        method,
        payload: {
          filter: createFilterQuery(),
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize
        }

      })

  })


  const columns = useMemo<MRT_ColumnDef<DepotResponse>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        header: 'Depot Name',
        filterFn: 'contains',
        enableColumnFilter: true,
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
  const getFilterOperator = (filterVariant: FilterVariant) => {
    switch (filterVariant) {
      case 'text':
        return FilterOperators.like
      case 'select':
        return FilterOperators.idEquals
      case 'enum':
        return FilterOperators.equals
      default:
        return FilterOperators.like
    }
  }
  const table = useMaterialReactTable({
    data: data?.data ?? [],
    columns,
    onColumnFiltersChange: (newFilters) => {
      setColumnFilters(newFilters)
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
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
      isLoading,
      pagination,
      sorting
    }
  })
  useEffect(() => {
    const newFilterOperators: ColumnFilterProps[] = table.getHeaderGroups().flatMap((headerGroup) =>
      headerGroup.headers.map((header) => ({
        filterVariant: header.column.columnDef.meta?.filterVariant ,//todo Behçet abi yardımmm ?
        columnId: header.column.id
      }))
    )
    setFilterOperators(newFilterOperators)
  }, [table])

  return <MaterialReactTable table={table} />


}
export { MaterialCardList }

