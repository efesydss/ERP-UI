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
import { ProposalRequest, MaterialCard, EmployeeExtendedRef, CurrentAccount, OfferStatusEnum, MaterialRequestRowItemUnit, CurrencyEnum, Project, MaterialRequestExtras } from '@/api/model';
import { addProposalRequest } from '@/api/openAPIDefinition';
import { employees, currentAccounts, materialCards, projects } from '@/api/filtering';

interface ProposalRequestFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface NewRowItem {
  material: MaterialCard | null;
  quantity: string;
  unit: string;
}

const ProposalRequestForm = ({ open, onClose, onSuccess }: ProposalRequestFormProps) => {
  const [formData, setFormData] = useState<Partial<ProposalRequest>>({
    documentName: '',
    requestDate: new Date().toISOString().split('T')[0],
    offerStatus: OfferStatusEnum.CANCELED_QUOTES,
    materialRequestExtras: [],
    currentAccounts: [],
    total: 0,
    totalDiscount: 0,
    unitDiscount: 0,
    additionalCost: 0,
    tax: 0,
  });

  const [newRowItem, setNewRowItem] = useState<NewRowItem>({
    material: null,
    quantity: '',
    unit: '',
  });

  const [employeeList, setEmployeeList] = useState<EmployeeExtendedRef[]>([]);
  const [currentAccountList, setCurrentAccountList] = useState<CurrentAccount[]>([]);
  const [materialList, setMaterialList] = useState<MaterialCard[]>([]);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isLoadingCurrentAccounts, setIsLoadingCurrentAccounts] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingEmployees(true);
        const employeeResponse = await employees({ filter: '', sort: 'id,desc', page: 0, pageSize: 50 });
        setEmployeeList(employeeResponse.data?.map(emp => ({
          id: emp.id,
          name: emp.name || '',
          email: emp.email || ''
        })) || []);

        setIsLoadingCurrentAccounts(true);
        const currentAccountResponse = await currentAccounts({ filter: '', sort: 'id,desc', page: 0, pageSize: 50 });
        setCurrentAccountList(currentAccountResponse.data || []);

        setIsLoadingMaterials(true);
        const materialResponse = await materialCards({ filter: '', sort: 'id,desc', page: 0, pageSize: 50 });
        setMaterialList(materialResponse.data || []);

        setIsLoadingProjects(true);
        const projectResponse = await projects({ filter: '', sort: 'id,desc', page: 0, pageSize: 50 });
        setProjectList(projectResponse.data || []);
      } catch (error) {
        console.error('Veri yüklenirken hata oluştu:', error);
      } finally {
        setIsLoadingEmployees(false);
        setIsLoadingCurrentAccounts(false);
        setIsLoadingMaterials(false);
        setIsLoadingProjects(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRowItem = () => {
    if (newRowItem.material && newRowItem.quantity) {
      const newRow: MaterialRequestExtras = {
        materialRequestRowItem: {
          materialCard: newRowItem.material,
          quantity: parseFloat(newRowItem.quantity),
          unit: newRowItem.material.defaultUnit as MaterialRequestRowItemUnit,
        },
        price: null,
        taxRate: null,
        tax: null,
        rowTotal: null,
        currency: CurrencyEnum.TRY,
        assemblyCost: null,
        requestDateRow: formData.requestDate || new Date().toISOString().split('T')[0],
      };
      
      setFormData(prev => ({
        ...prev,
        materialRequestExtras: [...(prev.materialRequestExtras || []), newRow]
      }));
      setNewRowItem({ material: null, quantity: '', unit: '' });
    }
  };

  const handleRemoveRowItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materialRequestExtras: prev.materialRequestExtras?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload: ProposalRequest = {
        ...formData,
        id: null,
        offerStatus: formData.offerStatus || OfferStatusEnum.CANCELED_QUOTES,
        requestDate: formData.requestDate || new Date().toISOString().split('T')[0],
        documentName: formData.documentName || '',
        employee: formData.employee || { id: 0, name: '', email: '' },
        project: formData.project || { id: 0, code: '', name: '', currentAccount: { id: 0, title: '' }, employee: { id: 0, name: '', email: '' } },
        currentAccounts: formData.currentAccounts || [],
        materialRequestExtras: formData.materialRequestExtras || [],
        total: formData.total || 0,
        totalDiscount: formData.totalDiscount || 0,
        unitDiscount: formData.unitDiscount || 0,
        additionalCost: formData.additionalCost || 0,
        tax: formData.tax || 0,
      };

      await addProposalRequest(payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Teklif Talebi</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Belge Adı"
                value={formData.documentName}
                onChange={(e) => setFormData({ ...formData, documentName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Talep Tarihi"
                type="date"
                value={formData.requestDate}
                onChange={(e) => setFormData({ ...formData, requestDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Açıklama"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                select
                label="Teklif Durumu"
                value={formData.offerStatus}
                onChange={(e) => setFormData({ ...formData, offerStatus: e.target.value as OfferStatusEnum })}
              >
                {Object.values(OfferStatusEnum).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <Autocomplete
                fullWidth
                options={projectList}
                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                value={formData.project || null}
                onChange={(_, newValue) => setFormData({ ...formData, project: newValue || undefined })}
                loading={isLoadingProjects}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proje"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingProjects ? 'Yükleniyor...' : null}
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
                options={employeeList}
                getOptionLabel={(option) => option.name || ''}
                value={formData.employee || null}
                onChange={(_, newValue) => setFormData({ ...formData, employee: newValue || undefined })}
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
              <Autocomplete
                fullWidth
                options={currentAccountList}
                getOptionLabel={(option) => option.title || ''}
                value={formData.selectedCurrentAccount || null}
                onChange={(_, newValue) => setFormData({ ...formData, selectedCurrentAccount: newValue || undefined })}
                loading={isLoadingCurrentAccounts}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seçili Cari Hesap"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoadingCurrentAccounts ? 'Yükleniyor...' : null}
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
            <Typography variant="h6" gutterBottom>Malzeme Detayları</Typography>
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
              <IconButton color="primary" onClick={handleAddRowItem}>
                <AddIcon />
              </IconButton>
            </Stack>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Malzeme Kodu</TableCell>
                    <TableCell>Malzeme Adı</TableCell>
                    <TableCell>Miktar</TableCell>
                    <TableCell>Birim</TableCell>
                    <TableCell>İşlem</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formData.materialRequestExtras?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.materialRequestRowItem?.materialCard?.materialCode}</TableCell>
                      <TableCell>{item.materialRequestRowItem?.materialCard?.materialName}</TableCell>
                      <TableCell>{item.materialRequestRowItem?.quantity}</TableCell>
                      <TableCell>{item.materialRequestRowItem?.unit}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleRemoveRowItem(index)}>
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

export default ProposalRequestForm; 