import { useState } from 'react';
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
import { ProposalRequest, MaterialCard, EmployeeExtendedRef, CurrentAccount, OfferStatusEnum, MaterialRequestRowItemUnit, CurrencyEnum } from '@/api/model';
import { addProposalRequest } from '@/api/openAPIDefinition';
import { employees, currentAccounts, materialCards } from '@/api/filtering';

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
  });

  const [newRowItem, setNewRowItem] = useState<NewRowItem>({
    material: null,
    quantity: '',
    unit: '',
  });

  const [employeeList, setEmployeeList] = useState<EmployeeExtendedRef[]>([]);
  const [currentAccountList, setCurrentAccountList] = useState<CurrentAccount[]>([]);
  const [materialList, setMaterialList] = useState<MaterialCard[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(false);
  const [isLoadingCurrentAccounts, setIsLoadingCurrentAccounts] = useState(false);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);

  const handleAddRowItem = () => {
    if (newRowItem.material && newRowItem.quantity && newRowItem.unit) {
      setFormData({
        ...formData,
        materialRequestExtras: [
          ...(formData.materialRequestExtras || []),
          {
            materialRequestRowItem: {
              materialCard: newRowItem.material,
              quantity: parseFloat(newRowItem.quantity),
              unit: newRowItem.unit as MaterialRequestRowItemUnit,
            },
            price: null,
            taxRate: null,
            tax: null,
            rowTotal: null,
            currency: CurrencyEnum.TRY,
            assemblyCost: null,
            requestDateRow: null,
          },
        ],
      });
      setNewRowItem({ material: null, quantity: '', unit: '' });
    }
  };

  const handleRemoveRowItem = (index: number) => {
    const newMaterialRequestExtras = [...(formData.materialRequestExtras || [])];
    newMaterialRequestExtras.splice(index, 1);
    setFormData({ ...formData, materialRequestExtras: newMaterialRequestExtras });
  };

  const handleSubmit = async () => {
    try {
      await addProposalRequest(formData as ProposalRequest);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Teklif Talebi Ekle</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
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
                label="Çalışan"
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Malzeme Detayları
            </Typography>
            <TableContainer component={Paper}>
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
                        <IconButton onClick={() => handleRemoveRowItem(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2 }}>
              <Stack direction="row" spacing={2}>
                <Autocomplete
                  fullWidth
                  options={materialList}
                  getOptionLabel={(option) => option.materialName || ''}
                  value={newRowItem.material}
                  onChange={(_, newValue) => setNewRowItem({ ...newRowItem, material: newValue || null })}
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
                  fullWidth
                  label="Miktar"
                  value={newRowItem.quantity}
                  onChange={(e) => setNewRowItem({ ...newRowItem, quantity: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Birim"
                  value={newRowItem.unit}
                  onChange={(e) => setNewRowItem({ ...newRowItem, unit: e.target.value })}
                />
                <IconButton onClick={handleAddRowItem}>
                  <AddIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProposalRequestForm; 