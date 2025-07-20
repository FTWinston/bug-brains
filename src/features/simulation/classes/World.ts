import { getAdjacentIndexes } from 'src/utils/coordinates';
import { ActorBase } from './Actor';
import type { Entity } from './Entity';
import type { WorldCell } from './WorldCell';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';
import { Ant } from './Ant';
import type { BehaviorList } from '../types/BehaviorList';
import { CellType } from 'src/types/CellType';

/** A world is a collection of cells, along with the entities in those cells. */
export class World {
    constructor(readonly rows: number, readonly columns: number, cells: ReadonlyArray<WorldCell>) {
        this.allCells = new Set<WorldCell>(cells);

        for (const cell of cells) {
            for (const entity of cell.contents) {
                this.addEntity(entity);
            }

            cell.adjacentCells = getAdjacentIndexes(cell.index, this.columns, this.rows)
                .map(index => index === null ? null : cells[index]);
        }
    }

    private allCells: Set<WorldCell>;
    private allEntities: Map<number, Entity> = new Map<number, Entity>();
    private allActors: Set<ActorBase> = new Set<ActorBase>();
    private allAnts: Set<Ant> = new Set<Ant>();

    public get cells(): ReadonlySet<WorldCell> {
        return this.allCells;
    }

    public addEntity(entity: Entity) {
        this.allEntities.set(entity.id, entity);
        if (entity instanceof ActorBase) {
            this.allActors.add(entity);
        }
        if (entity instanceof Ant) {
            this.allAnts.add(entity);
        }
    }

    public removeEntity(entity: Entity) {
        this.allAnts.delete(entity as Ant);
        this.allActors.delete(entity as ActorBase);
        this.allEntities.delete(entity.id);
        entity.location.removeEntity(entity);
    }

    public getFullStateAsUpdates(): SimulationUpdate[] {
        const resetAction: SimulationUpdate = {
            type: 'reset',
            columns: this.columns,
            cells: Array.from(this.allCells)
                .map(cell => cell.type),
        }

        const actions = [...this.allEntities.values()]
            .map(entity => ({
                type: 'add',
                loc: entity.location.index,
                entity: {
                    id: entity.id,
                    type: entity.type,
                    ...entity.getStateForUpdate(),
                }
            })) as unknown as SimulationUpdate[];

        // Put the reset action at the start, as that clears all entities from the world.
        actions.unshift(resetAction);

        return actions;;
    }

    public simulate(): SimulationUpdate[] {
        const updates: SimulationUpdate[] = [];

        // First, diffuse all scents in the world.
        for (const cell of this.allCells) {
            for (const [type, strength] of cell.scents.entries()) {
                // Diffuse the scent to adjacent cells.
                const increment = strength * 0.1;
                for (const adjacentCell of cell.adjacentCells) {
                    if (adjacentCell && adjacentCell.type !== CellType.SolidWall) {
                        const update = adjacentCell.addScent(type, increment);
                        if (update) {
                            updates.push(update);
                        }
                    }
                }

                // Reduce the strength of the scent in the current cell.
                const update = cell.addScent(type, -strength * 0.2);
                if (update) {
                    updates.push(update);
                }
            }
        }

        // Then, allow each actor to act.
        for (const actor of this.allActors) {
            updates.push(...actor.act());
        }

        return updates;
    }

    public replaceAntBehavior(behavior: BehaviorList<Ant>): void {
        for (const ant of this.allAnts) {
            ant.replaceBehavior(behavior);
        }
    }
}