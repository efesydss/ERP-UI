export type PaymentType = 'SALARY' | 'SALARY_PAYMENT' | 'OVERTIME' | 'ADVANCE' | 'DEDUCTION' | 'TRANSFER' | 'SEIZURE'

export enum PaymentTypes {
  Salary = 'SALARY',
  SalaryPayment = 'SALARY_PAYMENT',
  Overtime = 'OVERTIME',
  Advance = 'ADVANCE',
  Deduction = 'DEDUCTION',
  Transfer = 'TRANSFER'
}

export interface Currency {
  currencyCode: string
  displayName: string
  symbol: string
}

export interface BankAccount {
  id?: number
  accountNumber?: number
  iban: string
  currency: Currency
}

export interface EmployeePayment {
  id?: number
  paymentDate: string
  paymentType: PaymentType
  description: string
  bankAccount: BankAccount
  transactionCost: number
  amount: number
  amountCurrency: Currency
}
