import { EntityType } from 'src/types/EntityType';
import type { IEntityState } from 'src/types/IEntityState';
import { Actor } from './Actor';
import type { WorldCell } from './WorldCell';
import type { BehaviorList } from '../types/BehaviorList';
import type { IQueenSettings } from '../types/IQueenSettings';

export class Queen extends Actor<Queen> {
    constructor(id: number, location: WorldCell, settings: IQueenSettings) {
        super(id, location, Queen.queenBehavior, settings);
    }

    private static readonly queenBehavior: BehaviorList<Queen> = [
        // TODO: queen behaviour that cannot be modified.
    ];

    public readonly type = EntityType.Queen;

    public getStateForUpdate(): Omit<IEntityState, 'id' | 'type'> {
        return {}
    }
}