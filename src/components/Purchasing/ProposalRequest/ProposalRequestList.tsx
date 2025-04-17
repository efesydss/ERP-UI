import { ProposalRequest } from "@/api/model";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { proposalRequests } from "@/api/openAPIDefinition";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ProposalRequestForm from '@/components/Purchasing/ProposalRequest/ProposalRequestForm';

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
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);

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
            console.log("Proposal Requests Data:", response.data);
        } catch (err) {
            setError("Teklif talepleri yüklenirken bir hata oluştu");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProposalRequests();
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
                accessorKey: 'employee.name',
                header: t('common:Employee'),
            },
            {
                accessorKey: 'selectedCurrentAccount.title',
                header: t('common:SelectedCurrentAccountTitle')
            },
            {
                accessorKey: 'total',
                header: t('common:Total'),
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
        renderDetailPanel: ({ row }) => (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="Malzeme Detayları" />
                        <Tab label="Tedarikçi Bilgileri" />
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
            </Box>
        ),
    });

    return (
        <>
            <Button variant="contained" onClick={handleFormOpen} sx={{ mb: 2 }}>
                Yeni Teklif Talebi Ekle
            </Button>
            <MaterialReactTable table={table} />
            <ProposalRequestForm open={isFormOpen} onClose={handleFormClose} onSuccess={handleFormSuccess} />
        </>
    );
};