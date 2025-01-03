import { InvoiceItem } from '@/components/Purchasing/Invoice/types/typesInvoiceItem';
export interface Invoice {
  id: number;
  code: string;
  date: string;
  warehouseBranch?:WarehouseBranchEnum;
  specialCode: string;
  currency?: Currency;
  fixedCurrency: boolean;
  fixedCurrencyValue: number;
  invoiceItems?: InvoiceItem[];
  generalDiscount: number;
  unitDiscount: number;
  totalVat: number;
  totalAdditionalCosts: number;
  subTotal: number;
  finalTotal: number;
  invoiceTypeEnum?: InvoiceTypeEnum;
}
export enum InvoiceTypeEnum {
RECEIPT_INVOICE='RECEIPT_INVOICE',
RETURN_INVOICE = 'RETURN_INVOICE'
    }

export enum WarehouseBranchEnum {
    DUZCE='DUZCE',
    TUZLA='TUZLA',
    TERSANE='TERSANE'
    }
export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
}