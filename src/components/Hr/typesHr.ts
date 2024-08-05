import { Currency, PaymentType } from '@/components/Hr/Finances/typesFinance'

export interface BankAccount {
  id: number
  accountNumber: string
  iban: string
  currency: Currency
}

export interface EmployeePayment {
  id: number
  paymentDate: string
  PaymentType: PaymentType
  description: string
  bankAccount: BankAccount
  transactionCost: number
  amountCurrency: Currency
}
