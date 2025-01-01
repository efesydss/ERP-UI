import {
  AssignmentStatusEnum,
  WarrantyPeriodEnum,
  MaintenancePeriodEnum
} from '@/components/Storage/typesEnums';


import { FixtureCard } from '@/components/Storage/typesFixtureCard';
import { Invoice } from '@/components/Storage/typesInvoice';


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