import { EmployeeResponse } from '@/components/Hr/Employees/typesEmployee';

export enum SectionTypeEnum{
      MANAGEMENT='MANAGEMENT',
      IT='IT',
      PRODUCTION='PRODUCTION',
      FINANCE='FINANCE',
      DESIGN='DESIGN',
      ACCOUNTING='ACCOUNTING',
      PURCHASING='PURCHASING',
}

export interface Section {
  id: number;
  name: string;
  employee?:EmployeeResponse;
  sectionType?:SectionTypeEnum
}