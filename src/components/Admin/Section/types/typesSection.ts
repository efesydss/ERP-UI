import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';
import { SectionTypeEnum } from '@/components/Storage/typesEnums';
export interface Section {
  id: number;
  name: string;
  employee?:EmployeeResponse;
  sectionType?:SectionTypeEnum
}