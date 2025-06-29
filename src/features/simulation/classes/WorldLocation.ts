import type { Entity } from './Entity';
import type { Position } from '../types/Position';

/** A place in the world that can have entities in it. */
export class WorldLocation {
    constructor(position: Position) {
        this.position = position;
        this.contents = [];
    }

    readonly position: Position;
    contents: Entity[];
}