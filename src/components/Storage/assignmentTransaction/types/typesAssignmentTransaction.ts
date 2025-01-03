import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';
import { AssignmentCard } from '@/components/Storage/assignmentCard/types/typesAssignmentCard';
export enum AssignmentStatusEnum {
    ASSIGNED = 'ASSIGNED',
    IN_MAINTENANCE = 'IN_MAINTENANCE',
    OUT_OF_SERVICE = 'OUT_OF_SERVICE',
}
export interface AssignmentTransaction{
    id:number,
    assignmentCard?:AssignmentCard,
    employee?:EmployeeResponse,
    transactionDate:string,
    assignmentStatusEnum?:AssignmentStatusEnum,

}