import type { EntityType } from 'src/types/EntityType';
import type { IEntityState } from 'src/types/IEntityState';
import type { IEntity } from '../types/IEntity';
import type { WorldCell } from './WorldCell';
import { Random } from 'src/classes/Random';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';

export abstract class Entity implements IEntity {
    constructor(id: number, location: WorldCell) {
        this.id = id;
        this.cell = location;
        
        if (!location.tryAddEntity(this)) {
            throw new Error(`Entity with ID ${id} could not be added to cell at index ${location.index}.`);
        }
    }

    public cell: WorldCell;
    public readonly id: number;
    public readonly size: number = 1; // Default size of an entity, can be overridden by subclasses.
    public abstract type: EntityType; // Type of the entity, e.g. 'ant', 'food', etc.
    public abstract getStateForUpdate(): Omit<IEntityState, 'id' | 'type'>;
    public random: Random = new Random(); // Random number generator for this entity.

    public get location() {
        return this.cell;
    }

    public moveTo(location: WorldCell): SimulationUpdate | null {
        if (this.cell === location) {
            return null; // Already at the desired location.
        }

        if (!location.tryAddEntity(this)) {
            return null; // Cannot move to the new location, perhaps it's full or a solid wall.
        }

        this.cell.removeEntity(this);
        this.cell = location;
        
        // Return a movement update.
        return {
            type: 'mov',
            id: this.id,
            loc: location.index,
        };
    }
}