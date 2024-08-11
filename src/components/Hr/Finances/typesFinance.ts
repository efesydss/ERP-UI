export enum PaymentType {
  SALARY = 'SALARY',
  SALARY_PAYMENT = 'SALARY_PAYMENT',
  OVERTIME = 'OVERTIME',
  ADVANCE = 'ADVANCE',
  DEDUCTION = 'DEDUCTION',
  TRANSFER = 'TRANSFER',
  SEIZURE = 'SEIZURE',
  ADDITIONAL_PAYMENT = 'ADDITIONAL_PAYMENT',
  TRAVEL_PAYMENT = 'TRAVEL_PAYMENT'
}

export enum AdditionalPaymentType {
  ADDITIONAL_PAYMENT = 'ADDITIONAL_PAYMENT',
  TRAVEL_PAYMENT = 'TRAVEL_PAYMENT'
}

export enum DeductionPaymentType {
  ADVANCE = 'ADVANCE',
  DEDUCTION = 'DEDUCTION',
  TRANSFER = 'TRANSFER',
  SEIZURE = 'SEIZURE'
}

export enum CurrencyCode {
  TRY = 'TRY',
  USD = 'USD',
  EUR = 'EUR'
}

export interface Currency {
  currencyCode: CurrencyCode
  displayName: string
  symbol: string
}

export interface BankAccount {
  id?: number
  accountNumber?: number
  iban: string
  currency: Currency
}

export interface Bank {
  id?: number
  bankName: string
  bankShortName: string
  swiftCode: string
}
