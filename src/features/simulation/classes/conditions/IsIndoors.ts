import { CellType } from '../../../../types/CellType';
import type { ICondition } from '../../types/ICondition';
import type { Ant } from '../Ant';

export class IsIndoors implements ICondition<Ant> {
    public type = 'indoors';

    constructor(public is: boolean = true) {
    }

    public isSatisfied(entity: Ant): boolean {
        return this.is === (entity.location.type === CellType.UndergroundSpace);
    }
}