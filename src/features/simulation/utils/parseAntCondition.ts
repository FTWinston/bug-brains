import type { Ant } from '../classes/Ant';
import { IsIndoors } from '../classes/conditions/IsIndoors';
import type { AntCondition } from 'src/types/AntCondition';
import type { ICondition } from '../types/ICondition';
import { IsIsolated } from '../classes/conditions/IsIsolated';
import { assertNever } from 'src/utils/assertNever';

export function parseAntCondition(condition: AntCondition): ICondition<Ant> {
    switch (condition.type) {
        case IsIndoors.type:
            return IsIndoors.parse(condition);
        case IsIsolated.type:
            return IsIsolated.parse(condition);
        default:
            assertNever(condition, 'condition');
    }
}