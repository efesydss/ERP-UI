import { FixtureGroup } from '@/components/Storage/typesFixtureGroup'
import { FixtureCardUnit } from '@/components/Storage/fixtureCard/types/typesFixtureCardUnit'
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
export enum FixtureTypeEnum {
    MAIN_MATERIAL='MAIN_MATERIAL',
    CONSUMPTION_MATERIAL='CONSUMPTION_MATERIAL',
}
export interface FixtureCard{
    id:number,
    fixtureCode:string,
    fixtureName:string,
    fixtureGroup:FixtureGroup,
    defaultUnit:DefaultUnit,
    fixtureType:FixtureTypeEnum,
    optimalLevel:number,
    minimumLevel:number,
    specialCode:string,
    shelfLocation:string,
    fixtureCardUnits:FixtureCardUnit[],
}