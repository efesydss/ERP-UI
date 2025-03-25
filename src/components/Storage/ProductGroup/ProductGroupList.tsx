import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table'
import { useDeleteProductGroup, useGetProductCard, useGetProductGroupTreeSuspense } from '@/api/openAPIDefinition'
import { type ProductCard, type ProductGroupTreeItem } from '@/api/model'
import { Button, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { Route as ProductGroupRoute } from '@/routes/_authenticated/storage/productGroups/new'
import { Route as ProductNewRoute } from '@/routes/_authenticated/storage/productCards/new'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const ProductGroupList = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)


  const { data: productGroup } = useGetProductGroupTreeSuspense({
    query: {
      select: (response) => response.productGroups ?? []
    }
  })
  const [endpoint, setEndpoint] = useState('1')
  const handleCatalogChange = (value: string) => {
    setEndpoint(value)
    navigate({
      to: value === '1'
        ? '/storage/productGroups'
        : value === '2'
          ? '/storage/materialGroups'
          : '/serviceGroups'
    })
  }

  const { data: productCard } = useGetProductCard(selectedGroup ?? 0, {
    query: {
      enabled: selectedGroup !== null && selectedGroup !== 0,
      select: (response) => response ?? []
    }
  })


  const { mutateAsync: DeleteProductGroup } = useDeleteProductGroup()

  useEffect(() => {
    if (Array.isArray(productCard) && productCard.length === 0) {
      setCanDelete(true)
    } else if (Array.isArray(productCard) && productCard.length > 0) {
      setCanDelete(false)
    }
  }, [productCard])

  const handleDelete = async (id: number) => {
    try {
      const groupToDelete = productGroup.find(group => group.id === id)

      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        alert(t('Cannot delete a group with child elements.'))
        return
      }

      if (!canDelete) {
        alert(t('This group is linked to a Product Card and cannot be deleted.'))
        return
      }

       console.log("Product Group Data:", productGroup);

      if (productGroup.some(group => group.id === id)) {
        alert(t('This group is linked to a Product Card and cannot be deleted.'))
        return
      }

      await DeleteProductGroup({ id })
      alert(t('Group deleted successfully.'))
    } catch (error: any) {
      console.error('Error deleting group:', error)
      alert(t('Error deleting group.'))
    }
  }

  const columnsTree = useMemo<MRT_ColumnDef<ProductGroupTreeItem>[]>(
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
          onClick={() => row.original.id && handleDelete(row.original.id)}
        >
          {t('Delete')}
        </Button>
      </span>
            </Tooltip>
          )
        }
      }
    ],
    [t, handleDelete]
  )

  const columnsProductCard = useMemo<MRT_ColumnDef<ProductCard>[]>(
    () => [
      { header: t('Card Code'), accessorKey: 'productCode' },
      { header: t('Card Name'), accessorKey: 'productName' }
    ],
    [t]
  )

  const productCardTable = useMaterialReactTable({
    columns: columnsProductCard,
    data: productCard || [],
    enablePagination: false,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    renderEmptyRowsFallback: () => (
      <div style={{ textAlign: 'center', padding: '16px' }}>{t('No data available')}</div>
    )
  })

  useEffect(() => {
  }, [selectedGroup, productCard])

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: productGroup,
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

  const ProductGroupListActions = () => (
    <>
      <Button variant="contained" size="small" onClick={() => navigate({ to: ProductGroupRoute.fullPath })}>
        {t('Add New Product Group')}
      </Button>
      <Button variant="contained" size="small" onClick={() => navigate({ to: ProductNewRoute.fullPath })}>
        {t('Add New Product Card')}
      </Button>
    </>
  )

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <PageTitle
        title="Catalog"
        actions={
          <>
            <ProductGroupListActions />
            <Select
              value={endpoint}
              onChange={(e) => handleCatalogChange(e.target.value)}
              sx={{ minWidth: 200, ml: 2 }}
            >
              <MenuItem value="1">Material Groups</MenuItem>
              <MenuItem value="2">Product Groups</MenuItem>
              <MenuItem value="3">Another Groups</MenuItem>
            </Select>
          </>
        }
      />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={groupListTable} />
        </div>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={productCardTable} />
        </div>
      </Stack>
    </Stack>
  )
}
