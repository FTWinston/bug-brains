import type { EntityType } from 'src/types/EntityType';
import type { IEntityState } from 'src/types/IEntityState';
import type { IEntity } from '../types/IEntity';
import type { WorldCell } from './WorldCell';

export abstract class Entity implements IEntity {
    constructor(id: number, location: WorldCell) {
        this.id = id;
        this.cell = location;
    }

    public cell: WorldCell;
    public readonly id: number;
    public readonly size: number = 1; // Default size of an entity, can be overridden by subclasses.
    public abstract type: EntityType; // Type of the entity, e.g. 'ant', 'food', etc.
    public abstract getStateForUpdate(): Omit<IEntityState, 'id' | 'type'>;

    public get location() {
        return this.cell;
    }

    public moveTo(location: WorldCell) {
        if (this.cell === location) {
            return; // Already at the desired location.
        }

        if (location.tryAddEntity(this)) {
            this.cell.removeEntity(this);
            this.cell = location;
        }
    }
}