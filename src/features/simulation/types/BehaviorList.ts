import type { IActor } from './IActor';
import type { Behavior } from './Behavior';

/** A sequence of behaviours, from highest to lowest priority. */
export interface BehaviorList<TActor extends IActor> {
    behaviors: Behavior<TActor>[];
}