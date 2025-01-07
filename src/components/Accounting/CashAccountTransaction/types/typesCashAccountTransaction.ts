import { CashAccount } from "@/components/Accounting/CashAccount/types/typesCashAccount";
import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";
export interface CashAccountTransaction {
  id: number;
  date: string;
  cashAccount?: CashAccount;
  currentAccount?: CurrentAccount;
  description: string;
  debtStatus: boolean;
  total:number;
  balance: number;
}