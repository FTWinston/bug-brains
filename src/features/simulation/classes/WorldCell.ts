import { CellType } from 'src/types/CellType';
import type { IWorldCell } from '../types/IWorldCell';
import type { Entity } from './Entity';
import type { ScentType } from 'src/types/ScentType';
import type { SimulationUpdate } from 'src/types/SimulationUpdate';

/** A place in the world that can have entities in it. */
export class WorldCell implements IWorldCell {
    constructor(
        readonly index: number,
        readonly row: number,
        readonly col: number,
        public type: CellType = CellType.UndergroundSpace
    ) {
    }

    public adjacentCells: Array<WorldCell | null> = [];

    private entities: Set<Entity> = new Set<Entity>();
    private _scents: Map<ScentType, number> = new Map<ScentType, number>();

    private static maxContentSize: number = 2;
    private currentContentSize: number = 0;

    public get contents(): ReadonlySet<Entity> {
        return this.entities;
    }

    public get scents(): ReadonlyMap<ScentType, number> {
        return this._scents;
    }

    public addScent(type: ScentType, addStrength: number): SimulationUpdate | null {
        const existingStrength = this._scents.get(type) || 0;
        const strength = existingStrength + addStrength;
        
        if (strength <= 0.01) {
            if (this._scents.delete(type)) {
                // Return an update that this cell no longer has this scent.
                return {
                    type: 'sce',
                    loc: this.index,
                    scent: type,
                    str: 0,
                }
            }

            return null;
        } else {
            this._scents.set(type, strength);
            // Return an update indicating the strength of this scent in this cell.
            return {
                type: 'sce',
                loc: this.index,
                scent: type,
                str: strength,
            }
        }
    }

    public tryAddEntity(entity: Entity): boolean {
        if (this.type === CellType.SolidWall) {
            return false; // Cannot add entities to solid walls.
        }
        
        if (this.currentContentSize + entity.size > WorldCell.maxContentSize) {
            return false; // Not enough remaining space for this entity.
        }

        this.entities.add(entity);
        this.currentContentSize += entity.size;
        return true;
    }

    public removeEntity(entity: Entity): void {
        if (this.entities.delete(entity)) {
            this.currentContentSize -= entity.size;
        }
    }
}