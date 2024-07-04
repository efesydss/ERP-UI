import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, PaginationState, RowData, useReactTable } from '@tanstack/react-table'
import { CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useState } from 'react'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'

interface BaseTableProps<TData extends RowData> {
  endpoint: keyof typeof apiRoutes
  columns: ColumnDef<TData>[]
}

export const BaseTable = <TData extends RowData>(props: BaseTableProps<TData>) => {
  const { columns, endpoint } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const { data, isLoading } = useQuery({
    queryKey: [endpoint, pagination],
    queryFn: () =>
      apiRequest<ApiResponse<TData>>({
        endpoint,
        payload: {
          filter: '',
          sort: 'id,asc',
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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    rowCount: pagination.pageSize,
    manualPagination: true,
    state: {
      pagination
    }
  })
  return (
    <Stack
      direction={'column'}
      gap={2}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      component={'th'}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler()
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align='center'
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        onPageChange={(_, n) => setPagination({ pageSize: 10, pageIndex: n })}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={(e) => setPagination({ pageSize: parseInt(e.target.value, 10), pageIndex: 0 })}
      />
    </Stack>
  )
}
