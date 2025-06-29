import { CellType } from '../types/CellType';
import type { IWorldCell } from '../types/IWorldCell';
import type { Entity } from './Entity';

/** A place in the world that can have entities in it. */
export class WorldCell implements IWorldCell {
    constructor(x: number, y: number, type: CellType = CellType.UndergroundSpace) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    readonly x: number;
    readonly y: number;
    public type: CellType;
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