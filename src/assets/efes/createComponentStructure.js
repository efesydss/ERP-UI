const fs = require('fs');
const path = require('path');
const readline = require('readline');

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('Hedef klasör belirtilmedi. Lütfen betiği doğru şekilde çalıştırın.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Lütfen ENTITY adını girin: ', (entityName) => {
  if (!entityName) {
    console.error('ENTITY adı boş bırakılamaz.');
    rl.close();
    process.exit(1);
  }

  const entityDir = path.join(targetDir, entityName);

  try {
    if (!fs.existsSync(entityDir)) {
      fs.mkdirSync(entityDir);
    }
    
    // Template kodlar
    const listTemplate = `export const ChangeMeList = () => {
  const { mutate: addChangeMe } = useAddChangeMe();
  const { mutate: editChangeMe } = useUpdateChangeMe();



  const fetchChangeMes = async () => {
    const changeMesData = await changeMes({
      filter: "",
      sort: "id,asc",
      page: 0,
      pageSize: 50,
      namedFilters: ["show_passives"]
    });
    return changeMesData.data;
  };
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const [changeMeList, setChangeMeList] = useState<ChangeMe[]>([]);
  const [isLoadingChangeMesError, setIsLoadingChangeMesError] = useState(false);

  useEffect(() => {
    const loadChangeMes = async () => {
      const list = await fetchChangeMes();
      setChangeMeList(list ?? []);
    };
    loadChangeMes();
  }, []);

  const openDeleteConfirmModal = (row: MRT_Row<ChangeMe>) => {
    if (window.confirm('Are you sure you want to delete this changeMe?') && row.original.id !== undefined && row.original.id !== null) {
      deleteChangeMe(row.original.id).then(async () => {
        const updatedList = await fetchChangeMes();
        setChangeMeList(updatedList ?? []);
      }).catch((error) => {
        setIsLoadingChangeMesError(true);
        console.error('Error deleting changeMe:', error);
        window.alert('Error deleting changeMe');
      });
    }
  };
  const columns = useMemo<MRT_ColumnDef<ChangeMe>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'ChangeMe Name',
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

  const handleCreateChangeMe = async (props: { exitCreatingMode: () => void; row: MRT_Row<ChangeMe>; table: MRT_TableInstance<ChangeMe>; values: Record<string, any>; }) => {
    try {
      const newChangeMe = props.values as ChangeMe;
      addChangeMe({ data: newChangeMe }, {
        onSuccess: async () => {
          const updatedList = await fetchChangeMes();
          setChangeMeList(updatedList ?? []);
          props.exitCreatingMode();

        },
        onError: (error) => {
          setIsLoadingChangeMesError(true);
          console.error('Error creating changeMe:', error);
          window.alert('Error creating changeMe');
        },
      });
    } catch (error) {
      setIsLoadingChangeMesError(true);
    }
  };

  const handleSaveChangeMe = async (props: { exitEditingMode: () => void; row: MRT_Row<ChangeMe>; table: MRT_TableInstance<ChangeMe>; values: Record<string, any>; }): Promise<void> => {
    try {
      const updatedChangeMe = props.values as ChangeMe;
      const changeMeId = props.row.original.id;
      if (changeMeId !== undefined && changeMeId !== null) {
        editChangeMe({ id: changeMeId, data: updatedChangeMe }, {
          onSuccess: async () => {
            const updatedList = await fetchChangeMes();
            setChangeMeList(updatedList ?? []);
            props.exitEditingMode();
          },
          onError: (error: unknown) => {
            setIsLoadingChangeMesError(true);
            if (error instanceof Error) {
              console.error('Error updating changeMe:', error.message);
              window.alert('Error updating changeMe');
            }
          },
        });
      }
    } catch (error) {
      setIsLoadingChangeMesError(true);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: changeMeList,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id?.toString() ?? '',
    muiToolbarAlertBannerProps: isLoadingChangeMesError
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
    onCreatingRowSave: handleCreateChangeMe,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveChangeMe,
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
        Create New ChangeMe
      </Button>
    ),
  });

  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <PageTitle title="ChangeMes" />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <MaterialReactTable table={table} />
        </div>
      </Stack>
    </Stack>
  )
};`;

    // Dosyaları oluştur
    fs.writeFileSync(path.join(entityDir, `${entityName}List.tsx`), listTemplate.replace(/ChangeMe/g, entityName));
    console.log(`Yapı başarıyla oluşturuldu: ${entityDir}`);
  } catch (err) {
    console.error('Bir hata oluştu:', err);
  } finally {
    rl.close();
  }
});