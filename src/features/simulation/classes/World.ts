import type { IWorld } from '../types/IWorld';
import { ActorBase } from './Actor';
import type { Entity } from './Entity';
import type { WorldCell } from './WorldCell';

/** A world is a collection of cells, along with the entities in those cells. */
export class World implements IWorld {
    constructor(readonly rows: number, readonly columns: number, cells: Iterable<WorldCell>) {
        this.allCells = new Set<WorldCell>(cells);

        for (const cell of cells) {
            for (const entity of cell.contents) {
                this.addEntity(entity);
            }
        }
    }

    private allCells: Set<WorldCell>;
    private allEntities: Set<Entity> = new Set<Entity>();
    private allActors: Set<ActorBase> = new Set<ActorBase>();

    public get cells(): ReadonlySet<WorldCell> {
        return this.allCells;
    }

    public addEntity(entity: Entity) {
        this.allEntities.add(entity);
        if (entity instanceof ActorBase) {
            this.allActors.add(entity);
        }
    }

    public removeEntity(entity: Entity) {
        this.allActors.delete(entity);
        this.allEntities.delete(entity);
        entity.location.removeEntity(entity);
    }

    public actAllEntities() {
        for (const actor of this.allActors) {
            actor.act();
        }
    }
}