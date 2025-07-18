import { EntityType } from 'src/types/EntityType';
import type { IEntityState } from 'src/types/IEntityState';
import type { BehaviorList } from '../types/BehaviorList';
import { Actor } from './Actor';
import type { WorldCell } from './WorldCell';
import type { IActorSettings } from '../types/IActorSettings';

export class Ant extends Actor<Ant> {
    constructor(id: number, location: WorldCell, behavior: BehaviorList<Ant>, settings: IActorSettings) {
        super(id, location, behavior, settings);
    }

    public readonly type = EntityType.Ant;

    public getStateForUpdate(): Omit<IEntityState, 'id' | 'type'> {
        return {
            color: 'red', // Default color, can be changed later
        }
    }
}