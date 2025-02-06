import { CurrentAccount } from '@/components/Purchasing/CurrentAccount/types/typesCurrentAccount';
import { EmployeeExtendedRef } from '@api-spec/apiSchema';
import { MaterialCard } from '@/components/Storage/MaterialCard/types/typesMaterialCard';
import { BankAccount } from '@/components/Hr/Finances/typesFinance';

export interface Proposals {
  id: number;
  date: string;
  proposalState: string;
  proposalNo: number;
  currentAccount: CurrentAccount;
  discount: number;
  expense: number;
  tax: number;
  total: number;
  description: string;
  productCards: ProductCardUnit[];
  laborCosts: LaborCost[];
  materialCards: MaterialCard[];
  unitDiscount: number;
  totalTax: number;
  additionalCosts: number;
  finalTotal: number;
  extras: Extras;
}

export interface Extras{
    id:number;
    deliveryDate: string;
    paymentMethod: string;
    employee: EmployeeExtendedRef;
    bankAccounts: BankAccount[];
    technicalDetails: TechnicalDetails[];
    designFileRequired: boolean;
    materialRequestRequired: boolean;
}
export interface TechnicalDetails{
    technicalDetails: string;
    }
export interface LaborCost{
    id: number;
    employee: EmployeeExtendedRef;
    description: string;
    manHour: number;
    manHourCost: number;
    cost: number;
}

     export enum ProposalStateEnum {
         CREATED = 'CREATED',
         FORWARDED_TO_CUSTOMER = 'FORWARDED_TO_CUSTOMER',
         CUSTOMER_ACCEPTED = 'CUSTOMER_ACCEPTED',
         CUSTOMER_PARTIALLY_ACCEPTED = 'CUSTOMER_PARTIALLY_ACCEPTED',
         PRODUCTION_STARTED = 'PRODUCTION_STARTED',
         CUSTOMER_REJECTED = 'CUSTOMER_REJECTED',
         CANCELLED = 'CANCELLED',
         DELIVERED = 'DELIVERED',
     }

export interface ProductCardUnit {
    id: number;
    productCard: ProductCardRef;
    multiplier: number;
}

export interface ProductCardRef {
    id: number;
}

