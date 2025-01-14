import { useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, MRT_SortingState, MRT_PaginationState
} from 'material-react-table'
import { MaterialCard } from '@/components/Storage/MaterialCard/types/typesMaterialCard'
import { useQuery } from '@tanstack/react-query'
import { apiRequest, ApiResponse } from '@/utils/apiDefaults'

const ProductCardList = () => {
  const endpoint = 'materialCards'
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const method = 'POST'
  const sortingOptions = () => {
    if (sorting.length) {
      return sorting.map(({ id, desc }) => `${id},${desc ? 'desc' : 'asc'}`).join(';')
    }
    return 'id,desc'
  }
  const {data} = useQuery({
    queryKey: [endpoint, pagination, sorting],
    queryFn: () =>
      apiRequest<ApiResponse<MaterialCard>>({
        endpoint,
        method,
        payload: {
          filter: '',
          sort: sortingOptions(),
          page: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
      })
  })
  const columns = useMemo<MRT_ColumnDef<MaterialCard>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'materialCode',
        header: 'materialCode',
      },
      {
        accessorKey: 'materialName',
        header: 'materialName',
      },
      {
        accessorKey: 'defaultUnit',
        header: 'defaultUnit',
      },
      {
        accessorKey: 'materialType',
        header: 'materialType',
      },
      {
        accessorKey: 'optimalLevel',
        header: 'optimalLevel',
      },
      {
        accessorKey: 'minimumLevel',
        header: 'minimumLevel',
      },
      {
        accessorKey: 'specialCode',
        header: 'specialCode',
      },
      {
        accessorKey: 'shelfLocation',
        header: 'shelfLocation',
      },
      {
        accessorKey: 'materialCardUnits',
        header: 'materialCardUnits',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.data ?? [],
    enableExpandAll: false,
    enableExpanding: true,
    onSortingChange:setSorting,
    onPaginationChange:setPagination,
    enableColumnOrdering: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    initialState: { expanded: true }, //expand all rows by default
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
  });

  return <MaterialReactTable table={table} />;
};

export {ProductCardList};
