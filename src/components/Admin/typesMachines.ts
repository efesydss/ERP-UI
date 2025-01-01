import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';



export interface Machines {
    id:number,
    code:string,
    description:string,
    employee: EmployeeResponse
}