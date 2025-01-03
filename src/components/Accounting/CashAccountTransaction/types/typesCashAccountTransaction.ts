import { CashAccount } from "@/components/Accounting/CashAccount/types/typesCashAccount";

export interface CashAccountTransaction {
  id: number;
  date: string;
  cashAccount: CashAccount;
  currentAccount: CurrentAccount;//todo ef purchasing/currentAccount create...
  description: string;
  debtStatus: boolean;
  total:number;
  balance: number;
}