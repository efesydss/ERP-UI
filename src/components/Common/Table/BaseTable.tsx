import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

interface BaseTableProps<TData extends RowData> {
  data?: TData[]
  columns: ColumnDef<TData>[]
}

export const BaseTable = <TData extends RowData>(props: BaseTableProps<TData>) => {
  const { data = [], columns } = props

  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  })
  return (
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
  )
}
