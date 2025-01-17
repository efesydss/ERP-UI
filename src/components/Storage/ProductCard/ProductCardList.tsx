import React, { useMemo } from 'react'
import { MaterialGroupTree } from '@/components/Storage/MaterialGroup/types/typesMaterialGroupTree'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable
} from 'material-react-table'
import { useQuery } from '@tanstack/react-query'

const ProductCardList = () => {

  const columns = useMemo<MRT_ColumnDef<MaterialGroupTree>[]>(
    //column definitions...
    () => [
      {
        header: 'name',
        accessorFn: (row) => row.name,

      },
      {
        header: 'code',
        accessorFn: (row) => row.code,

      }
    ],
    []
    //end
  )

  const dataOld: MaterialGroupTree[] = [
    {
      id: 1,
      name: 'Root Element',
      code: '1',
      children: [
        {
          id: 2,
          name: 'Material Group',
          code: '1.1',
          children: []
        }
      ]
    }
  ];

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
  const table = useMaterialReactTable({

    columns,
    data: dataOld,
    enableExpanding:true,
    initialState: { expanded: true },
    getSubRows: (row) => row.children,
  })
  return <MaterialReactTable table={table} />
}
export { ProductCardList }