 import {
  Currency
 } from '@/components/Storage/typesEnums';

export interface BankAccount {
  id: number;
  accountNumber: string;
  iban: string;
  currency?: Currency;
}