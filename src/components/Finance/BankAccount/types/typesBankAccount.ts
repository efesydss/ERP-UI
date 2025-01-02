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
  iban: string;
  currency?: Currency;
}