import { CurrentContactInformation } from '@/components/Purchasing/CurrentAccount/types/typesCurrentContactInformation';
import { BankAccount } from '@/components/Finance/BankAccount/types/typesBankAccount';
import { CurrentAccountBankAccount } from '@/components/Purchasing/CurrentAccountBankAccount/types/typesCurrentAccountBankAccount';
export enum SectorEnum {
    METAL = 'METAL',
    YACHTING = 'YACHTING',
    ALUMINIUM = 'ALUMINIUM',
    IT = 'IT',
    FOOD = 'FOOD',
    OUTFITTING = 'OUTFITTING',
}

export interface CurrentAccount {
  id: number;
  code: string;
  title: string;
  active: boolean;
  sector?: SectorEnum;
  contactInformation?: CurrentContactInformation;
  bankAccount?: BankAccount;
  currentAccountBankAccounts?: CurrentAccountBankAccount[];
}