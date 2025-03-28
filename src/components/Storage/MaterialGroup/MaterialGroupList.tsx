import React, { useEffect, useMemo, useState } from 'react'
import { createRow, MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_TableInstance, useMaterialReactTable } from 'material-react-table'
import { addMaterialCard, deleteMaterialCard, useAddMaterialCard, useAddMaterialGroup, useDeleteMaterialGroup, useUpdateMaterialCard } from '@/api/openAPIDefinition'
import { Depot, MaterialGroup, type MaterialCard, type MaterialGroupTreeItem } from '@/api/model'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { materialCards } from '@/api/filtering'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getMaterialGroupTree } from '@/api/openAPIDefinition'


export const MaterialGroupList = () => {
  const { mutate: addMaterialGroup } = useAddMaterialGroup();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)
  const [materialCard, setMaterialCard] = useState<MaterialCard[]>([])
  const [materialGroups, setMaterialGroups] = useState<MaterialGroupTreeItem[]>([])
  const [creatingRowParentId, setCreatingRowParentId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string>('');



  //MATERIAL CARD CONSTSANDS
  const [isLoadingMaterialCardsError, setIsLoadingMaterialCardsError] = useState(false);
  const { mutate: addMaterialCard } = useAddMaterialCard();
  const { mutate: editMaterialCard } = useUpdateMaterialCard();

  const fetchMaterialCards = async () => {
    const response = await materialCards({
      filter: `materialGroup.id==${selectedGroup ?? 0}`,
      page: 0,
      pageSize: 1000,
    })
    return response.data;
  }


  useEffect(() => {
    const loadMaterialCards = async () => {
      const cards = await fetchMaterialCards();
      setMaterialCard(cards ?? []);
    }
    loadMaterialCards();
  }, [selectedGroup])

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});


  const columnsMaterialCard = useMemo<MRT_ColumnDef<MaterialCard>[]>(
    () => [
      {
        header: t('Card Code'), accessorKey: 'materialCode',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.materialCode,
          helperText: validationErrors?.materialCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              materialCode: undefined,
            }),
        },
      },
      {
        header: t('Card Name'), accessorKey: 'materialName',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.materialName,
          helperText: validationErrors?.materialName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              materialName: undefined,
            }),
        },
      }
    ],
    [t, validationErrors]
  )

  //HANDLE CREATE MATERIAL CARD
  const handleCreateMaterialCard = async (props: { exitCreatingMode: () => void; row: MRT_Row<MaterialCard>; table: MRT_TableInstance<MaterialCard>; values: Record<string, any>; }) => {
    try {
      const newMaterialCard = props.values as MaterialCard;
      
      
      if (selectedGroup) {
        newMaterialCard.materialGroup = { id: selectedGroup } as any;
      }
      
      addMaterialCard({ data: newMaterialCard }, {
        onSuccess: async () => {
          const updatedList = await fetchMaterialCards();
          setMaterialCard(updatedList ?? []);
          props.exitCreatingMode();

        },
        onError: (error: any) => {
          setIsLoadingMaterialCardsError(true);
          console.error('Error creating material card:', error);
          window.alert('Error creating material card');
        },
      });
    } catch (error) {
      setIsLoadingMaterialCardsError(true);
    }
  };


  /// HANDLE EDIT MATERIAL CARD
  const handleSaveMaterialCard = async (props: { exitEditingMode: () => void; row: MRT_Row<MaterialCard>; table: MRT_TableInstance<MaterialCard>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedMaterialCard = props.values as MaterialCard;
      const materialCardId = props.row.original.id;
      if (materialCardId !== undefined && materialCardId !== null) {
        editMaterialCard({ id: materialCardId, data: updatedMaterialCard }, {
          onSuccess: async () => {
            const updatedList = await fetchMaterialCards();
            setMaterialCard(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingMaterialCardsError(true);
            if (error instanceof Error) {
              console.error('Error updating material card:', error.message);
              window.alert('Error updating material card');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingMaterialCardsError(true);
    }
  };

  ///handle delete material card
    const openDeleteConfirmModal = (row: MRT_Row<MaterialCard>) => {
    if (window.confirm('Are you sure you want to delete this material card?') && row.original.id !== undefined && row.original.id !== null) {
      deleteMaterialCard(row.original.id).then(async () => {
        const updatedList = await fetchMaterialCards();
        setMaterialCard(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingMaterialCardsError(true);
        console.error('Error deleting material card:', error);
        window.alert('Error deleting material card');
      });
    }
  };



  /// MATERIAL CARD TABLE
  const materialCardTable = useMaterialReactTable({
    columns: columnsMaterialCard,
    data: materialCard,
    enablePagination: false,
    editDisplayMode: 'row',
    enableEditing: true,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateMaterialCard,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveMaterialCard,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingMaterialCardsError
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
        Create New Material Card
      </Button>
    ),


  });

  useEffect(() => {
  }, [selectedGroup, materialCard])






























  const fetchMaterialGroups = async () => {
    try {
      const response = await getMaterialGroupTree();
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching material groups:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMaterialGroups = async () => {
      const groups = await fetchMaterialGroups();
      setMaterialGroups(groups);
    };
    loadMaterialGroups();
  }, []);

  useEffect(() => {
    if (Array.isArray(materialCard) && materialCard.length === 0) {
      setCanDelete(true)
    } else if (Array.isArray(materialCard) && materialCard.length > 0) {
      setCanDelete(false)
    }
  }, [materialCard])
  const handleCreateGroup = async (props: { exitCreatingMode: () => void; row: MRT_Row<MaterialGroupTreeItem>; table: MRT_TableInstance<MaterialGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const parentCode = creatingRowParentId ? materialGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
      const newGroup: MaterialGroup = {
        name: props.values.name,
        code: parentCode + props.values.code,
        parent: creatingRowParentId ? { id: creatingRowParentId, code: '', name: '' } : undefined
      };

      console.log('Creating new group with data:', newGroup);

      addMaterialGroup({ data: newGroup }, {
        onSuccess: async () => {
          setCreatingRowParentId(null);
          setPreview('');
          const groups = await fetchMaterialGroups();
          setMaterialGroups(groups);
          props.exitCreatingMode();
        },
        onError: (error) => {
          setCreatingRowParentId(null);
          console.error('Error creating material group:', error);
          window.alert('Error creating material group');
        },
      });
    } catch (error) {
      setCreatingRowParentId(null);
    }
  };


  const { mutateAsync: DeleteMaterialGroup } = useDeleteMaterialGroup()



  const handleDelete = async (id: number) => {
    try {
      const groupToDelete = materialGroups.find(group => group.id === id)

      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        alert(t('Cannot delete a group with child elements.'))
        return
      }

      if (!canDelete) {//todo ef bunu materialcard ile kontrol et
        alert(t('This group is linked to a Material Card and cannot be deleted.'))
        return
      }

      if (materialGroups.some(group => group.id === id)) {
        alert(t('This group is linked to a Material Card and cannot be deleted.'))
        return
      }
      await DeleteMaterialGroup({ id })
      const groups = await fetchMaterialGroups();
      setMaterialGroups(groups);
    } catch (error: any) {
      console.error('Error deleting group:', error)
      alert(t('Error deleting group.'))
    }
  }

  const handleRowClick = (groupId: number) => {
    console.log(`Selected Group ID: ${groupId}`);
    setSelectedGroup(groupId);
  };

  const handleSaveGroup = async (props: { exitEditingMode: () => void; row: MRT_Row<MaterialGroupTreeItem>; table: MRT_TableInstance<MaterialGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const updatedGroup = props.values as MaterialGroupTreeItem;
      console.log(updatedGroup)
      props.exitEditingMode();
      const groups = await fetchMaterialGroups();
      setMaterialGroups(groups);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const columnsTree = useMemo<MRT_ColumnDef<MaterialGroupTreeItem>[]>(
    () => [
      {
        header: t('Code'),
        accessorKey: 'code',
        muiEditTextFieldProps: ({ row }: { row: MRT_Row<MaterialGroupTreeItem> }) => {
          const parentcode = creatingRowParentId ? materialGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';

          console.log(row.original.code)
          return {
            required: true,
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
    [t, creatingRowParentId, materialGroups, preview]
  )


  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: materialGroups,
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
                  } as MaterialGroupTreeItem,
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
          <MaterialReactTable table={materialCardTable} />
        </div>
      </Stack>
    </Stack>
  )
}