export interface CashAccount {
  id: number;
  code: string;
  name: string;
  currency: Currency;
}

export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
}