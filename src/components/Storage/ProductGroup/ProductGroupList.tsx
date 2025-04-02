import React, { useEffect, useMemo, useState } from 'react'
import { createRow, MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_TableInstance, useMaterialReactTable } from 'material-react-table'
import { deleteProductCard, useAddProductCard, useAddProductGroup, useDeleteProductGroup, useUpdateProductCard } from '@/api/openAPIDefinition'
import { ProductGroup, type ProductCard, type ProductGroupTreeItem } from '@/api/model'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { productCards } from '@/api/filtering'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProductGroupTree } from '@/api/openAPIDefinition'


export const ProductGroupList = () => {
  const { mutate: addProductGroup } = useAddProductGroup();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)
  const [productCard, setProductCard] = useState<ProductCard[]>([])
  const [productGroups, setProductGroups] = useState<ProductGroupTreeItem[]>([])
  const [creatingRowParentId, setCreatingRowParentId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string>('');

  //PRODUCT CARD CONSTSANDS
  const [isLoadingProductCardsError, setIsLoadingProductCardsError] = useState(false);
  const { mutate: addProductCard } = useAddProductCard();
  const { mutate: editProductCard } = useUpdateProductCard();

  const fetchProductCards = async () => {
    const response = await productCards({
      filter: `productGroup.id==${selectedGroup ?? 0}`,
      page: 0,
      pageSize: 1000,
    })
    return response.data;
  }

  useEffect(() => {
    const loadProductCards = async () => {
      const cards = await fetchProductCards();
      setProductCard(cards ?? []);
    }
    loadProductCards();
  }, [selectedGroup])

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // PRODUCT CARD TABLE COLUMNS
  const columnsProductCard = useMemo<MRT_ColumnDef<ProductCard>[]>(
    () => [
      {
        header: t('Card Code'), accessorKey: 'productCode',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.productCode,
          helperText: validationErrors?.productCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              productCode: undefined,
            }),
        },
      },
      {
        header: t('Card Name'), accessorKey: 'productName',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.productName,
          helperText: validationErrors?.productName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              productName: undefined,
            }),
        },
      }
    ],
    [t, validationErrors]
  )

  //HANDLE CREATE PRODUCT CARD
  const handleCreateProductCard = async (props: { exitCreatingMode: () => void; row: MRT_Row<ProductCard>; table: MRT_TableInstance<ProductCard>; values: Record<string, any>; }) => {
    try {
      const newProductCard = props.values as ProductCard;

      if (selectedGroup) {
        newProductCard.productGroup = { id: selectedGroup } as any;
      }

      addProductCard({ data: newProductCard }, {
        onSuccess: async () => {
          const updatedList = await fetchProductCards();
          setProductCard(updatedList ?? []);
          props.exitCreatingMode();
        },
        onError: (error: any) => {
          setIsLoadingProductCardsError(true);
          console.error('Error creating product card:', error);
          window.alert('Error creating product card');
        },
      });
    } catch (error) {
      setIsLoadingProductCardsError(true);
    }
  };

  /// HANDLE EDIT PRODUCT CARD
  const handleSaveProductCard = async (props: { exitEditingMode: () => void; row: MRT_Row<ProductCard>; table: MRT_TableInstance<ProductCard>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedProductCard = {
        ...props.row.original, 
        ...props.values as ProductCard  
      };
      
      const productCardId = props.row.original.id;
      
      if (selectedGroup && !updatedProductCard.productGroup) {
        updatedProductCard.productGroup = { id: selectedGroup } as any;
      }
      
      if (productCardId !== undefined && productCardId !== null) {
        editProductCard({ id: productCardId, data: updatedProductCard }, {
          onSuccess: async () => {
            const updatedList = await fetchProductCards();
            setProductCard(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingProductCardsError(true);
            if (error instanceof Error) {
              console.error('Error updating product card:', error.message);
              window.alert('Error updating product card');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingProductCardsError(true);
    }
  };

  ///handle delete product card
  const openDeleteConfirmModal = (row: MRT_Row<ProductCard>) => {
    if (window.confirm('Are you sure you want to delete this product card?') && row.original.id !== undefined && row.original.id !== null) {
      deleteProductCard(row.original.id).then(async () => {
        const updatedList = await fetchProductCards();
        setProductCard(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingProductCardsError(true);
        console.error('Error deleting product card:', error);
        window.alert('Error deleting product card');
      });
    }
  };

  /// PRODUCT CARD TABLE
  const productCardTable = useMaterialReactTable({
    columns: columnsProductCard,
    data: productCard,
    enablePagination: false,
    editDisplayMode: 'row',
    enableEditing: true,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateProductCard,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProductCard,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingProductCardsError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    renderEmptyRowsFallback: () => (
      <div style={{ textAlign: 'center', padding: '16px' }}>{t('No data available')}</div>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Product Card
      </Button>
    ),
  });

  useEffect(() => {
  }, [selectedGroup, productCard])

  /// Start of Product Group Table Definitions
  const fetchProductGroups = async () => {
    try {
      const response = await getProductGroupTree();
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching product groups:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadProductGroups = async () => {
      const groups = await fetchProductGroups();
      setProductGroups(groups);
    };
    loadProductGroups();
  }, []);

  useEffect(() => {
    if (Array.isArray(productCard) && productCard.length === 0) {
      console.log('Product card listesi boş, silme izni verildi');
      setCanDelete(true);
    } else if (Array.isArray(productCard) && productCard.length > 0) {
      console.log('Product card listesi dolu:', productCard);
      console.log('Silme izni kaldırıldı');
      setCanDelete(false);
    }
  }, [productCard])

  const handleCreateGroup = async (props: { exitCreatingMode: () => void; row: MRT_Row<ProductGroupTreeItem>; table: MRT_TableInstance<ProductGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const parentCode = creatingRowParentId ? productGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
      const newGroup: ProductGroup = {
        name: props.values.name,
        code: parentCode + props.values.code,
        parent: creatingRowParentId ? { id: creatingRowParentId, code: '', name: '' } : undefined
      };

      console.log('Creating new group with data:', newGroup);

      addProductGroup({ data: newGroup }, {
        onSuccess: async () => {
          setCreatingRowParentId(null);
          setPreview('');
          const groups = await fetchProductGroups();
          setProductGroups(groups);
          props.exitCreatingMode();
        },
        onError: (error) => {
          setCreatingRowParentId(null);
          console.error('Error creating product group:', error);
          window.alert('Error creating product group');
        },
      });
    } catch (error) {
      setCreatingRowParentId(null);
    }
  };

  const { mutateAsync: DeleteProductGroup } = useDeleteProductGroup()

  const handleDelete = async (id: number) => {
    try {
      console.log('Delete işlemi başlatıldı - Group ID:', id);
      
      const groupToDelete = productGroups.find(group => group.id === id);
      console.log('Silinmeye çalışılan grup:', groupToDelete);

      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        console.log('Grup silme engellendi - Alt gruplar mevcut:', groupToDelete.children);
        alert(t('Cannot delete a group with child elements.'))
        return;
      }

      console.log('Mevcut product card listesi:', productCard);
      console.log('canDelete durumu:', canDelete);
      
      const hasLinkedCards = productCard.some(card => card.productGroup?.id === id);
      console.log('Bu gruba bağlı kartlar var mı?:', hasLinkedCards);

      if (hasLinkedCards) {
        console.log('Grup silme engellendi - Bağlı product cardlar var');
        alert(t('This group is linked to a Product Card and cannot be deleted.'))
        return;
      }

      console.log('Tüm kontroller başarılı, grup siliniyor...');
      await DeleteProductGroup({ id });
      console.log('Grup başarıyla silindi');
      
      const groups = await fetchProductGroups();
      setProductGroups(groups);
    } catch (error: any) {
      console.error('Grup silme hatası:', error);
      console.error('Hata detayları:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      alert(t('Error deleting group.'))
    }
  }

  const handleRowClick = (groupId: number) => {
    console.log(`Seçilen Grup ID: ${groupId}`);
    console.log('Seçim öncesi product card listesi:', productCard);
    setSelectedGroup(groupId);
  };

  const handleSaveGroup = async (props: { exitEditingMode: () => void; row: MRT_Row<ProductGroupTreeItem>; table: MRT_TableInstance<ProductGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const updatedGroup = props.values as ProductGroupTreeItem;
      console.log(updatedGroup)
      props.exitEditingMode();
      const groups = await fetchProductGroups();
      setProductGroups(groups);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const columnsTree = useMemo<MRT_ColumnDef<ProductGroupTreeItem>[]>(
    () => [
      {
        header: t('Code'),
        accessorKey: 'code',
        muiEditTextFieldProps: ({ row, table }: { row: MRT_Row<ProductGroupTreeItem>, table: MRT_TableInstance<ProductGroupTreeItem> }) => {
          const parentcode = creatingRowParentId ? productGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
          
          const isCreating = !row.original.id; 
          
          console.log(row.original.code);
          console.log('Is creating new row:', isCreating);
          console.log('Table state:', table.getState());
          return {
            required: true,
            disabled: !isCreating, 
            sx: {
              '& .MuiFormLabel-root': {
                position: 'absolute',
                top: '-20px',
                left: '14px',
                fontSize: '0.75rem',
                color: 'rgba(0, 0, 0, 0.6)',
              }
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setPreview(`${parentcode}${value}`);
            },
            InputProps: {
              startAdornment: (
                <Box sx={{
                  position: 'absolute',
                  top: '-20px',
                  right: '14px',
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)'
                }}>
                  Preview: {preview}
                </Box>
              )
            }
          };
        }
      },
      {
        header: t('Name'),
        accessorKey: 'name',
        muiEditTextFieldProps: {
          required: true,
        },
      },
    ],
    [t, creatingRowParentId, productGroups, preview]
  )

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: productGroups,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableColumnPinning: true,
    enableEditing: true,
    enableExpanding: true,
    positionCreatingRow: creatingRowIndex,
    onCreatingRowSave: handleCreateGroup,
    onEditingRowSave: handleSaveGroup,

    getRowId: (row) => row.id?.toString() ?? '',
    renderRowActions: ({ row, staticRowIndex, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row.original.id ?? 0)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Subordinate">
          <IconButton
            onClick={() => {
              setCreatingRowIndex((staticRowIndex || 0) + 1);
              setCreatingRowParentId(row.original.id ?? null);
              table.setCreatingRow(
                createRow(
                  table,
                  {
                    id: null!,
                    code: '',
                    name: '',
                    children: []
                  } as ProductGroupTreeItem,
                  -1,
                  row.depth + 1,
                ),
              );
            }}
          >
            <PersonAddAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    getSubRows: (row) => row.children || [],
    initialState: { expanded: {}, density: 'comfortable' },
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableHiding: false,
    enableRowSelection: false,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        handleRowClick(row.original.id ?? 0);
      },
      selected: selectedGroup === row.original.id,
      sx: {
        cursor: 'pointer',
        backgroundColor: selectedGroup === row.original.id ? '#e0f7fa' : 'inherit'
      }
    })
  })

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <PageTitle title="Catalog" />
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
