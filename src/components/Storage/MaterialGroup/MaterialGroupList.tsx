import React, { useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useGetMaterialCard, useGetMaterialGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type MaterialGroupTreeItem } from '@/api/model'
import { Stack } from '@mui/material'
import { useEffect } from 'react'


export const MaterialGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState(0)

  type MaterialGroupResponse = {
    message: string | null;
    data: MaterialGroupTreeItem[];
    total: number;
    page: number;
    pageSize: number;
  };
  const { data: materialGroup, error: materialGroupError } = useGetMaterialGroupTreeSuspense<MaterialGroupResponse>({
    query: {
      select: (response) => {
        console.log('API Response:', response)
        return (response as any).data//mecbur kaldım ..
      }
    }
  })

  useEffect(() => {
    console.log('Material Group Data:', materialGroup)
    if (materialGroupError) {
      console.error('Material Group Fetch Error:', materialGroupError)
    }
  }, [materialGroup, materialGroupError])

  const { data: materialCard, error: materialCardError } = useGetMaterialCard(selectedGroup, {
    query: {
      enabled: selectedGroup !== 0,
      select: (response) => {
        console.log('API Response:', response);
        return Array.isArray(response) ? response : [response];
      },
    },
  })

  const columnsTree = useMemo<MRT_ColumnDef<MaterialGroupTreeItem>[]>(
    () => [

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
      },
      {
        header: 'Name',
        accessorKey: 'name'
      }
    ],
    []
  )

  const columnsMaterialCard = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: 'Card Code',
        accessorKey: 'materialCode'
      },
      {
        header: 'Card Name',
        accessorKey: 'materialName'
      }
    ],
    []
  )

  const materialCardTable = useMaterialReactTable({
    columns: columnsMaterialCard,
    data: Array.isArray(materialCard) ? materialCard : [], // Güvenli array kontrolü
    initialState: {
      density: 'compact',
    },
    muiTableContainerProps: {
      sx: { maxHeight: '80vh' },
    },
  });


  useEffect(() => {
    console.log('Material Card Data:', materialCard);
  }, [materialCard]);


  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    data: materialGroup || [],
    enableExpanding: true,
    getSubRows: (row) => row.children || [],
    initialState: {
      expanded: true,
      density: 'comfortable'
    },
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableHiding: false
  })

  return <Stack direction="row" spacing={2} sx={{ p: 2 }}>
    {/* Grup Tablosu (Sol Taraf) */}
    <div style={{ flex: 1 }}>
      <MaterialReactTable table={groupListTable} />
    </div>

    {/* Material Card Tablosu (Sağ Taraf) */}

      <div style={{ flex: 1 }}>
        <MaterialReactTable table={materialCardTable} />
      </div>

  </Stack>

}
