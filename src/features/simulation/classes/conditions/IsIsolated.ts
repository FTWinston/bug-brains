import type { IsolatedCondition } from 'src/types/AntCondition';
import type { ICondition } from '../../types/ICondition';
import type { Ant } from '../Ant';

export class IsIsolated implements ICondition<Ant> {
    static readonly type: IsolatedCondition['type'] = 'isolated';
    public readonly type = IsIsolated.type;

    static parse(condition: IsolatedCondition): IsIsolated {
        return new IsIsolated(condition.distance);
    }

    constructor(public distance: number) {
    }

    public isSatisfied(entity: Ant): boolean {
        if (entity.location.contents.size > 1) {
            return false;
        };
        
        // TODO: check for anything in adjacent cells, up to this.distance

        return true;
    }
}