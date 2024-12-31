
export enum InvoiceItemTypeEnum{
    ADDITIONAL_COST='ADDITIONAL_COST',
    SERVICE='SERVICE',
    MATERIAL='MATERIAL',
    FIXTURE='FIXTURE',
    }
export enum Currency {
    TRY='TRY',
    USD='USD',
    EUR='EUR',
    AUD='AUD',
    GBP='GBP',
    }
export enum WarehouseBranchEnum {
    DUZCE='DUZCE',
    TUZLA='TUZLA',
    TERSANE='TERSANE'
    }

export enum MaintenancePeriodEnum{

 DAY='DAY',
    WEEK='WEEK',
    MONTH='MONTH',
    YEAR='YEAR',
    }
export enum WarrantyPeriodEnum {
    DAY='DAY',
    WEEK='WEEK',
    MONTH='MONTH',
    YEAR='YEAR',
    }
export enum InvoiceTypeEnum{
    RECEIPT_INVOICE='RECEIPT_INVOICE',
    RETURN_INVOICE = 'RETURN_INVOICE'
    }

export enum FixtureType {
          MAIN_MATERIAL = 'MAIN_MATERIAL',
          CONSUMPTION_MATERIAL = 'CONSUMPTION_MATERIAL',
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

export enum AssignmentStatusEnum {
    ASSIGNED = 'ASSIGNED',
    IN_MAINTENANCE = 'IN_MAINTENANCE',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}