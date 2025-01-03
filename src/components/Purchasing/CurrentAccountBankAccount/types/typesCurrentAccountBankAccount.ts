import { Bank } from "@/components/Finance/Bank/types/typesBank";
import { Currency } from "@/components/Finance/CurrentAccount/types/typesCurrentContactInformation";
import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";
export interface CurrentAccountBankAccount {
  id: number;
  currentAccount?: CurrentAccount;
  bank?: Bank;
  branch: string;
  accountNumber: string;
  iban: string;
  currency?: Currency;
}