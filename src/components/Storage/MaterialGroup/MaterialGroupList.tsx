import React, { useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useGetMaterialCard, useGetMaterialGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type MaterialGroupTreeItem } from '@/api/model'
import { Button, Stack } from '@mui/material'
import { useEffect } from 'react'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { Route } from '@/routes/_authenticated/storage/materialGroups/new'
import { useNavigate } from '@tanstack/react-router'


export const MaterialGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState(0)
  const navigate = useNavigate()

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
        console.log('API Response:', response)
        return Array.isArray(response) ? response : [response]
      }
    }
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
    data: Array.isArray(materialCard) ? materialCard : [],
    initialState: {
      density: 'compact'
    },
    muiTableContainerProps: {
      sx: { maxHeight: '80vh' }
    }
  })


  useEffect(() => {
    console.log('Material Card Data:', materialCard)
  }, [materialCard])


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
  const MaterialGroupListActions = () => {
    return (
      <>
        <Button
          variant={'contained'}
          size={'small'}
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => navigate({ to: Route.fullPath })}
        >
          {'common:newMaterialCard'}
        </Button>
      </>
    )
  }

  return <Stack direction="column" spacing={2} sx={{ p: 2 }}>
    {/* Page Title - Üst Kısımda Gösterilecek */}
    <div>
      <PageTitle title="Catalog" actions={<MaterialGroupListActions />} />
    </div>


    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      {/* Grup Tablosu (Sol Taraf) */}
      <div style={{ flex: 1 }}>
        <MaterialReactTable table={groupListTable} />
      </div>

      {/* Material Card Tablosu (Sağ Taraf) */}
      <div style={{ flex: 1 }}>
        <MaterialReactTable table={materialCardTable} />
      </div>
    </Stack>
  </Stack>


}
