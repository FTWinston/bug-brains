import type { IWorld } from 'src/types/IWorld';
import { ActorBase } from './Actor';
import type { Entity } from './Entity';
import type { WorldCell } from './WorldCell';
import type { SimulationAction } from 'src/types/SimulationAction';

/** A world is a collection of cells, along with the entities in those cells. */
export class World {
    constructor(readonly rows: number, readonly columns: number, cells: Iterable<WorldCell>) {
        this.allCells = new Set<WorldCell>(cells);

        for (const cell of cells) {
            for (const entity of cell.contents) {
                this.addEntity(entity);
            }
        }
    }

    private allCells: Set<WorldCell>;
    private allEntities: Map<number, Entity> = new Map<number, Entity>();
    private allActors: Set<ActorBase> = new Set<ActorBase>();

    public get cells(): ReadonlySet<WorldCell> {
        return this.allCells;
    }

    public addEntity(entity: Entity) {
        this.allEntities.set(entity.id, entity);
        if (entity instanceof ActorBase) {
            this.allActors.add(entity);
        }
    }

    public removeEntity(entity: Entity) {
        this.allActors.delete(entity);
        this.allEntities.delete(entity.id);
        entity.location.removeEntity(entity);
    }

    public actAllEntities(): SimulationAction[] {
        for (const actor of this.allActors) {
            actor.act();
        }

        // TODO: get actual actions from actors to return.
        return [];
    }

    public getDisplayState(): IWorld {
        return {
            columns: this.columns,
            cells: Array.from(this.allCells)
                .map(cell => cell.type),
            entities: {},
            
            /*
            // TODO: how to pass entities?
            // (Directly related to: how to store entities on the client?)
            Array.from(this.allEntities)
                .map(entity => entity)
            */
        }
    }
}