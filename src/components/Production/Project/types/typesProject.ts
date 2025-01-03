import { CurrentAccount } from "@/components/Purchasing/CurrentAccount/types/typesCurrentAccount";
import { EmployeeResponse } from "@/components/Hr/Employees/typesEmployee";
export interface Project {
    id: number;
    currentAccount?: CurrentAccount;
    code: string;
    name: string;
    employee?: EmployeeResponse;
}