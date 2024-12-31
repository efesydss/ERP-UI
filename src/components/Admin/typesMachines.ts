import { Employee } from './typesEmployee';



export interface Machines {
    id:number,
    code:string,
    description:string,
    employee: Employee
}