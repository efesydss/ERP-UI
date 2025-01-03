import { BankAccount } from '@/components/Finance/BankAccount/types/typesBankAccount';
import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";

export interface CurrentAccountTransaction {
    id: number;
    date: string;
    currentAccount?: CurrentAccount;
    description: string;
    transactionType?: TransactionTypeEnum;
    paymentType?: PaymentTypeEnum;
    bankAccount?: BankAccount;
    transactionFee: number;
    debtType?: DebtTypeEnum;
    amount: number;
    currency?: Currency;

}
export enum DebtTypeEnum {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
    }

export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
    }
export enum PaymentTypeEnum {
        NO_PAYMENT = 'NO_PAYMENT',
        CASH = 'CASH',
        CHECK = 'CHECK',
        BOND = 'BOND',
        EFT = 'EFT',
        CREDIT_CARD = 'CREDIT_CARD',
        BANK_CARD = 'BANK_CARD',
        PROMISSORY_NOTE = 'PROMISSORY_NOTE',
        OTHER = 'OTHER',
    }
export enum TransactionTypeEnum {
    ORDER = 'ORDER',
    INVOICE = 'INVOICE',
    PAYMENT = 'PAYMENT',
    COLLECTION = 'COLLECTION',
    EXPENSE = 'EXPENSE',
    EMPLOYEE_ADVANCE = 'EMPLOYEE_ADVANCE',
    EMPLOYEE_SALARY = 'EMPLOYEE_SALARY',
    TAX = 'TAX',
    SOCIAL_SECURITY = 'SOCIAL_SECURITY',
    FREELANCE_RECEIPT = 'FREELANCE_RECEIPT',
    RENT = 'RENT',
    TRANSFER = 'TRANSFER',
    DOCUMENT_CANCELLATION = 'DOCUMENT_CANCELLATION',
}
