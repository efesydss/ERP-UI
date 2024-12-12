import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/machines/$id/')({
  component: () => <div>Hello /_authenticated/admin/machines/$id/!</div>
  //burası machine nin tekil olarak görüntülendiği yerdir.. isteğe bağlı
  // olarak <MachineDetail/> da olduğu gibi bir ui yazılabilir...
})


/*****{
 "id": 1,
 "assignmentStatusEnum": "Status",
 "code": "123",
 "name": "Assignment",
 "fixtureCard": {
 "id": 101,
 "fixtureCode": "01.001",
 "fixtureName": "Steel Plate",
 "fixtureGroup": {
 "id": 13
 },
 "defaultUnit": "KG",
 "fixtureType": "MAIN_MATERIAL",
 "optimalLevel": 100,
 "minimumLevel": 10,
 "specialCode": "SPEC123",
 "shelfLocation": "A1-01",
 "fixtureCardUnits": [
 {
 "id": 1,
 "unit": "KG",
 "multiplier": 0
 }
 ]
 },
 "insuranceCompany": "Apple",
 "insurance": true,
 "insurancePolicyNo": "567890",
 "insuranceDuration": 5,
 "info": "Information",
 "invoice": {
 "id": 1,
 "code": "A-001",
 "date": "2024-12-12",
 "warehouseBranch": "TUZLA",
 "specialCode": "SP-001",
 "currency": "USD",
 "fixedCurrency": true,
 "fixedCurrencyValue": 257.6,
 "invoiceItems": [
 {
 "id": 1,
 "invoiceItemType": "FIXTURE",
 "invoiceItemTypeEntityId": "1",
 "code": "C11",
 "name": "Name",
 "unit": "KG",
 "quantity": 1,
 "price": 1,
 "discount": 1,
 "tax": 1,
 "rowTotal": 1
 }
 ],
 "generalDiscount": 3567.5,
 "unitDiscount": 3000,
 "totalVat": 200,
 "totalAdditionalCosts": 2000,
 "subTotal": 15000,
 "finalTotal": 259,
 "invoiceTypeEnum": "RECEIPT_INVOICE"
 },
 "warrantyPeriodEnum": "Status",
 "warrantyDay": 1,
 "underMaintenance": true,
 "maintenanceDuration": 0,
 "maintenancePeriodEnum": "Status"
 } */