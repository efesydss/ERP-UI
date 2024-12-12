import { FixtureGroup } from './typesFixtureGroup'
import { FixtureCardUnit } from './typesFixtureCardUnit'

import {
  DefaultUnit,
  FixtureTypeEnum,
} from './typesEnum';

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