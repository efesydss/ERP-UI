import { MaterialGroup } from '@/components/Storage/MaterialCard/types/typesMaterialGroup';
export interface MaterialCard {
  id: number;
  materialCode: string;
  materialName: string;
  materialGroup: MaterialGroup;
  defaultUnit: DefaultUnit;
  materialType: MaterialType;
  optimalLevel: number;
  minimumLevel: number;
  specialCode: string;
  shelfLocation: string;
  materialCardUnits: MaterialCardUnit[];
}
export interface MaterialCardUnit {
    id: number;
    unit : DefaultUnit;
    multiplier: number;
}
export enum MaterialType{
    MAIN_MATERIAL = 'MAIN_MATERIAL',
    CONSUMPTION_MATERIAL = 'CONSUMPTION_MATERIAL',
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