import { useEffect, useState, useMemo } from "react";
import { Company, Branch } from "@/api/model/";
import { deleteCompany, useAddCompany, useUpdateCompany } from "@/api/openAPIDefinition";
import { MaterialReactTable, MRT_ColumnDef, MRT_TableInstance, useMaterialReactTable } from "material-react-table";
import { companies, branches } from "@/api/filtering";
import { MRT_Row } from "material-react-table";
import { Button, Stack, Box, IconButton, Tooltip, MenuItem, Select } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PageTitle } from "@/components/Common/PageTitle/PageTitle";

export const CompanyList = () => {
  const { mutate: addCompany } = useAddCompany();
  const { mutate: editCompany } = useUpdateCompany();

  const [branchList, setBranchList] = useState<Branch[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [isLoadingCompaniesError, setIsLoadingCompaniesError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const fetchCompanies = async () => {
    const companiesData = await companies({
      filter: "",
      sort: "id,asc",
      page: 0,
      pageSize: 50,
      namedFilters: ["show_passives"]
    });
    return companiesData.data;
  };

  useEffect(() => {
    const loadCompanies = async () => {
      const list = await fetchCompanies();
      setCompanyList(list ?? []);
    };
    loadCompanies();

    const loadBranches = async () => {
      const response = await branches({
        filter: "",
        sort: "id,asc",
        page: 0,
        pageSize: 50,
      });
      setBranchList(response.data ?? []);
    };
    loadBranches();
  }, []);

  const openDeleteConfirmModal = (row: MRT_Row<Company>) => {
    if (window.confirm('Are you sure you want to delete this company?') && row.original.id !== undefined && row.original.id !== null) {
      deleteCompany(row.original.id).then(async () => {
        const updatedList = await fetchCompanies();
        setCompanyList(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingCompaniesError(true);
        console.error('Error deleting company:', error);
        window.alert('Error deleting company');
      });
    }
  };

  const columns = useMemo<MRT_ColumnDef<Company>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Code',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.code,
          helperText: validationErrors?.code,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              code: undefined,
            }),
        },
      },
      {
        accessorKey: 'title',
        header: 'Title',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.title,
          helperText: validationErrors?.title,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              title: undefined,
            }),
        },
      },
      {
        accessorKey: 'address',
        header: 'Address',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.address,
          helperText: validationErrors?.address,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              address: undefined,
            }),
        },
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.phone,
          helperText: validationErrors?.phone,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phone: undefined,
            }),
        },
      },
      {
        accessorKey: 'phoneBackup',
        header: 'Phone Backup',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.phoneBackup,
          helperText: validationErrors?.phoneBackup,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              phoneBackup: undefined,
            }),
        },
      },
      {
        accessorKey: 'taxAdmin',
        header: 'Tax Admin',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.taxAdmin,
          helperText: validationErrors?.taxAdmin,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              taxAdmin: undefined,
            }),
        },
      },
      {
        accessorKey: 'taxNumber',
        header: 'Tax Number',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.taxNumber,
          helperText: validationErrors?.taxNumber,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              taxNumber: undefined,
            }),
        },
      },
      {
        accessorKey: 'branch',
        header: 'Branch',
        Cell: ({ cell }) => {
          const value = cell.getValue<Branch>();
          return value ? value.name : '';
        },
        muiEditTextFieldProps: ({ row, cell }) => ({
          select: true,
          value: cell.getValue<Branch>()?.id ?? 0,
          children: branchList.map((branch) => (
            <MenuItem key={branch.id} value={branch.id ?? 0}>
              {branch.name}
            </MenuItem>
          )),
          onChange: (e) => {
            const selectedBranch = branchList.find(branch => branch.id === parseInt(e.target.value));
            if (selectedBranch) {
              row._valuesCache.branch = selectedBranch;
            }
          },
          error: !!validationErrors?.branch,
          helperText: validationErrors?.branch,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              branch: undefined,
            }),
        }),
      },
    ],
    [branchList, validationErrors]
  );

  const handleCreateCompany = async (props: { exitCreatingMode: () => void; row: MRT_Row<Company>; table: MRT_TableInstance<Company>; values: Record<string, any>; }) => {
    try {
      const newCompany = props.values as Company;
      addCompany({ data: newCompany }, {
        onSuccess: async () => {
          const updatedList = await fetchCompanies();
          setCompanyList(updatedList ?? []);
          props.exitCreatingMode();
        },
        onError: (error) => {
          setIsLoadingCompaniesError(true);
          console.error('Error creating company:', error);
          window.alert('Error creating company');
        },
      });
    } catch (error) {
      setIsLoadingCompaniesError(true);
    }
  };

  const handleSaveCompany = async (props: { exitEditingMode: () => void; row: MRT_Row<Company>; table: MRT_TableInstance<Company>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedCompany = props.values as Company;
      const companyId = props.row.original.id;
      if (companyId !== undefined && companyId !== null) {
        editCompany({ id: companyId, data: updatedCompany }, {
          onSuccess: async () => {
            const updatedList = await fetchCompanies();
            setCompanyList(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingCompaniesError(true);
            if (error instanceof Error) {
              console.error('Error updating company:', error.message);
              window.alert('Error updating company');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingCompaniesError(true);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: companyList,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingCompaniesError
      ? {
        color: 'error',
        children: 'Error loading data',
      }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
        overflowX: 'auto',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateCompany,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveCompany,
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
        Create New Company
      </Button>
    ),
  });

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <PageTitle title="Companies" />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ flex: 1, overflowX: 'auto' }}>
          <MaterialReactTable table={table} />
        </Box>
      </Stack>
    </Stack>
  )
};