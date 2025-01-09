import React, { useMemo, useState, useEffect } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useGetMaterialCard, useGetMaterialGroupTreeSuspense, useDeleteMaterialGroup } from '@/api/openAPIDefinition'
import { type MaterialCard, type MaterialGroupTreeItem } from '@/api/model'
import { Button, Stack, Tooltip } from '@mui/material'
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


  const { data: materialGroup } = useGetMaterialGroupTreeSuspense({
    query: {
      select: (response) => response.data ?? []
    }
  })

  const { data: materialCard } = useGetMaterialCard(selectedGroup ?? 0, {
    query: {
      enabled: selectedGroup !== null && selectedGroup !== 0,
      select: (response) => response ?? []
    }
  })
  const { mutateAsync: DeleteMaterialGroup } = useDeleteMaterialGroup()


  useEffect(() => {
    if (Array.isArray(materialCard) && materialCard.length === 0) {
      setCanDelete(true)
    } else if (Array.isArray(materialCard) && materialCard.length > 0) {
      setCanDelete(false)
    }
  }, [materialCard])
  const handleDelete = async (id: number) => {
    try {
      const groupToDelete = materialGroup.find(group => group.id === id)

      // Eğer grup çocuk içeriyorsa engelle
      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        alert(t('Cannot delete a group with child elements.'))
        return
      }

      if (!canDelete) {
        alert(t('This group is linked to a Material Card and cannot be deleted.'))
        return
      }

       // setSelectedGroup(id)
      // console.log("Material Group Data:", materialGroup);

      if (materialGroup.some(group => group.id === id)) {
        alert(t('This group is linked to a Material Card and cannot be deleted.'))
        return
      }

      await DeleteMaterialGroup({ id })
      alert(t('Group deleted successfully.'))
    } catch (error: any) {
      console.error('Error deleting group:', error)
      alert(t('Error deleting group.'))
    }
  }

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
          onClick={() => handleDelete(row.original.id)}
        >
          {t('Delete')}
        </Button>
      </span>
            </Tooltip>
          )
        }
      }
    ],
    [t, canDelete]
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
  }, [selectedGroup, materialCard])

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: materialGroup ?? [],
    enableExpanding: true,
    getSubRows: (row) => row.children || [],
    initialState: { expanded: {}, density: 'comfortable' },
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableHiding: false,
    enableRowSelection: false,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedGroup((prev) => (prev === row.original.id ? null : row.original.id ?? null))
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
