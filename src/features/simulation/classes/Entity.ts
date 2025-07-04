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

    act() {} // Placeholder that does nothing, overridden by Actor.
}