import React, { useMemo, useState, useEffect } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useGetMaterialCard, useGetMaterialGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type MaterialCard, type MaterialGroupTreeItem } from '@/api/model'
import { Button, Stack } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { Route as MaterialGroupRoute } from '@/routes/_authenticated/storage/materialGroups/new'
import { Route as MaterialNewRoute } from '@/routes/_authenticated/storage/materialCards/new'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const MaterialGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState<number>()
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  const { data: materialGroup } = useGetMaterialGroupTreeSuspense({
    query: {
      select: (response) => response.data ?? []
    }
  })

  const { data: materialCard } = useGetMaterialCard(selectedGroup, {
    query: {
      enabled: selectedGroup !== null && selectedGroup !== 0,
      select: (response) => {
        console.log('Material Card API Response:', response)
        return Array.isArray(response) ? response : [response]
      }
    }
  })

  const columnsTree = useMemo<MRT_ColumnDef<MaterialGroupTreeItem>[]>(
    () => [
      { header: t('Code'), accessorKey: 'code' },
      { header: t('Name'), accessorKey: 'name' }
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

  const materialCardTable = useMaterialReactTable({
    columns: columnsMaterialCard,
    data: materialCard ?? [],
    enablePagination: false,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    renderEmptyRowsFallback: () => (
      <div style={{ textAlign: 'center', padding: '16px' }}>{t('No data available')}</div>
    )
  })

  useEffect(() => {
    console.log('Selected Group:', selectedGroup)
    console.log('Material Card Data:', materialCard)
  }, [selectedGroup, materialCard])

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: materialGroup ?? [],
    enableExpanding: true,
    getSubRows: (row) => row.children || [],
    initialState: { expanded: false, density: 'comfortable' },
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableHiding: false,
    enableRowSelection: false,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedGroup((prev) => (prev === row.original.id ? null : row.original.id))
      },
      selected: selectedGroup === row.original.id,
      sx: {
        cursor: 'pointer',
        backgroundColor: selectedGroup === row.original.id ? '#e0f7fa' : 'inherit'
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
      <PageTitle title="Catalog" actions={<MaterialGroupListActions />} />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={groupListTable} />
        </div>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={materialCardTable} />
        </div>
      </Stack>
    </Stack>
  )
}
