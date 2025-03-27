import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";
import { Project } from '@/components/Production/Project/types/typesProject'
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee'
import { MaterialCard } from '@/components/Storage/MaterialCard/types/typesMaterialCard'
import { Unit } from '@/components/Storage/unit/types/typesUnit'

export interface PurchaseOrder {
  id: number;
  date: string;
  name:string;
  employee?: EmployeeResponse;
  description: string;
  project?: Project;
  currentAccount?: CurrentAccount;
  purchaseOrderItems?: PurchaseOrderItem[];
}
export interface PurchaseOrderItem {
    id: number;
    materialCard: MaterialCard;
    quantity: number;
    unit: Unit;
}