import type { IndoorsCondition } from 'src/types/AntCondition';
import { CellType } from '../../../../types/CellType';
import type { ICondition } from '../../types/ICondition';
import type { Ant } from '../Ant';

export class IsIndoors implements ICondition<Ant> {
    static readonly type: IndoorsCondition['type'] = 'indoors';
    public readonly type = IsIndoors.type;

    static parse(condition: IndoorsCondition): IsIndoors {
        return new IsIndoors(condition.is);
    }

    constructor(public is: boolean = true) {
    }

    public isSatisfied(entity: Ant): boolean {
        return this.is === (entity.location.type === CellType.UndergroundSpace);
    }
}