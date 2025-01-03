import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';
import { Department } from '@/components/Company/Department/types/typesDepartment';
import { SectionTypeEnum } from '@/components/Storage/typesEnums';
export interface Section {
  id: number;
  name: string;
  employee?:EmployeeResponse;
  department?:Department;
  sectionType?:SectionTypeEnum
}