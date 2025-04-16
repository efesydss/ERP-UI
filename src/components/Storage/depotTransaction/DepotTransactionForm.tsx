import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  MenuItem,
  Autocomplete,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DepotTransaction, DepotTransactionDocumentType, DepotRowItem, MaterialCard, PlanStatusEnum, ProductPlan, EmployeeExtendedRef, Depot } from '@/api/model';
import { productPlans, addDepotTransaction } from '@/api/openAPIDefinition';
import { employees, depots, materialCards } from '@/api/filtering';

interface DepotTransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface NewRowItem {
  material: MaterialCard | null;
  quantity: string;
  unit: string;
}

const DepotTransactionForm = ({ open, onClose, onSuccess }: DepotTransactionFormProps) => {
  const [formData, setFormData] = useState<Partial<DepotTransaction>>({
    transactionDate: new Date().toISOString().split('T')[0],
    documentNo: '',
    documentType: DepotTransactionDocumentType.PROJECT_IN,
    rowItems: [],
  });

  const [newRowItem, setNewRowItem] = useState<NewRowItem>({
    material: null,
    quantity: '',
    unit: '',
  });

  const [productPlanList, setProductPlanList] = useState<ProductPlan[]>([]);
  const [employeeList, setEmployeeList] = useState<EmployeeExtendedRef[]>([]);
  const [depotList, setDepotList] = useState<Depot[]>([]);
  const [materialList, setMaterialList] = useState<MaterialCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isLoadingDepots, setIsLoadingDepots] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLoadingEmployees(true);
      setIsLoadingDepots(true);
      setIsLoadingMaterials(true);
      try {
        const [plansResponse, employeesResponse, depotsResponse, materialsResponse] = await Promise.all([
          productPlans({
            filter: "",
            sort: "id,desc",
            page: 0,
            pageSize: 50,
          }),
          employees({
            filter: "",
            sort: "id,desc",
            page: 0,
            pageSize: 50,
          }),
          depots({
            filter: "",
            sort: "id,desc",
            page: 0,
            pageSize: 50,
          }),
          materialCards({
            filter: "",
            sort: "id,desc",
            page: 0,
            pageSize: 50,
          })
        ]);
        setProductPlanList(plansResponse.data ?? []);
        setEmployeeList((employeesResponse.data ?? []).map(emp => ({
          id: emp.id,
          name: emp.name || '',
          surname: emp.surname || '',
          companyBranch: emp.companyBranch,
          department: emp.department,
          email: emp.email || ''
        })));
        setDepotList(depotsResponse.data ?? []);
        setMaterialList(materialsResponse.data ?? []);
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingEmployees(false);
        setIsLoadingDepots(false);
        setIsLoadingMaterials(false);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      // Form verilerini hazırla
      const payload: DepotTransaction = {
        transactionDate: formData.transactionDate || new Date().toISOString().split('T')[0],
        documentNo: formData.documentNo || '',
        documentType: formData.documentType || DepotTransactionDocumentType.PROJECT_IN,
        depot: formData.depot || { id: 0, name: '' },
        productPlan: formData.productPlan || { id: 0, code: '', description: '', planStatus: PlanStatusEnum.PLANNED, employee: { name: '', email: '' }, endTime: new Date().toISOString() },
        employee: formData.employee || { id: 0, name: '', email: '' },
        rowItems: formData.rowItems?.map(item => ({
          material: item.material,
          quantity: item.quantity,
          transactionDate: item.transactionDate
        })) || []
      };

      // API'ye POST isteği gönder
      await addDepotTransaction(payload);

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
    }
  };

  const handleAddRow = () => {
    if (newRowItem.material && newRowItem.quantity) {
      const newRow: DepotRowItem = {
        material: newRowItem.material,
        quantity: parseFloat(newRowItem.quantity),
        transactionDate: new Date().toISOString(),
      };
      
      setFormData(prev => ({
        ...prev,
        rowItems: [...(prev.rowItems || []), newRow]
      }));
      setNewRowItem({ material: null, quantity: '', unit: '' });
    }
  };

  const handleDeleteRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rowItems: prev.rowItems?.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Depo Hareketi</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="İşlem Tarihi"
                type="date"
                value={formData.transactionDate}
                onChange={(e) => setFormData({ ...formData, transactionDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Belge No"
                value={formData.documentNo}
                onChange={(e) => setFormData({ ...formData, documentNo: e.target.value })}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                select
                label="Hareket Türü"
                value={formData.documentType}
                onChange={(e) => setFormData({ ...formData, documentType: e.target.value as DepotTransactionDocumentType })}
              >
                <MenuItem value={DepotTransactionDocumentType.PROJECT_IN}>Proje Giriş</MenuItem>
                <MenuItem value={DepotTransactionDocumentType.PROJECT_OUT}>Proje Çıkış</MenuItem>
                <MenuItem value={DepotTransactionDocumentType.TRANSFER_INITIALIZATION}>Transfer Başlangıç</MenuItem>
                <MenuItem value={DepotTransactionDocumentType.TO_PERSONNEL}>Personele Veriş</MenuItem>
                <MenuItem value={DepotTransactionDocumentType.FROM_PERSONNEL}>Personelden Alış</MenuItem>
                <MenuItem value={DepotTransactionDocumentType.INTER_DEPOT}>Depolar Arası Transfer</MenuItem>
              </TextField>
              <Autocomplete
                fullWidth
                options={depotList}
                getOptionLabel={(option) => option.name || ''}
                value={formData.depot || null}
                onChange={(_, newValue) => setFormData({ ...formData, depot: newValue || undefined })}
                loading={isLoadingDepots}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Depo"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingDepots ? 'Yükleniyor...' : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                fullWidth
                options={productPlanList}
                getOptionLabel={(option) => `${option.code} - ${option.description}`}
                value={formData.productPlan || null}
                onChange={(_, newValue) => setFormData({ 
                  ...formData, 
                  productPlan: newValue ? {
                    ...newValue,
                    planStatus: PlanStatusEnum.PLANNED,
                    employee: { name: '', email: '' },
                    endTime: new Date().toISOString()
                  } : undefined
                })}
                loading={isLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Üretim Planı"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? 'Yükleniyor...' : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <Autocomplete
                fullWidth
                options={employeeList}
                getOptionLabel={(option) => option.name || ''}
                value={formData.employee || null}
                onChange={(_, newValue) => setFormData({ 
                  ...formData, 
                  employee: newValue || undefined
                })}
                loading={isLoadingEmployees}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sorumlu"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingEmployees ? 'Yükleniyor...' : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Hareket Kalemleri</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Autocomplete
                sx={{ width: '40%' }}
                options={materialList}
                getOptionLabel={(option) => `${option.materialCode} - ${option.materialName}`}
                value={newRowItem.material}
                onChange={(_, newValue) => setNewRowItem({ ...newRowItem, material: newValue })}
                loading={isLoadingMaterials}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Malzeme"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingMaterials ? 'Yükleniyor...' : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <TextField
                sx={{ width: '30%' }}
                label="Miktar"
                type="number"
                value={newRowItem.quantity}
                onChange={(e) => setNewRowItem({ ...newRowItem, quantity: e.target.value })}
              />
              <TextField
                sx={{ width: '20%' }}
                label="Birim"
                value={newRowItem.material?.defaultUnit || ''}
                disabled
              />
              <IconButton color="primary" onClick={handleAddRow}>
                <AddIcon />
              </IconButton>
            </Stack>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Malzeme</TableCell>
                    <TableCell>Miktar</TableCell>
                    <TableCell>Birim</TableCell>
                    <TableCell>İşlem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.rowItems?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.material?.materialName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.material?.defaultUnit}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleDeleteRow(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepotTransactionForm; 