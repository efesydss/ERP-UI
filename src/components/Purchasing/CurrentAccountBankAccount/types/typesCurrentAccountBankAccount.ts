import { Bank } from "@/components/Finance/Bank/types/typesBank";
import { Currency } from "@/components/Purchasing/CurrentAccount/types/typesCurrentContactInformation";
import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";
import { BankBranch } from "@/components/Finance/BankBranch/types/typesBankBranch";
export interface CurrentAccountBankAccount {
  id: number;
  currentAccount?: CurrentAccount;
  bank?: Bank;
  branch?: BankBranch;
  accountNumber: string;
  iban: string;
  currency?: Currency;
}