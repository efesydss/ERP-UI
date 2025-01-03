export enum CurrentAccountType {
    CUSTOMER= 'CUSTOMER',
    SELLER= 'SELLER',
    OFFICIAL= 'OFFICIAL',
    RUNNING= 'RUNNING',
    OTHER= 'OTHER',
    }
export enum Currency {
  TRY = 'TRY',
  EUR = 'EUR',
  USD = 'USD'
}
export interface CurrentContactInformation {
    id : number;
    address : string;
    authorizedPerson : string;
    faxNo : string;
    webAddress : string;
    email : string;
    specialCode : string;
    number : string;
    backupNumber : string;
    taxAdmin: string;
    taxNo: number;
    invoicedWithCurrency: boolean;
    currency?: Currency;
    accountType?: CurrentAccountType;
    }