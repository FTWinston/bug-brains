import type { IAction } from './IAction';
import type { IActor } from './IActor';
import type { ICondition } from './ICondition';

/** Groups a sequence of actions with conditions that will cause them to be performed if all are satisfied. */
export interface IBehavior<TActor extends IActor> {
    id: number;
    conditions: ICondition<TActor>[];
    actions: IAction<TActor>[];
}