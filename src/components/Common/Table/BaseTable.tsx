import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  PaginationState,
  Row,
  RowData,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import {
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material'
import { Fragment, ReactElement, useEffect, useState, MouseEvent } from 'react'
import { apiRequest, ApiResponse, HttpMethod } from '@/utils/apiDefaults'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { apiRoutes } from '@/utils/apiRoutes'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'
import { ColumnHeader } from '@/components/Common/Table/components/ColumnHeader'
import { AppliedFilters } from '@/components/Common/Table/components/AppliedFilters'
import { useTranslation } from 'react-i18next'
import { TableState } from '@/components/Common/Table/components/TableState'
import { TableHeader } from '@/components/Common/Table/stylesTable'
import { FilterOperators } from '@/utils/filterOperators'
import { FaAngleUp, FaList } from 'react-icons/fa6'
import { labelParser } from '@/utils/transformers'

interface BaseTableProps<TData extends RowData> {
  endpoint: keyof typeof apiRoutes
  columns: ColumnDef<TData>[]
  nameSpace?: string
  params?: Record<string, string>
  customFilter?: string
  method?: HttpMethod
  renderSubComponent?: (props: {
    row: Row<TData>
    handleExpandRow: (e: MouseEvent | null, rowId: string) => void
  }) => ReactElement
  namedFilters?: string[]
}

type FilterVariant = 'text' | 'select' | 'enum'

interface ColumnFilterProps {
  columnId: string
  filterVariant?: FilterVariant
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: FilterVariant
    filterOptions?: Array<{ value: any; label: string }>
    filterOptionsEndpoint?: keyof typeof apiRoutes
    filterNameSpace?: string
  }
}

export const BaseTable = <TData extends RowData>(props: BaseTableProps<TData>) => {
  const {
    columns,
    endpoint,
    params,
    customFilter,
    nameSpace = 'common',
    method = 'POST',
    renderSubComponent,
    namedFilters = []
  } = props
  const { setItem, getItem } = useLocalStorage(endpoint)
  const { t: feedbacks } = useTranslation('feedbacks')

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(getItem() || [])
  const [sorting, setSorting] = useState<SortingState>([])
  const [filterOperators, setFilterOperators] = useState<ColumnFilterProps[]>([])
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })

  const { data, isLoading } = useQuery({
    queryKey: [endpoint, pagination, columnFilters, sorting, customFilter, params, namedFilters],
    queryFn: () =>
      apiRequest<ApiResponse<TData>>({
        endpoint,
        params,
        method,
        payload: {
          filter: createFilterQuery(),
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
          namedFilters
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
    onColumnFiltersChange: (newFilters) => {
      setColumnFilters(newFilters)
      setPagination((prev) => ({ ...prev, pageIndex: 0 }))
    },
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel()
  })

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

  const createFilterQuery = () => {
    const filters = columnFilters
      .map((filter) => {
        const filterInfo = filterOperators.find((operator) => operator.columnId === filter.id)
        const filterOperator = getFilterOperator(filterInfo?.filterVariant || 'text')
        //todo: check how we should handle this in backend
        const originalId = filter.id.replace(/.*_/, '')

        return `${originalId}${filterOperator}${labelParser(filter.value as string, '_', 'before')}`
      })
      .join(';')

    const combinedFilters = customFilter ? (filters ? `${filters};${customFilter}` : customFilter) : filters

    setItem(columnFilters)
    return combinedFilters
  }

  const sortingOptions = () => {
    if (!sorting.length) {
      return 'id,desc'
    }

    const selected = sorting[0]
    const isDescending = selected.desc

    return `${labelParser(selected.id, '_')},${isDescending ? 'desc' : 'asc'}`
  }

  const handleDeleteFilter = (id: string) => {
    setColumnFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id))
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const handleExpandRow = (e: MouseEvent | null, rowId: string) => {
    if (e) {
      e.stopPropagation()
    }
    setExpandedRowId((prevId) => (prevId === rowId ? null : rowId))
  }

  useEffect(() => {
    const newFilterOperators: ColumnFilterProps[] = table.getHeaderGroups().flatMap((headerGroup) =>
      headerGroup.headers.map((header) => ({
        filterVariant: header.column.columnDef.meta?.filterVariant,
        columnId: header.column.id
      }))
    )
    setFilterOperators(newFilterOperators)
  }, [table])

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
                        sx={{ position: 'relative', px: 1, py: 0.5 }}
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
                  {renderSubComponent && <TableCell />}
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
                  <Fragment key={row.id}>
                    <TableRow
                      hover
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#fff' }}
                      onClick={() => row.toggleExpanded()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          component='td'
                          scope='row'
                          key={cell.id}
                          sx={{ height: 45, p: 1 }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                      {renderSubComponent && (
                        <TableCell sx={{ textAlign: 'right', height: 45, p: 1, width: 45 }}>
                          <IconButton
                            size={'small'}
                            onClick={(e) => handleExpandRow(e, row.id)}
                          >
                            {expandedRowId === row.id ? <FaAngleUp /> : <FaList />}
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                    {renderSubComponent && expandedRowId === row.id && (
                      <TableRow
                        key={`${row.id}-expanded`}
                        sx={{ backgroundColor: 'secondary.light' }}
                      >
                        <TableCell
                          key={`${row.id}-${row.index}-expanded`}
                          colSpan={columns.length + 1}
                        >
                          {renderSubComponent({ row, handleExpandRow })}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
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
