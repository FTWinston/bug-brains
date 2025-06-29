import type { Action } from './Action';
import type { IActor } from './IActor';
import type { Condition } from './Condition';

/** Groups a sequence of actions with conditions that will cause them to be performed if all are satisfied. */
export interface Behavior<TActor extends IActor> {
    id: number;
    conditions: Condition<TActor>[];
    actions: Action<TActor>[];
}