import { ProposalRequest } from "@/api/model";
import { MRT_ColumnDef } from "material-react-table";
import { useTranslation } from "react-i18next";
import { proposalRequests, calculateProposalRequestSummary, updateProposalRequest } from "@/api/openAPIDefinition";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider, TextField, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProposalRequestForm from '@/components/Purchasing/ProposalRequest/ProposalRequestForm';
import { useEffect, useMemo, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import UpdateIcon from '@mui/icons-material/Update';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { currentAccounts } from "@/api/filtering";
import { PaymentTermEnum, CurrencyEnum, CurrentAccount, CurrentAccountExtras } from "@/api/model";
import { Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { OfferStatusEnum } from '@/api/model/offerStatusEnum';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const ProposaRequestList = () => {
    const { t } = useTranslation();
    const [proposalRequestList, setProposalRequestList] = useState<ProposalRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [summaryData, setSummaryData] = useState<{
        total: number;
        totalDiscount: number;
        unitDiscount: number;
        additionalCost: number;
        tax: number;
    } | null>(null);
    const [selectedProposalRequest, setSelectedProposalRequest] = useState<ProposalRequest | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isProposalEntryModalOpen, setIsProposalEntryModalOpen] = useState(false);
    const [editedProposalRequest, setEditedProposalRequest] = useState<ProposalRequest | null>(null);
    const [currentAccountList, setCurrentAccountList] = useState<CurrentAccount[]>([]);
    const [selectedCurrentAccount, setSelectedCurrentAccount] = useState<CurrentAccount | null>(null);
    const [currentAccountExtras, setCurrentAccountExtras] = useState<{
        paymentTerm: PaymentTermEnum;
        totalDiscount: number;
        currency: CurrencyEnum;
        description: string;
    }>({
        paymentTerm: PaymentTermEnum.CASH,
        totalDiscount: 0,
        currency: CurrencyEnum.TRY,
        description: ''
    });
    const [isProposalSelectionModalOpen, setIsProposalSelectionModalOpen] = useState(false);
    const [selectedProposalForSelection, setSelectedProposalForSelection] = useState<ProposalRequest | null>(null);
    const [selectedCurrentAccountExtra, setSelectedCurrentAccountExtra] = useState<CurrentAccountExtras | null>(null);
    const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFormOpen = () => {
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleFormSuccess = () => {
        fetchProposalRequests();
        handleFormClose();
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: ProposalRequest) => {
        setAnchorEl(event.currentTarget);
        setSelectedProposalRequest(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        setIsDetailModalOpen(true);
        handleMenuClose();
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedProposalRequest(null);
    };

    const handleEdit = () => {
        // Düzenleme işlemi
        handleMenuClose();
    };

    const handleDelete = () => {
        // Silme işlemi
        handleMenuClose();
    };

    const handleProposalEntry = () => {
        if (selectedProposalRequest) {
            setEditedProposalRequest(selectedProposalRequest);
            setIsProposalEntryModalOpen(true);
        }
        handleMenuClose();
    };

    const handleCloseProposalEntryModal = () => {
        setIsProposalEntryModalOpen(false);
        setEditedProposalRequest(null);
    };

    const handleAddCurrentAccount = () => {
        if (selectedCurrentAccount && editedProposalRequest) {
            const newAccounts = [...(editedProposalRequest.currentAccounts || [])];
            newAccounts.push({
                currentAccount: selectedCurrentAccount,
                paymentTerm: currentAccountExtras.paymentTerm,
                totalDiscount: currentAccountExtras.totalDiscount,
                currency: currentAccountExtras.currency,
                description: currentAccountExtras.description
            });
            setEditedProposalRequest({
                ...editedProposalRequest,
                currentAccounts: newAccounts
            });
            setSelectedCurrentAccount(null);
            setCurrentAccountExtras({
                paymentTerm: PaymentTermEnum.CASH,
                totalDiscount: 0,
                currency: CurrencyEnum.TRY,
                description: ''
            });
        }
    };

    const handleSaveProposalEntry = async () => {
        if (editedProposalRequest) {
            try {
                await updateProposalRequest(editedProposalRequest.id || 0, editedProposalRequest);
                handleCloseProposalEntryModal();
                fetchProposalRequests();
            } catch (error) {
                console.error('Teklif güncellenirken hata oluştu:', error);
            }
        }
    };

    const handleProposalSelection = () => {
        if (selectedProposalRequest) {
            setSelectedProposalForSelection(selectedProposalRequest);
            setIsProposalSelectionModalOpen(true);
        }
        handleMenuClose();
    };

    const handleCloseProposalSelectionModal = () => {
        setIsProposalSelectionModalOpen(false);
        setSelectedProposalForSelection(null);
        setSelectedCurrentAccountExtra(null);
    };

    const handleSaveProposalSelection = async () => {
        if (selectedProposalForSelection && selectedCurrentAccountExtra) {
            try {
                const updatedProposal = {
                    ...selectedProposalForSelection,
                    suggestedCurrentAccount: selectedCurrentAccountExtra.currentAccount
                };
                await updateProposalRequest(updatedProposal.id || 0, updatedProposal);
                handleCloseProposalSelectionModal();
                fetchProposalRequests();
            } catch (error) {
                console.error('Teklif seçimi güncellenirken hata oluştu:', error);
            }
        }
    };

    const fetchSummaryData = async (proposalRequest: ProposalRequest) => {
        try {
            const response = await calculateProposalRequestSummary(proposalRequest);
            setSummaryData(response);
        } catch (error) {
            console.error('Özet verileri alınırken hata oluştu:', error);
        }
    };

    const fetchProposalRequests = async () => {
        setIsLoading(true);
        try {
            const response = await proposalRequests({
                filter: "",
                sort: "id,desc",
                page: 0,
                pageSize: 50,
            });
            setProposalRequestList(response.data ?? []);
            if (response.data && response.data.length > 0) {
                await fetchSummaryData(response.data[0]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCurrentAccounts = async () => {
        try {
            const response = await currentAccounts({ filter: '', sort: 'id,desc', page: 0, pageSize: 50 });
            setCurrentAccountList(response.data || []);
        } catch (error) {
            console.error('Cari hesaplar yüklenirken hata oluştu:', error);
        }
    };

    useEffect(() => {
        fetchProposalRequests();
        fetchCurrentAccounts();
    }, []);

    const columns = useMemo<MRT_ColumnDef<ProposalRequest>[]>(
        () => [
            {
                accessorKey: 'documentName',
                header: t('common:DocumentName'),
            },
            {
                accessorKey: 'requestDate',
                header: t('common:RequestDate'),
            },
            {
                accessorKey: 'offerStatus',
                header: t('common:Status'),
            },
            {
                accessorKey: 'project.name',
                header: t('common:Project'),
            },
            {
                id: 'actions',
                header: t('common:Actions'),
                enableColumnFilter: false,
                enableSorting: false,
                size: 100,
                Cell: ({ row }) => (
                    <IconButton
                        onClick={(event) => handleMenuClick(event, row.original)}
                        size="small"
                    >
                        <MoreVertIcon />
                    </IconButton>
                ),
            },
        ],
        [t]
    );

    const table = useMaterialReactTable({
        columns,
        data: proposalRequestList,
        state: {
            isLoading,
        },
        enableExpandAll: false,
        muiDetailPanelProps: () => ({
            sx: (theme) => ({
                backgroundColor:
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,210,244,0.1)'
                        : 'rgba(0,0,0,0.1)',
            }),
        }),
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s',
            },
        }),
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => setSelectedProposalRequest(row.original),
            sx: { cursor: 'pointer' }
        }),
        renderDetailPanel: ({ row }) => (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Malzeme Detayları" />
                        <Tab label="Tedarikçi Bilgileri" />
                        <Tab label="Detaylar" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Malzeme Kodu</TableCell>
                                    <TableCell>Malzeme Adı</TableCell>
                                    <TableCell>Miktar</TableCell>
                                    <TableCell>Birim</TableCell>
                                    <TableCell>Birim Fiyat</TableCell>
                                    <TableCell>Vergi Oranı (%)</TableCell>
                                    <TableCell>Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.original.materialRequestExtras?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.materialRequestRowItem?.materialCard?.materialCode}</TableCell>
                                        <TableCell>{item.materialRequestRowItem?.materialCard?.materialName}</TableCell>
                                        <TableCell>{item.materialRequestRowItem?.quantity}</TableCell>
                                        <TableCell>{item.materialRequestRowItem?.unit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tedarikçi</TableCell>
                                    <TableCell>Vergi No</TableCell>
                                    <TableCell>Telefon</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Adres</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.original.currentAccounts?.map((account, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{account.currentAccount?.title}</TableCell>
                                        <TableCell>{account.currentAccount?.contactInformation?.taxNo}</TableCell>
                                        <TableCell>{account.currentAccount?.contactInformation.number}</TableCell>
                                        <TableCell>{account.paymentTerm}</TableCell>
                                        <TableCell>{account.description}</TableCell>
                                        <TableCell>{account.currency}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell><strong>Toplam Tutar:</strong></TableCell>
                                    <TableCell>{summaryData?.total || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Toplam İndirim:</strong></TableCell>
                                    <TableCell>{summaryData?.totalDiscount || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Birim İndirim:</strong></TableCell>
                                    <TableCell>{summaryData?.unitDiscount || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Ek Maliyet:</strong></TableCell>
                                    <TableCell>{summaryData?.additionalCost || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Vergi:</strong></TableCell>
                                    <TableCell>{summaryData?.tax || 0}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Sorumlu:</strong></TableCell>
                                    <TableCell>{row.original.employee?.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Seçili Cari Hesap:</strong></TableCell>
                                    <TableCell>{row.original.suggestedCurrentAccount?.title}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Box>
        ),
    });

    const handleSendForApproval = async () => {
        if (selectedProposalRequest) {
            try {
                const updatedProposal = {
                    ...selectedProposalRequest,
                    offerStatus: OfferStatusEnum.PENDING_ORDERS,
                };
                await updateProposalRequest(updatedProposal.id || 0, updatedProposal);
                fetchProposalRequests();
                setIsApprovalDialogOpen(false);
            } catch (error) {
                console.error('Onaya gönderilirken hata oluştu:', error);
            }
        }
    };

    const handleOpenApprovalDialog = () => {
        setIsApprovalDialogOpen(true);
        handleMenuClose();
    };

    const handleCloseApprovalDialog = () => {
        setIsApprovalDialogOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleFormOpen} sx={{ mb: 2 }}>
                Yeni Teklif Talebi Ekle
            </Button>
            <MaterialReactTable table={table} />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleProposalEntry}>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                    Teklif Girişi
                </MenuItem>
                <MenuItem onClick={handleProposalSelection}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Teklif Seçimi
                </MenuItem>
                <MenuItem onClick={handleOpenApprovalDialog}>
                    <SendIcon fontSize="small" sx={{ mr: 1 }} />
                    Onaya Gönder
                </MenuItem>
                <MenuItem onClick={handleViewDetails}>
                    <InfoIcon fontSize="small" sx={{ mr: 1 }} />
                    Detayları Görüntüle
                </MenuItem>
            </Menu>
            <ProposalRequestForm open={isFormOpen} onClose={handleFormClose} onSuccess={handleFormSuccess} />

            <Dialog
                open={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Teklif Talebi Detayları</DialogTitle>
                <DialogContent>
                    {selectedProposalRequest && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Genel Bilgiler</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Belge Adı:</strong></TableCell>
                                            <TableCell>{selectedProposalRequest.documentName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Talep Tarihi:</strong></TableCell>
                                            <TableCell>{selectedProposalRequest.requestDate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Durum:</strong></TableCell>
                                            <TableCell>{selectedProposalRequest.offerStatus}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Proje:</strong></TableCell>
                                            <TableCell>{selectedProposalRequest.project?.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Sorumlu:</strong></TableCell>
                                            <TableCell>{selectedProposalRequest.employee?.name}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Maliyet Bilgileri</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><strong>Toplam Tutar:</strong></TableCell>
                                            <TableCell>{summaryData?.total || 0}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Toplam İndirim:</strong></TableCell>
                                            <TableCell>{summaryData?.totalDiscount || 0}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Birim İndirim:</strong></TableCell>
                                            <TableCell>{summaryData?.unitDiscount || 0}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Ek Maliyet:</strong></TableCell>
                                            <TableCell>{summaryData?.additionalCost || 0}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><strong>Vergi:</strong></TableCell>
                                            <TableCell>{summaryData?.tax || 0}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Cari Hesaplar</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tedarikçi</TableCell>
                                            <TableCell>Vergi No</TableCell>
                                            <TableCell>Ödeme Vadesi</TableCell>
                                            <TableCell>Toplam İndirim</TableCell>
                                            <TableCell>Para Birimi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedProposalRequest.currentAccounts?.map((account, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{account.currentAccount?.title}</TableCell>
                                                <TableCell>{account.currentAccount?.contactInformation?.taxNo}</TableCell>
                                                <TableCell>{account.paymentTerm}</TableCell>
                                                <TableCell>{account.totalDiscount}</TableCell>
                                                <TableCell>{account.currency}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>Malzeme Detayları</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Malzeme Kodu</TableCell>
                                            <TableCell>Malzeme Adı</TableCell>
                                            <TableCell>Miktar</TableCell>
                                            <TableCell>Birim</TableCell>
                                            <TableCell>Birim Fiyat</TableCell>
                                            <TableCell>Vergi Oranı (%)</TableCell>
                                            <TableCell>Toplam</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedProposalRequest.materialRequestExtras?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.materialRequestRowItem?.materialCard?.materialCode}</TableCell>
                                                <TableCell>{item.materialRequestRowItem?.materialCard?.materialName}</TableCell>
                                                <TableCell>{item.materialRequestRowItem?.quantity}</TableCell>
                                                <TableCell>{item.materialRequestRowItem?.unit}</TableCell>
                                                <TableCell>{item.price}</TableCell>
                                                <TableCell>{item.taxRate}</TableCell>
                                                <TableCell>{item.rowTotal}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailModal}>Kapat</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isProposalEntryModalOpen}
                onClose={handleCloseProposalEntryModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Teklif Girişi</DialogTitle>
                <DialogContent>
                    {editedProposalRequest && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Cari Hesaplar</Typography>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                <Autocomplete
                                    sx={{ width: '40%' }}
                                    options={currentAccountList}
                                    getOptionLabel={(option) => `${option.title}`}
                                    value={selectedCurrentAccount}
                                    onChange={(_, newValue) => setSelectedCurrentAccount(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Cari Hesap Seç"
                                            variant="outlined"
                                        />
                                    )}
                                />
                                <TextField
                                    sx={{ width: '15%' }}
                                    label="Toplam İndirim"
                                    type="number"
                                    value={currentAccountExtras.totalDiscount}
                                    onChange={(e) => setCurrentAccountExtras({
                                        ...currentAccountExtras,
                                        totalDiscount: parseFloat(e.target.value) || 0
                                    })}
                                    variant="outlined"
                                />
                                <TextField
                                    sx={{ width: '15%' }}
                                    select
                                    label="Ödeme Vadesi"
                                    value={currentAccountExtras.paymentTerm}
                                    onChange={(e) => setCurrentAccountExtras({
                                        ...currentAccountExtras,
                                        paymentTerm: e.target.value as PaymentTermEnum
                                    })}
                                    variant="outlined"
                                >
                                    {Object.values(PaymentTermEnum).map((term) => (
                                        <MenuItem key={term} value={term}>
                                            {term}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    sx={{ width: '15%' }}
                                    select
                                    label="Para Birimi"
                                    value={currentAccountExtras.currency}
                                    onChange={(e) => setCurrentAccountExtras({
                                        ...currentAccountExtras,
                                        currency: e.target.value as CurrencyEnum
                                    })}
                                    variant="outlined"
                                >
                                    {Object.values(CurrencyEnum).map((currency) => (
                                        <MenuItem key={currency} value={currency}>
                                            {currency}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    sx={{ width: '15%' }}
                                    label="Açıklama"
                                    value={currentAccountExtras.description}
                                    onChange={(e) => setCurrentAccountExtras({
                                        ...currentAccountExtras,
                                        description: e.target.value
                                    })}
                                    variant="outlined"
                                />
                                <IconButton color="primary" onClick={handleAddCurrentAccount}>
                                    <AddIcon />
                                </IconButton>
                            </Stack>

                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tedarikçi</TableCell>
                                            <TableCell>Vergi No</TableCell>
                                            <TableCell>Ödeme Vadesi</TableCell>
                                            <TableCell>Toplam İndirim</TableCell>
                                            <TableCell>Para Birimi</TableCell>
                                            <TableCell>Açıklama</TableCell>
                                            <TableCell>İşlem</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {editedProposalRequest.currentAccounts?.map((account, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{account.currentAccount?.title}</TableCell>
                                                <TableCell>{account.currentAccount?.contactInformation?.taxNo}</TableCell>
                                                <TableCell>{account.paymentTerm}</TableCell>
                                                <TableCell>{account.totalDiscount}</TableCell>
                                                <TableCell>{account.currency}</TableCell>
                                                <TableCell>{account.description}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => {
                                                            const newAccounts = [...(editedProposalRequest.currentAccounts || [])];
                                                            newAccounts.splice(index, 1);
                                                            setEditedProposalRequest({
                                                                ...editedProposalRequest,
                                                                currentAccounts: newAccounts
                                                            });
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProposalEntryModal}>İptal</Button>
                    <Button onClick={handleSaveProposalEntry} variant="contained" color="primary">
                        Kaydet
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isProposalSelectionModalOpen}
                onClose={handleCloseProposalSelectionModal}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Teklif Seçimi</DialogTitle>
                <DialogContent>
                    {selectedProposalForSelection && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Cari Hesaplar</Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Tedarikçi</TableCell>
                                            <TableCell>Vergi No</TableCell>
                                            <TableCell>Ödeme Vadesi</TableCell>
                                            <TableCell>Toplam İndirim</TableCell>
                                            <TableCell>Para Birimi</TableCell>
                                            <TableCell>Açıklama</TableCell>
                                            <TableCell>Seçim</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedProposalForSelection.currentAccounts?.map((account, index) => (
                                            <TableRow
                                                key={index}
                                                selected={selectedCurrentAccountExtra === account}
                                                onClick={() => setSelectedCurrentAccountExtra(account)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>{account.currentAccount?.title}</TableCell>
                                                <TableCell>{account.currentAccount?.contactInformation?.taxNo}</TableCell>
                                                <TableCell>{account.paymentTerm}</TableCell>
                                                <TableCell>{account.totalDiscount}</TableCell>
                                                <TableCell>{account.currency}</TableCell>
                                                <TableCell>{account.description}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        color={selectedCurrentAccountExtra === account ? "primary" : "default"}
                                                    >
                                                        <CheckIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProposalSelectionModal}>İptal</Button>
                    <Button
                        onClick={handleSaveProposalSelection}
                        variant="contained"
                        color="primary"
                        disabled={!selectedCurrentAccountExtra}
                    >
                        Kaydet
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isApprovalDialogOpen}
                onClose={handleCloseApprovalDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Onaya Gönder</DialogTitle>
                <DialogContent>
                    <Typography>Bu teklifi onaya göndermek istediğinizden emin misiniz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseApprovalDialog}>İptal</Button>
                    <Button onClick={handleSendForApproval} variant="contained" color="primary">
                        Onaya Gönder
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};