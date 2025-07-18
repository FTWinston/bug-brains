import type { EntityType } from './EntityType';

export type IEntityCommon = {
    id: number;
    type: EntityType;
}

export type IEntitySpecific = {
    type: EntityType.Ant;
    color?: 'red' | 'blue';
} | {
    type: EntityType.Queen;
} | {
    type: EntityType.Food;
    quantity: number;
} | {
    type: EntityType.Rock;
}

export type IEntityState = IEntityCommon & IEntitySpecific;
