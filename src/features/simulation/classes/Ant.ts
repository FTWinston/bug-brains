import type { BehaviorList } from '../types/BehaviorList';
import { Actor } from './Actor';
import type { WorldCell } from './WorldCell';

export class Ant extends Actor<Ant> {
    constructor(location: WorldCell, behavior: BehaviorList<Ant>) {
        super(location, behavior);
    }
}