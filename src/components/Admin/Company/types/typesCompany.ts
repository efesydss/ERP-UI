import { Branch } from './typesBranch';

export interface Company {
    id: number;
    code: string;
    title: string;
    address: string;
    phone: string;
    phoneBackup: string;
    taxAdmin: string;
    taxNumber: string;
    branch: Branch;
}