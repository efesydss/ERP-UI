import { Employee } from './typesEmployee';
import { Department } from './typesDepartment';//todo ef create this file
export interface Section {
  id: number;
  name: string;
  employee:Employee;
  department:Department;
  email: string;
}