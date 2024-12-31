import {
  DefaultUnit,
} from './typesEnum';
export interface ExpenseCard {
  id: number;
  code: string;
  description: string;
  unit: DefaultUnit;

}