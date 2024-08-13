import { CurrencyCode, PaymentType } from '@/components/Hr/Finances/typesFinance'
import { EmployeeRef } from '@/components/Hr/TimeKeeping/typesTimeKeeping'

export interface BankAccount {
  id?: number
  accountNumber: string
  iban: string
  currency: CurrencyCode //todo: will be updated with Currency Type
}

export interface EmployeePaymentProps {
  id?: number
  paymentDate: string
  paymentType: PaymentType
  description: string
  bankAccount: BankAccount
  transactionCost: number
  amount: number
  amountCurrency: CurrencyCode //todo: will be updated with Currency Type
  employee?: EmployeeRef
}
