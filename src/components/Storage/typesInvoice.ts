import {
  WarehouseBranchEnum,
  Currency,
  InvoiceTypeEnum
} from '@/components/Storage/typesEnums';

import { InvoiceItem } from './typesInvoiceItem'

export interface Invoice{
    id:number,
    code:string,
    date:string,//behçet abiden öğren
    warehouseBranch:WarehouseBranchEnum,
    specialCode:string,
    currency:Currency,
    fixedCurrency:boolean,
    fixedCurrencyValue?:number,
    invoiceItems:InvoiceItem[],
    generalDiscount:number,
    unitDiscount:number,
    totalVat:number,
    totalAdditionalCosts:number,
    subTotal:number,
    finalTotal:number,
    invoiceTypeEnum:InvoiceTypeEnum,
    }