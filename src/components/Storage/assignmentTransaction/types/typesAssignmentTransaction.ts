import {
    AssignmentStatusEnum,

    } from './typesEnum';
import { Employee } from './typesEmployee';
import { AssignmentCard } from './typesAssignmentCard';

export interface AssignmentTransaction{
    id:number,
    assignmentCard?:AssignmentCard,
    employee?:Employee,
    transactionDate:string,
    assignmentStatusEnum:AssignmentStatusEnum,

}