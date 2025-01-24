import React, { useMemo } from 'react'
import { MaterialGroupTree } from '@/components/Storage/MaterialGroup/types/typesMaterialGroupTree'
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable
} from 'material-react-table'
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