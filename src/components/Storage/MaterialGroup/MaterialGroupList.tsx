import React, { useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useGetMaterialCard, useGetMaterialGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type MaterialGroupTreeItem } from '@/api/model'
import { Stack } from '@mui/material'


export const MaterialGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState(0)

  const { data: materialGroup } = useGetMaterialGroupTreeSuspense({
    query: {
      select: (response) => response.materialGroups,
    }
  })

  const { data: materialCard, error: materialCardError } = useGetMaterialCard(selectedGroup, {
    query: {
      enabled: selectedGroup !== 0,
    }
  })

  const columnsTree = useMemo<MRT_ColumnDef<MaterialGroupTreeItem>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Code',
        accessorKey: 'code',
        accessorFn: (row) => {
          const { id } = row

          if (!id) {
            return null
          }
          
          return <button onClick={() => setSelectedGroup(id)}>{row.code}</button>
        }
      }
    ],
    []
  )

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    data: materialGroup || [],
    enableExpandAll: true,
    enableExpanding: true,
    getSubRows: (row) => row.children,
    enableColumnOrdering: true,
    filterFromLeafRows: false,
    paginateExpandedRows: false
  })

  const materialCardTable = useMaterialReactTable({

  })
  return <Stack><MaterialReactTable table={groupListTable} /> </Stack>


}
