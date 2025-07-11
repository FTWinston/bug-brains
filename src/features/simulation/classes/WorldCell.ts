import { CellType } from 'src/types/CellType';
import type { IWorldCell } from '../types/IWorldCell';
import type { Entity } from './Entity';

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
    private static maxContentSize: number = 2;
    private currentContentSize: number = 0;

    public get contents(): ReadonlySet<Entity> {
        return this.entities;
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