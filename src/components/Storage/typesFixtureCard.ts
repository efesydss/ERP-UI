import { FixtureGroup } from '@/components/Storage/typesFixtureGroup'
import { FixtureCardUnit } from '@/components/Storage/typesFixtureCardUnit'

import {
  DefaultUnit,
  FixtureTypeEnum,
} from '@/components/Storage/typesEnums';

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