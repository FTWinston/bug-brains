import type { EntityType } from './EntityType';

export type EntityInfoCommon = {
    id: number;
    type: EntityType;
}

export type EntityInfo = EntityInfoCommon & ({
    type: EntityType.Ant;
    color?: 'red' | 'blue';
} | {
    type: EntityType.Food;
    quantity: number;
} | {
    type: EntityType.Rock;
})