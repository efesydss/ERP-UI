import {
  InvoiceItemTypeEnum,
  DefaultUnit,

} from '@/components/Storage/typesEnums';
export interface InvoiceItem {

    id:number,
    invoiceItemType:InvoiceItemTypeEnum,
    invoiceItemTypeEntityId:string,
    code:string,
    name:string,
    unit:DefaultUnit,
    quantity:number,
    price:number,
    discount:number,
    tax:number,
    rowTotal:number,
    }