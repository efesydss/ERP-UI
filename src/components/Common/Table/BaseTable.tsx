import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, PaginationState, RowData, SortingState, useReactTable } from '@tanstack/react-table'
import { CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'
import { useState } from 'react'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import { ColumnHeader } from '@/components/Common/Table/components/ColumnHeader'
import { AppliedFilters } from '@/components/Common/Table/components/AppliedFilters'
import { useTranslation } from 'react-i18next'
import { TableState } from '@/components/Common/Table/components/TableState'
import { TableHeader } from '@/components/Common/Table/stylesTable'

interface BaseTableProps<TData extends RowData> {
  endpoint: keyof typeof apiRoutes
  columns: ColumnDef<TData>[]
  nameSpace?: string
  params?: Record<string, string>
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
    filterOptions?: any
  }
}

export const BaseTable = <TData extends RowData>(props: BaseTableProps<TData>) => {
  const { columns, endpoint, params, nameSpace = 'common' } = props
  const { setItem, getItem } = useLocalStorage(endpoint)
  const { t: feedbacks } = useTranslation('feedbacks')

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(getItem() || [])
  const [sorting, setSorting] = useState<SortingState>([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15
  })

  const { data, isLoading } = useQuery({
    queryKey: [endpoint, pagination, columnFilters, sorting],
    queryFn: () =>
      apiRequest<ApiResponse<TData>>({
        endpoint,
        params,
        payload: {
          filter: createFilterString(),
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize
        }
      }),
    placeholderData: keepPreviousData
  })

  const table = useReactTable<TData>({
    columns,
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    rowCount: pagination.pageSize,
    manualPagination: true,
    state: {
      columnFilters,
      sorting
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting
  })

  console.log('columnFilters -->', columnFilters)

  //todo: value typing with selects
  const createFilterString = () => {
    const filters = columnFilters.map((filter) => `${filter.id}=ilike=${filter.value as string}`).join(';')
    setItem(columnFilters)
    return filters
  }

  const sortingOptions = () => {
    if (!sorting.length) {
      return 'id,asc'
    }

    const selected = sorting[0]
    const isDescending = selected.desc

    return `${selected.id},${isDescending ? 'desc' : 'asc'}`
  }

  const handleDeleteFilter = (id: string) => {
    setColumnFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id))
  }

  return (
    <>
      <Stack
        direction={'column'}
        gap={2}
      >
        <AppliedFilters
          columnFilters={columnFilters}
          onDelete={handleDeleteFilter}
          nameSpace={nameSpace}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        component={'th'}
                        key={header.id}
                        colSpan={header.colSpan}
                        sx={{ position: 'relative' }}
                      >
                        <ColumnHeader
                          column={header.column}
                          isSortedDesc={sorting[0]?.desc}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </ColumnHeader>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableState colSpan={columns.length}>
                  <CircularProgress />
                </TableState>
              ) : table.getRowModel().rows.length === 0 ? (
                <TableState colSpan={columns.length}>{feedbacks('noDataFound')}</TableState>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#fff' }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        component='td'
                        scope='row'
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={data?.total || -1}
          page={pagination.pageIndex}
          onPageChange={(_, n) => setPagination({ pageSize: pagination.pageSize, pageIndex: n })}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={(e) => setPagination({ pageSize: parseInt(e.target.value, 10), pageIndex: 0 })}
        />
      </Stack>
    </>
  )
}
