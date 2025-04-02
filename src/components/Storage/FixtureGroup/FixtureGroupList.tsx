import React, { useEffect, useMemo, useState } from 'react'
import { createRow, MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_TableInstance, useMaterialReactTable } from 'material-react-table'
import { deleteFixtureCard, useAddFixtureCard, useAddFixtureGroup, useDeleteFixtureGroup, useUpdateFixtureCard } from '@/api/openAPIDefinition'
import { FixtureGroup, type FixtureCard, type FixtureGroupTreeItem } from '@/api/model'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { fixtureCards } from '@/api/filtering'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFixtureGroupTree } from '@/api/openAPIDefinition'


export const FixtureGroupList = () => {
  const { mutate: addFixtureGroup } = useAddFixtureGroup();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)
  const [fixtureCard, setFixtureCard] = useState<FixtureCard[]>([])
  const [fixtureGroups, setFixtureGroups] = useState<FixtureGroupTreeItem[]>([])
  const [creatingRowParentId, setCreatingRowParentId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string>('');

  //FIXTURE CARD CONSTSANDS
  const [isLoadingFixtureCardsError, setIsLoadingFixtureCardsError] = useState(false);
  const { mutate: addFixtureCard } = useAddFixtureCard();
  const { mutate: editFixtureCard } = useUpdateFixtureCard();

  const fetchFixtureCards = async () => {
    const response = await fixtureCards({
      filter: `fixtureGroup.id==${selectedGroup ?? 0}`,
      page: 0,
      pageSize: 1000,
    })
    return response.data;
  }

  useEffect(() => {
    const loadFixtureCards = async () => {
      const cards = await fetchFixtureCards();
      setFixtureCard(cards ?? []);
    }
    loadFixtureCards();
  }, [selectedGroup])

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // FIXTURE CARD TABLE COLUMNS
  const columnsFixtureCard = useMemo<MRT_ColumnDef<FixtureCard>[]>(
    () => [
      {
        header: t('Card Code'), accessorKey: 'fixtureCode',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.fixtureCode,
          helperText: validationErrors?.fixtureCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fixtureCode: undefined,
            }),
        },
      },
      {
        header: t('Card Name'), accessorKey: 'fixtureName',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.fixtureName,
          helperText: validationErrors?.fixtureName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              fixtureName: undefined,
            }),
        },
      }
    ],
    [t, validationErrors]
  )

  //HANDLE CREATE FIXTURE CARD
  const handleCreateFixtureCard = async (props: { exitCreatingMode: () => void; row: MRT_Row<FixtureCard>; table: MRT_TableInstance<FixtureCard>; values: Record<string, any>; }) => {
    try {
      const newFixtureCard = props.values as FixtureCard;

      if (selectedGroup) {
        newFixtureCard.fixtureGroup = { id: selectedGroup } as any;
      }

      addFixtureCard({ data: newFixtureCard }, {
        onSuccess: async () => {
          const updatedList = await fetchFixtureCards();
          setFixtureCard(updatedList ?? []);
          props.exitCreatingMode();
        },
        onError: (error: any) => {
          setIsLoadingFixtureCardsError(true);
          console.error('Error creating fixture card:', error);
          window.alert('Error creating fixture card');
        },
      });
    } catch (error) {
      setIsLoadingFixtureCardsError(true);
    }
  };

  /// HANDLE EDIT FIXTURE CARD
  const handleSaveFixtureCard = async (props: { exitEditingMode: () => void; row: MRT_Row<FixtureCard>; table: MRT_TableInstance<FixtureCard>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedFixtureCard = {
        ...props.row.original, 
        ...props.values as FixtureCard  
      };
      
      const fixtureCardId = props.row.original.id;
      
      if (selectedGroup && !updatedFixtureCard.fixtureGroup) {
        updatedFixtureCard.fixtureGroup = { id: selectedGroup } as any;
      }
      
      if (fixtureCardId !== undefined && fixtureCardId !== null) {
        editFixtureCard({ id: fixtureCardId, data: updatedFixtureCard }, {
          onSuccess: async () => {
            const updatedList = await fetchFixtureCards();
            setFixtureCard(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingFixtureCardsError(true);
            if (error instanceof Error) {
              console.error('Error updating fixture card:', error.message);
              window.alert('Error updating fixture card');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingFixtureCardsError(true);
    }
  };

  ///handle delete fixture card
  const openDeleteConfirmModal = (row: MRT_Row<FixtureCard>) => {
    if (window.confirm('Are you sure you want to delete this fixture card?') && row.original.id !== undefined && row.original.id !== null) {
      deleteFixtureCard(row.original.id).then(async () => {
        const updatedList = await fetchFixtureCards();
        setFixtureCard(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingFixtureCardsError(true);
        console.error('Error deleting fixture card:', error);
        window.alert('Error deleting fixture card');
      });
    }
  };

  /// FIXTURE CARD TABLE
  const fixtureCardTable = useMaterialReactTable({
    columns: columnsFixtureCard,
    data: fixtureCard,
    enablePagination: false,
    editDisplayMode: 'row',
    enableEditing: true,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateFixtureCard,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveFixtureCard,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingFixtureCardsError
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
        Create New Fixture Card
      </Button>
    ),
  });

  useEffect(() => {
  }, [selectedGroup, fixtureCard])

  /// Start of Fixture Group Table Definitions
  const fetchFixtureGroups = async () => {
    try {
      const response = await getFixtureGroupTree();
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching fixture groups:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadFixtureGroups = async () => {
      const groups = await fetchFixtureGroups();
      setFixtureGroups(groups);
    };
    loadFixtureGroups();
  }, []);

  useEffect(() => {
    if (Array.isArray(fixtureCard) && fixtureCard.length === 0) {
      console.log('Fixture card listesi boş, silme izni verildi');
      setCanDelete(true);
    } else if (Array.isArray(fixtureCard) && fixtureCard.length > 0) {
      console.log('Fixture card listesi dolu:', fixtureCard);
      console.log('Silme izni kaldırıldı');
      setCanDelete(false);
    }
  }, [fixtureCard])

  const handleCreateGroup = async (props: { exitCreatingMode: () => void; row: MRT_Row<FixtureGroupTreeItem>; table: MRT_TableInstance<FixtureGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const parentCode = creatingRowParentId ? fixtureGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
      const newGroup: FixtureGroup = {
        name: props.values.name,
        code: parentCode + props.values.code,
        parent: creatingRowParentId ? { id: creatingRowParentId, code: '', name: '' } : undefined
      };

      console.log('Creating new group with data:', newGroup);

      addFixtureGroup({ data: newGroup }, {
        onSuccess: async () => {
          setCreatingRowParentId(null);
          setPreview('');
          const groups = await fetchFixtureGroups();
          setFixtureGroups(groups);
          props.exitCreatingMode();
        },
        onError: (error) => {
          setCreatingRowParentId(null);
          console.error('Error creating fixture group:', error);
          window.alert('Error creating fixture group');
        },
      });
    } catch (error) {
      setCreatingRowParentId(null);
    }
  };

  const { mutateAsync: DeleteFixtureGroup } = useDeleteFixtureGroup()

  const handleDelete = async (id: number) => {
    try {
      console.log('Delete işlemi başlatıldı - Group ID:', id);
      
      const groupToDelete = fixtureGroups.find(group => group.id === id);
      console.log('Silinmeye çalışılan grup:', groupToDelete);

      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        console.log('Grup silme engellendi - Alt gruplar mevcut:', groupToDelete.children);
        alert(t('Cannot delete a group with child elements.'))
        return;
      }

      console.log('Mevcut fixture card listesi:', fixtureCard);
      console.log('canDelete durumu:', canDelete);
      
      const hasLinkedCards = fixtureCard.some(card => card.fixtureGroup?.id === id);
      console.log('Bu gruba bağlı kartlar var mı?:', hasLinkedCards);

      if (hasLinkedCards) {
        console.log('Grup silme engellendi - Bağlı fixture cardlar var');
        alert(t('This group is linked to a Fixture Card and cannot be deleted.'))
        return;
      }

      console.log('Tüm kontroller başarılı, grup siliniyor...');
      await DeleteFixtureGroup({ id });
      console.log('Grup başarıyla silindi');
      
      const groups = await fetchFixtureGroups();
      setFixtureGroups(groups);
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
    console.log('Seçim öncesi fixture card listesi:', fixtureCard);
    setSelectedGroup(groupId);
  };

  const handleSaveGroup = async (props: { exitEditingMode: () => void; row: MRT_Row<FixtureGroupTreeItem>; table: MRT_TableInstance<FixtureGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const updatedGroup = props.values as FixtureGroupTreeItem;
      console.log(updatedGroup)
      props.exitEditingMode();
      const groups = await fetchFixtureGroups();
      setFixtureGroups(groups);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const columnsTree = useMemo<MRT_ColumnDef<FixtureGroupTreeItem>[]>(
    () => [
      {
        header: t('Code'),
        accessorKey: 'code',
        muiEditTextFieldProps: ({ row, table }: { row: MRT_Row<FixtureGroupTreeItem>, table: MRT_TableInstance<FixtureGroupTreeItem> }) => {
          const parentcode = creatingRowParentId ? fixtureGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
          
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
    [t, creatingRowParentId, fixtureGroups, preview]
  )

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: fixtureGroups,
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
                  } as FixtureGroupTreeItem,
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
          <MaterialReactTable table={fixtureCardTable} />
        </div>
      </Stack>
    </Stack>
  )
}
