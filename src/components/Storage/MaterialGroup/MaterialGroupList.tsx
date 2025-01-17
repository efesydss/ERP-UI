import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/utils/apiDefaults'
import { ApiResponse } from '@/utils/apiDefaults'
import { MaterialGroupTree } from '@/components/Storage/MaterialGroup/types/typesMaterialGroupTree'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable
} from 'material-react-table'

const MaterialGroupList = () => {
  const endpoint = 'materialTree'
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const method = 'GET'
  const sortingOptions = () => {
    if (sorting.length) {
      return sorting.map(({ id, desc }) => `${id},${desc ? 'desc' : 'asc'}`).join(';')
    }
    return 'id,desc'
  }
  const { data } = useQuery({
    queryKey: [endpoint, pagination, sorting],
    queryFn: () =>
      apiRequest<ApiResponse<MaterialGroupTree>>({
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
  const columns = useMemo<MRT_ColumnDef<MaterialGroupTree>[]>(
    //column definitions...
    () => [
      {
        header: 'name',
        accessorFn: (row) => row.code
      },
      {
        header: 'code',
        accessorFn: (row) => row.name
      }
    ],
    []
    //end
  )
  const materialGroups = (data as unknown as { materialGroups: MaterialGroupTree[] })?.materialGroups || [];

  const mockData = [
    {
      id: 1,
      name: 'Root Elementosr',
      code: '3',
      children: [
        {
          id: 2,
          name: 'Material Grouposr',
          code: '3.3',
          children: []
        }
      ]
    }
  ];
  const table = useMaterialReactTable({
    columns,
    data: data ? materialGroups : mockData,
    enableExpandAll: true, // Varsayılan tüm alt elemanları aç
    enableExpanding: true,
    getSubRows: (row) => row.children || [], // Çocukları burada doğru bağla
    enableColumnOrdering: true,
    filterFromLeafRows: false, // Tüm verilerde filtrele
    paginateExpandedRows: true //
  })
  return <MaterialReactTable table={table} />


}
export { MaterialGroupList }