import type { AntAction } from './AntAction';
import type { AntCondition } from './AntCondition';

export type AntBehavior = {
    id: number;
    conditions: AntCondition[];
    actions: AntAction[];   
}

export type AntBehaviorList = AntBehavior[];