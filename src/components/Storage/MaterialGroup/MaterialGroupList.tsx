import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import {  getMaterialGroupTree, useGetMaterialGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type MaterialGroupTreeDataResponse, type MaterialCard, type MaterialGroupTreeItem } from '@/api/model'
import { Button, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { Route as MaterialGroupRoute } from '@/routes/_authenticated/storage/materialGroups/new'
import { Route as MaterialNewRoute } from '@/routes/_authenticated/storage/materialCards/new'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const MaterialGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)

  const { data: materialGroupResponse } = useGetMaterialGroupTreeSuspense()
  const materialGroup = (materialGroupResponse?.data ?? []) as MaterialGroupTreeItem[]

  const columnsTree = useMemo<MRT_ColumnDef<MaterialGroupTreeItem>[]>(
    () => [
      { header: t('Code'), accessorKey: 'code' },
      { header: t('Name'), accessorKey: 'name' },
      {
        header: t('Actions'),
        id: 'actions',
        Cell: ({ row }) => {
          return (
            <Tooltip title="Development in progress">
      <span>
        <Button
          variant="outlined"
          color="error"
          size="small"
          disabled
          
        >
          {t('Delete')}
        </Button>
      </span>
            </Tooltip>
          )
        }
      }
    ],
    [t]
  )

  const columnsMaterialCard = useMemo<MRT_ColumnDef<MaterialCard>[]>(
    () => [
      { header: t('Card Code'), accessorKey: 'materialCode' },
      { header: t('Card Name'), accessorKey: 'materialName' }
    ],
    [t]
  )





  const { data : materialGroupTreeResponse } = useGetMaterialGroupTreeSuspense({
   
  })

  const materialGroupTreeItems = materialGroupTreeResponse?.data?.data ?? []
  


  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: materialGroupTreeItems,
    enableExpanding: true,
    getSubRows: (row) => (row as MaterialGroupTreeItem).children || [],
    initialState: { expanded: {}, density: 'comfortable' },
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableHiding: false,
    enableRowSelection: false,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedGroup((prev) => (prev === (row.original as MaterialGroupTreeItem).id ? null : (row.original as MaterialGroupTreeItem).id ?? null))
      },
      selected: selectedGroup === (row.original as MaterialGroupTreeItem).id,
      sx: {
        cursor: 'pointer',
        backgroundColor: selectedGroup === (row.original as MaterialGroupTreeItem).id ? '#e0f7fa' : 'inherit'
      }
    })
  })

  const MaterialGroupListActions = () => (
    <>
      <Button variant="contained" size="small" onClick={() => navigate({ to: MaterialGroupRoute.fullPath })}>
        {t('Add New Material Group')}
      </Button>
      <Button variant="contained" size="small" onClick={() => navigate({ to: MaterialNewRoute.fullPath })}>
        {t('Add New Material Card')}
      </Button>
    </>
  )

  return (
    
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
     
      <PageTitle
        title="Catalog"
      />
      
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={groupListTable} />
        </div>
        
        <div style={{ flex: 1 }}>
          
        </div>
       
      </Stack>
    </Stack>
  )
}
