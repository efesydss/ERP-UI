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
export interface FixtureCardUnit{
    id:number,
    unit:DefaultUnit,
    multiplier:number,
    }