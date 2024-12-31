 import {
  Currency
 } from './typesEnum';

export interface BankAccount {
  id: number;
  accountNumber: string;
  iban: string;
  currency: Currency;
}