import { BankBranch } from '@/components/Finance/BankBranch/types/typesBankBranch';
export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
    }
export interface BankAccount {
  id: number;
  accountNumber: string;
  branch?:BankBranch;
  iban: string;
  currency?: Currency;
}