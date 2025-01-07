export interface AdditionalCost {
  id: number;
  code: string;
  description: string;
  unit?: DefaultUnit;
  specialCode: string;
}
export enum DefaultUnit{
        KG = 'KG',
        GR = 'GR',
        METER = 'METER',
        M2 = 'M2',
        M3 = 'M3',
        LITRE = 'LITRE',
        PIECE = 'PIECE',
        PACKAGE = 'PACKAGE',
        PAIR = 'PAIR',
        PLATE = 'PLATE',
        MM = 'MM',
    }