import {
  AssignmentStatusEnum,
  FixtureType,
  DefaultUnit,
  InvoiceTypeEnum,
  WarrantyPeriodEnum,
  MaintenancePeriodEnum
} from './typesEnum';


import { FixtureGroup } from './typesFixtureGroup'
import { FixtureCard } from './typesFixtureCard'
import { FixtureCardUnit } from './typesFixtureCardUnit'

export interface AssignmentCard {
    id: number,
    assignmentStatusEnum:AssignmentStatusEnum,
    code:string,
    name:string,
    fixtureCard:FixtureCard,
    fixtureGroup:FixtureGroup,
    defaultUnit:DefaultUnit,
    fixtureType:FixtureType,
    optimalLevel:number,
    minimumLevel:number,
    specialCode:string,
    shelfLocation:string,
    fixtureCardUnit:FixtureCardUnit,
    insuranceCompany:string,
    insurance:boolean,
    insurancePolicyNo:string,
    insuranceDuration:number,
    info:string,
    invoice:invoice,
    generalDiscount:number,
    unitDiscount:number,
    totalVat:number,
    totalAdditionalCosts:number,
    subTotal:number,
    finalTotal:number,
    invoiceTypeEnum:InvoiceTypeEnum,
    warrantyPeriodEnum:WarrantyPeriodEnum,
    warrantyDay:number,
    underMaintenance:boolean,
    maintenanceDuration:number,
    maintenancePeriodEnum:MaintenancePeriodEnum,
}