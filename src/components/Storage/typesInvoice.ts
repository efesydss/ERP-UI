import { InvoiceItem } from './typesInvoiceItem'

export enum WarehouseBranchEnum {
    DUZCE='DUZCE',
    TUZLA='TUZLA',
    TERSANE='TERSANE'
    }
export enum InvoiceItemTypeEnum{
    ADDITIONAL_COST='ADDITIONAL_COST',
    SERVICE='SERVICE',
    MATERIAL='MATERIAL',
    FIXTURE='FIXTURE',
    }
export enum DefaultUnit{
        KG = 'KG',
        GR = 'GR',
        METER = 'METER',
        M2 = 'M2',
        M3 = 'M3',
        LITRE = 'LITRE',
        PIECE = 'PIECE',
        PACKAGE = 'PACKAGE',
        PAIR = 'PAIR',
        PLATE = 'PLATE',
        MM = 'MM',
    }
export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
    }
export enum InvoiceTypeEnum{
    RECEIPT_INVOICE='RECEIPT_INVOICE',
    RETURN_INVOICE = 'RETURN_INVOICE'
    }
export interface Invoice{
    id:number,
    code:string,
    date:string,
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