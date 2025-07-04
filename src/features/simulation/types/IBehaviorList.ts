import type { IActor } from './IActor';
import type { IBehavior } from './IBehavior';

/** A sequence of behaviours, from highest to lowest priority. */
export interface IBehaviorList<TActor extends IActor> {
    behaviors: IBehavior<TActor>[];
}