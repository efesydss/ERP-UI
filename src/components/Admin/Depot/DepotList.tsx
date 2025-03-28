import React, { useMemo, useState, useEffect } from 'react'
import { Depot } from 'api/model/'
import { Stack } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  type MRT_TableInstance,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { PageTitle } from '@/components/Common/PageTitle/PageTitle'
import { depots } from '@/api/filtering'
import { deleteDepot, useAddDepot, useUpdateDepot } from '@/api/openAPIDefinition';


export const DepotList = () => {
  const { mutate: addDepot } = useAddDepot();
  const { mutate: editDepot } = useUpdateDepot();



  const fetchDepots = async () => {
    const depotsData = await depots({
      filter: "",
      sort: "id,asc",
      page: 0,
      pageSize: 50,
      namedFilters: ["show_passives"]
    });
    return depotsData.data;
  };
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [depotList, setDepotList] = useState<Depot[]>([]);
  const [isLoadingDepotsError, setIsLoadingDepotsError] = useState(false);

  useEffect(() => {
    const loadDepots = async () => {
      const list = await fetchDepots();
      setDepotList(list ?? []);
    };
    loadDepots();
  }, []);

  const openDeleteConfirmModal = (row: MRT_Row<Depot>) => {
    if (window.confirm('Are you sure you want to delete this depot?') && row.original.id !== undefined && row.original.id !== null) {
      deleteDepot(row.original.id).then(async () => {
        const updatedList = await fetchDepots();
        setDepotList(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingDepotsError(true);
        console.error('Error deleting depot:', error);
        window.alert('Error deleting depot');
      });
    }
  };
  const columns = useMemo<MRT_ColumnDef<Depot>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Depot Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  const handleCreateDepot = async (props: { exitCreatingMode: () => void; row: MRT_Row<Depot>; table: MRT_TableInstance<Depot>; values: Record<string, any>; }) => {
    try {
      const newDepot = props.values as Depot;
      addDepot({ data: newDepot }, {
        onSuccess: async () => {
          const updatedList = await fetchDepots();
          setDepotList(updatedList ?? []);
          props.exitCreatingMode();

        },
        onError: (error) => {
          setIsLoadingDepotsError(true);
          console.error('Error creating depot:', error);
          window.alert('Error creating depot');
        },
      });
    } catch (error) {
      setIsLoadingDepotsError(true);
    }
  };

  const handleSaveDepot = async (props: { exitEditingMode: () => void; row: MRT_Row<Depot>; table: MRT_TableInstance<Depot>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedDepot = props.values as Depot;
      const depotId = props.row.original.id;
      if (depotId !== undefined && depotId !== null) {
        editDepot({ id: depotId, data: updatedDepot }, {
          onSuccess: async () => {
            const updatedList = await fetchDepots();
            setDepotList(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingDepotsError(true);
            if (error instanceof Error) {
              console.error('Error updating depot:', error.message);
              window.alert('Error updating depot');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingDepotsError(true);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: depotList,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingDepotsError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateDepot,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveDepot,
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
        Create New Depot
      </Button>
    ),
  });

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <PageTitle title="Depots" />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={table} />
        </div>
      </Stack>
    </Stack>
  )
};