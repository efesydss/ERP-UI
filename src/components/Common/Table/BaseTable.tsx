import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, PaginationState, RowData, useReactTable } from '@tanstack/react-table'
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useState } from 'react'

interface BaseTableProps<TData extends RowData> {
  data?: TData[]
  columns: ColumnDef<TData>[]
  pageSize?: number
}

export const BaseTable = <TData extends RowData>(props: BaseTableProps<TData>) => {
  const { data = [], columns } = props
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: props.pageSize || 10
  })

  const handleChange = (_: unknown, value: number) => {
    setPagination({ ...pagination, pageIndex: value })
  }

  const table = useReactTable<TData>({
    columns,
    data,
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
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        component='td'
                        scope='row'
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={10}
        shape='rounded'
        page={pagination.pageIndex}
        onChange={handleChange}
      />
    </Stack>
  )
}
