import { FixtureCard } from '@/api/model/';
import { Invoice } from '@/components/Storage/typesInvoice';

export enum AssignmentStatusEnum {
    ASSIGNED = 'ASSIGNED',
    IN_MAINTENANCE = 'IN_MAINTENANCE',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE',
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
export interface AssignmentCard {
    id: number,
    assignmentStatusEnum:AssignmentStatusEnum,
    code:string,
    name:string,
    fixtureCard?:FixtureCard,
    insuranceCompany:string,
    insurance:boolean,
    insurancePolicyNo:string,
    insuranceDuration:number,
    info:string,
    invoice?:Invoice,
    warrantyPeriodEnum:WarrantyPeriodEnum,
    warrantyDay:number,
    underMaintenance:boolean,
    maintenanceDuration:number,
    maintenancePeriodEnum:MaintenancePeriodEnum,
}