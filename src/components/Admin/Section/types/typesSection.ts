import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';
import { Department } from '@/components/Company/Department/types/typesDepartment';
export interface Section {
  id: number;
  name: string;
  employee?:EmployeeResponse;
  department?:Department;
  email: string;
}