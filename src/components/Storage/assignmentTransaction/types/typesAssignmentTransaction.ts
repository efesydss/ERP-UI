import { AssignmentStatusEnum } from '@/components/Storage/typesEnums';
import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';
import { AssignmentCard } from '@/components/Storage/typesAssignmentCard';

export interface AssignmentTransaction{
    id:number,
    assignmentCard?:AssignmentCard,
    employee?:EmployeeResponse,
    transactionDate:string,
    assignmentStatusEnum?:AssignmentStatusEnum,

}