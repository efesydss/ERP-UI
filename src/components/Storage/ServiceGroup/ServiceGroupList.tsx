import React, { useEffect, useMemo, useState } from 'react'
import { createRow, MaterialReactTable, MRT_ColumnDef, MRT_Row, MRT_TableInstance, useMaterialReactTable } from 'material-react-table'
import { deleteServiceCard, useAddServiceCard, useAddServiceGroup, useDeleteServiceGroup, useUpdateServiceCard } from '@/api/openAPIDefinition'
import { ServiceGroup, type ServiceCard, type ServiceGroupTreeItem } from '@/api/model'
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { useTranslation } from 'react-i18next'
import { serviceCards } from '@/api/filtering'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getServiceGroupTree } from '@/api/openAPIDefinition'


export const ServiceGroupList = () => {
  const { mutate: addServiceGroup } = useAddServiceGroup();

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null)
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();
  const { t } = useTranslation('common')
  const [canDelete, setCanDelete] = useState<boolean>(true)
  const [serviceCard, setServiceCard] = useState<ServiceCard[]>([])
  const [serviceGroups, setServiceGroups] = useState<ServiceGroupTreeItem[]>([])
  const [creatingRowParentId, setCreatingRowParentId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string>('');

  //SERVICE CARD CONSTSANDS
  const [isLoadingServiceCardsError, setIsLoadingServiceCardsError] = useState(false);
  const { mutate: addServiceCard } = useAddServiceCard();
  const { mutate: editServiceCard } = useUpdateServiceCard();

  const fetchServiceCards = async () => {
    const response = await serviceCards({
      filter: `serviceGroup.id==${selectedGroup ?? 0}`,
      page: 0,
      pageSize: 1000,
    })
    return response.data;
  }

  useEffect(() => {
    const loadServiceCards = async () => {
      const cards = await fetchServiceCards();
      setServiceCard(cards ?? []);
    }
    loadServiceCards();
  }, [selectedGroup])

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  // SERVICE CARD TABLE COLUMNS
  const columnsServiceCard = useMemo<MRT_ColumnDef<ServiceCard>[]>(
    () => [
      {
        header: t('Card Code'), accessorKey: 'serviceCode',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.serviceCode,
          helperText: validationErrors?.serviceCode,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              serviceCode: undefined,
            }),
        },
      },
      {
        header: t('Card Name'), accessorKey: 'serviceName',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.serviceName,
          helperText: validationErrors?.serviceName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              serviceName: undefined,
            }),
        },
      }
    ],
    [t, validationErrors]
  )

  //HANDLE CREATE SERVICE CARD
  const handleCreateServiceCard = async (props: { exitCreatingMode: () => void; row: MRT_Row<ServiceCard>; table: MRT_TableInstance<ServiceCard>; values: Record<string, any>; }) => {
    try {
      const newServiceCard = props.values as ServiceCard;

      if (selectedGroup) {
        newServiceCard.serviceGroup = { id: selectedGroup } as any;
      }

      addServiceCard({ data: newServiceCard }, {
        onSuccess: async () => {
          const updatedList = await fetchServiceCards();
          setServiceCard(updatedList ?? []);
          props.exitCreatingMode();
        },
        onError: (error: any) => {
          setIsLoadingServiceCardsError(true);
          console.error('Error creating service card:', error);
          window.alert('Error creating service card');
        },
      });
    } catch (error) {
      setIsLoadingServiceCardsError(true);
    }
  };

  /// HANDLE EDIT SERVICE CARD
  const handleSaveServiceCard = async (props: { exitEditingMode: () => void; row: MRT_Row<ServiceCard>; table: MRT_TableInstance<ServiceCard>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedServiceCard = {
        ...props.row.original, 
        ...props.values as ServiceCard  
      };
      
      const serviceCardId = props.row.original.id;
      
      if (selectedGroup && !updatedServiceCard.serviceGroup) {
        updatedServiceCard.serviceGroup = { id: selectedGroup } as any;
      }
      
      if (serviceCardId !== undefined && serviceCardId !== null) {
        editServiceCard({ id: serviceCardId, data: updatedServiceCard }, {
          onSuccess: async () => {
            const updatedList = await fetchServiceCards();
            setServiceCard(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingServiceCardsError(true);
            if (error instanceof Error) {
              console.error('Error updating service card:', error.message);
              window.alert('Error updating service card');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingServiceCardsError(true);
    }
  };

  ///handle delete service card
  const openDeleteConfirmModal = (row: MRT_Row<ServiceCard>) => {
    if (window.confirm('Are you sure you want to delete this service card?') && row.original.id !== undefined && row.original.id !== null) {
      deleteServiceCard(row.original.id).then(async () => {
        const updatedList = await fetchServiceCards();
        setServiceCard(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingServiceCardsError(true);
        console.error('Error deleting service card:', error);
        window.alert('Error deleting service card');
      });
    }
  };

  /// SERVICE CARD TABLE
  const serviceCardTable = useMaterialReactTable({
    columns: columnsServiceCard,
    data: serviceCard,
    enablePagination: false,
    editDisplayMode: 'row',
    enableEditing: true,
    initialState: { density: 'compact' },
    muiTableContainerProps: { sx: { maxHeight: '80vh' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateServiceCard,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveServiceCard,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingServiceCardsError
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
        Create New Service Card
      </Button>
    ),
  });

  useEffect(() => {
  }, [selectedGroup, serviceCard])

  /// Start of Service Group Table Definitions
  const fetchServiceGroups = async () => {
    try {
      const response = await getServiceGroupTree();
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching service groups:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadServiceGroups = async () => {
      const groups = await fetchServiceGroups();
      setServiceGroups(groups);
    };
    loadServiceGroups();
  }, []);

  useEffect(() => {
    if (Array.isArray(serviceCard) && serviceCard.length === 0) {
      console.log('Service card listesi boş, silme izni verildi');
      setCanDelete(true);
    } else if (Array.isArray(serviceCard) && serviceCard.length > 0) {
      console.log('Service card listesi dolu:', serviceCard);
      console.log('Silme izni kaldırıldı');
      setCanDelete(false);
    }
  }, [serviceCard])

  const handleCreateGroup = async (props: { exitCreatingMode: () => void; row: MRT_Row<ServiceGroupTreeItem>; table: MRT_TableInstance<ServiceGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const parentCode = creatingRowParentId ? serviceGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
      const newGroup: ServiceGroup = {
        name: props.values.name,
        code: parentCode + props.values.code,
        parent: creatingRowParentId ? { id: creatingRowParentId, code: '', name: '' } : undefined
      };

      console.log('Creating new group with data:', newGroup);

      addServiceGroup({ data: newGroup }, {
        onSuccess: async () => {
          setCreatingRowParentId(null);
          setPreview('');
          const groups = await fetchServiceGroups();
          setServiceGroups(groups);
          props.exitCreatingMode();
        },
        onError: (error) => {
          setCreatingRowParentId(null);
          console.error('Error creating service group:', error);
          window.alert('Error creating service group');
        },
      });
    } catch (error) {
      setCreatingRowParentId(null);
    }
  };

  const { mutateAsync: DeleteServiceGroup } = useDeleteServiceGroup()

  const handleDelete = async (id: number) => {
    try {
      console.log('Delete işlemi başlatıldı - Group ID:', id);
      
      const groupToDelete = serviceGroups.find(group => group.id === id);
      console.log('Silinmeye çalışılan grup:', groupToDelete);

      if (groupToDelete?.children && groupToDelete.children.length > 0) {
        console.log('Grup silme engellendi - Alt gruplar mevcut:', groupToDelete.children);
        alert(t('Cannot delete a group with child elements.'))
        return;
      }

      console.log('Mevcut service card listesi:', serviceCard);
      console.log('canDelete durumu:', canDelete);
      
      const hasLinkedCards = serviceCard.some(card => card.serviceGroup?.id === id);
      console.log('Bu gruba bağlı kartlar var mı?:', hasLinkedCards);

      if (hasLinkedCards) {
        console.log('Grup silme engellendi - Bağlı service cardlar var');
        alert(t('This group is linked to a Service Card and cannot be deleted.'))
        return;
      }

      console.log('Tüm kontroller başarılı, grup siliniyor...');
      await DeleteServiceGroup({ id });
      console.log('Grup başarıyla silindi');
      
      const groups = await fetchServiceGroups();
      setServiceGroups(groups);
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
    console.log('Seçim öncesi service card listesi:', serviceCard);
    setSelectedGroup(groupId);
  };

  const handleSaveGroup = async (props: { exitEditingMode: () => void; row: MRT_Row<ServiceGroupTreeItem>; table: MRT_TableInstance<ServiceGroupTreeItem>; values: Record<string, any>; }) => {
    try {
      const updatedGroup = props.values as ServiceGroupTreeItem;
      console.log(updatedGroup)
      props.exitEditingMode();
      const groups = await fetchServiceGroups();
      setServiceGroups(groups);
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };

  const columnsTree = useMemo<MRT_ColumnDef<ServiceGroupTreeItem>[]>(
    () => [
      {
        header: t('Code'),
        accessorKey: 'code',
        muiEditTextFieldProps: ({ row, table }: { row: MRT_Row<ServiceGroupTreeItem>, table: MRT_TableInstance<ServiceGroupTreeItem> }) => {
          const parentcode = creatingRowParentId ? serviceGroups.find(g => g.id === creatingRowParentId)?.code + '.' : '';
          
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
    [t, creatingRowParentId, serviceGroups, preview]
  )

  const groupListTable = useMaterialReactTable({
    columns: columnsTree,
    enablePagination: false,
    data: serviceGroups,
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
                  } as ServiceGroupTreeItem,
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
          <MaterialReactTable table={serviceCardTable} />
        </div>
      </Stack>
    </Stack>
  )
}
