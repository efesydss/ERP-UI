import React, { useMemo } from 'react'
import { MaterialGroupTree } from '@/components/Storage/MaterialGroup/types/typesMaterialGroupTree'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'


const mockData = [
  {
    'id': 1,
    'name': 'Root Element',
    'code': '1',
    'children': [
      {
        'id': 2,
        'name': 'Material Group 1',
        'code': '1.1',
        'children': [
          {
            'id': 3,
            'name': 'Material Group 2',
            'code': '1.1.1'
          }
        ]
      }
    ]
  },
  {
    'id': 4,
    'name': 'Root Element 2',
    'code': '2',
    'children': [
      {
        'id': 5,
        'name': 'Root Element 2',
        'code': '2.2',
        'children': [
          {
            'id': 6,
            'name': 'Root Element 2',
            'code': '2.2.2',
            'children': []
          }
        ]
      }
    ]
  }
]

export const MaterialGroupList = () => {
  /*  const endpoint = 'materialTree'
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
    })*/

  const columns = useMemo<MRT_ColumnDef<MaterialGroupTree>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Code',
        accessorKey: 'code'
      }
    ],
    []
  )

  const table = useMaterialReactTable({
    columns,
    data: mockData,
    enableExpandAll: true,
    enableExpanding: true,
    getSubRows: (row) => row.children,
    enableColumnOrdering: true,
    filterFromLeafRows: false,
    paginateExpandedRows: false
  })
  return <MaterialReactTable table={table} />


}
