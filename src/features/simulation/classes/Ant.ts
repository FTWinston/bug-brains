import type { IBehaviorList } from '../types/IBehaviorList';
import { Actor } from './Actor';
import type { WorldCell } from './WorldCell';

export class Ant extends Actor<Ant> {
    constructor(id: number, location: WorldCell, behavior: IBehaviorList<Ant>) {
        super(id, location, behavior);
    }
}