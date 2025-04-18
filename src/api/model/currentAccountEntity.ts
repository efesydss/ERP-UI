/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { UserEntity } from './userEntity';
import type { CurrentAccountEntitySector } from './currentAccountEntitySector';
import type { CurrentContactInformationEntity } from './currentContactInformationEntity';
import type { BankAccountEntity } from './bankAccountEntity';
import type { CurrentAccountBankAccountEntity } from './currentAccountBankAccountEntity';

export interface CurrentAccountEntity {
  id?: number;
  createdAt?: string;
  createdBy?: UserEntity;
  updatedAt?: string;
  deleted?: boolean;
  updatedBy?: UserEntity;
  code?: string;
  title?: string;
  active?: boolean;
  sector?: CurrentAccountEntitySector;
  contactInformation?: CurrentContactInformationEntity;
  bankAccount?: BankAccountEntity;
  currentAccountBankAccounts?: CurrentAccountBankAccountEntity[];
}
