import { Employee } from './typesEmployee';
import { Department } from './Admin/typesDepartment';
export interface Section {
  id: number;
  name: string;
  employee:Employee;
  department:Department;
  email: string;
}