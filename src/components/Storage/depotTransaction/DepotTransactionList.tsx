import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { DepotTransaction } from '@/api/model';
import { depotTransactions } from '@/api/openAPIDefinition';
import type { FilteringRequest } from '@/api/model';
import DepotTransactionForm from './DepotTransactionForm';

const DepotTransactionList = () => {
  const [depotTransactionList, setDepotTransactionList] = useState<DepotTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchDepotTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await depotTransactions({
        filter: "",
        sort: "id,desc",
        page: 0,
        pageSize: 50,
      });
      setDepotTransactionList(response.data ?? []);
    } catch (err) {
      setError("Depo hareketleri yüklenirken bir hata oluştu");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepotTransactions();
  }, []);

  const columns = useMemo<MRT_ColumnDef<DepotTransaction>[]>(
  
    () => [
      
      {
        accessorKey: 'transactionDate',
        header: 'TransactionDate',
      },
      {
        accessorKey: 'documentNo',
        header: 'Document No',
      },
      {
        accessorKey: 'productPlan.code',
        header: 'Product Plan Code',
      },
      {
        accessorKey: 'productPlan.description',
        header: 'Product Plan Description',
      },
      {
        accessorKey: 'employee.name',
        header: 'Employee',
      },
    ],
    [],

  );

  const table = useMaterialReactTable({
    columns,
    data: depotTransactionList,
    enableExpandAll: false, //disable expand all button
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,210,244,0.1)'
            : 'rgba(0,0,0,0.1)',
      }),
    }),
    
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    
    renderDetailPanel: ({ row }) =>
      row.original.rowItems ? (
        <Box sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>İşlem Tarihi</TableCell>
                  <TableCell>Malzeme Kodu</TableCell>
                  <TableCell>Malzeme Adı</TableCell>
                  <TableCell>Birim</TableCell>
                  <TableCell>Miktar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.original.rowItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.transactionDate}</TableCell>
                    <TableCell>{item.material?.materialCode}</TableCell>
                    <TableCell>{item.material?.materialName}</TableCell>
                    <TableCell>{item.material?.defaultUnit}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null,
    renderTopToolbarCustomActions: () => (
      <Button
        color="primary"
        onClick={() => setIsFormOpen(true)}
        variant="contained"
      >
        Yeni Depo Hareketi
      </Button>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <DepotTransactionForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={fetchDepotTransactions}
      />
    </>
  );
};

export default DepotTransactionList;
