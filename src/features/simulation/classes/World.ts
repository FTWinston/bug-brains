import type { IWorld } from '../types/IWorld';
import type { Entity } from './Entity';
import type { WorldCell } from './WorldCell';

/** A place in the world that can have entities in it. */
export class World implements IWorld {
    constructor(cells: IterableIterator<WorldCell>) {
        this.allCells = new Set<WorldCell>(cells);

        for (const cell of cells) {
            cell.contents.forEach(entity => {
                this.allEntities.add(entity);
            });
        }
    }

    private allCells: Set<WorldCell>;
    private allEntities: Set<Entity> = new Set<Entity>();

    public get cells(): ReadonlySet<WorldCell> {
        return this.allCells;
    }

    public addEntity(entity: Entity) {
        this.allEntities.add(entity);
    }

    public removeEntity(entity: Entity) {
        this.allEntities.delete(entity);
        entity.location.removeEntity(entity);
    }

    public actAllEntities() {
        for (const entity of this.allEntities) {
            entity.act();
        }
    }
}